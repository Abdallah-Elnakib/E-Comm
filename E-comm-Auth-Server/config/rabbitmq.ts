import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
let channel: amqp.Channel;

async function connectRabbitMQ(retries = 5) {
    try {
        if (!RABBITMQ_URL) {
            throw new Error("RABBITMQ_URL is not defined");
        }
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("✅ Connected to RabbitMQ Auth-Server");

        const exchange = 'auth_exchange';
        const routingKey = 'auth_routing_key';
        const queue = 'auth';

        await channel.assertExchange(exchange, 'direct', { durable: false });
        await channel.assertQueue(queue, { durable: false });
        await channel.bindQueue(queue, exchange, routingKey);

        channel.consume(queue, async (msg) => {
            if (msg) {
                console.log("📩 Message received from RabbitMQ Auth-Server:", msg.content.toString());
                const result = await CheckUserAuth();
                const replyTo = msg.properties.replyTo;
                const correlationId = msg.properties.correlationId;
                channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(result)), { correlationId });
            }
        }, { noAck: true });
    } catch (error) {
        console.error("❌ RabbitMQ Connection Error:", error);
        if (retries > 0) {
            console.log(`Retrying in 5 seconds... (${retries} retries left)`);
            setTimeout(() => connectRabbitMQ(retries - 1), 5000);
        }
    }
}

async function sendToQueue(exchange: string, routingKey: string, message: string) {
    if (!channel) {
        throw new Error("Channel is not connected to RabbitMQ");
    }

    await channel.assertExchange(exchange, 'direct', { durable: false });
    const sent = channel.publish(exchange, routingKey, Buffer.from(message));

    if (sent) {
        console.log(`📤 Message sent to RabbitMQ Exchange: ${exchange}, Routing Key: ${routingKey}, Message: ${message}`);
    } else {
        console.error("❌ Failed to send message to RabbitMQ");
        throw new Error("Failed to send message to RabbitMQ");
    }
}

async function CheckUserAuth() {
    const response = await fetch(process.env.ENDPOINTAUTH + '/api/auth/check-user-auth');
    const data = await response.json();
    return data;
}

export { connectRabbitMQ, sendToQueue };