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
        const result = await channel.assertQueue('auth', { durable: false });
        channel.consume('auth', async (msg) => {
            if (msg) {
                console.log("📩 Message received from RabbitMQ Prodcut-Server:", msg.content.toString());
                const response = await fetch(process.env.ENDPOINTAUTH + '/api/auth/check-user-auth')
                const data = await response.json();
                console.log("📤 Message sent to RabbitMQ Prodcut-Server:", data);
                await channel.assertQueue('response', { durable: false });
                channel.sendToQueue('response', Buffer.from(JSON.stringify(data)));
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


export { connectRabbitMQ };