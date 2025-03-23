import amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
export let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async (retries = 5, delay = 5000) => {
    try {
        if (!RABBITMQ_URL) {
            throw new Error("RABBITMQ_URL is not defined");
        }

        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("✅ Connected to RabbitMQ Auth-Server");

        connection.on('close', () => {
            console.error("❌ RabbitMQ connection closed. Reconnecting...");
            if (retries > 0) {
                setTimeout(() => connectRabbitMQ(retries - 1, delay * 2), delay);
            } else {
                console.error("❌ Maximum retries reached. Exiting...");
            }
        });

        connection.on('error', (error) => {
            console.error("❌ RabbitMQ connection error:", error);
            if (retries > 0) {
                setTimeout(() => connectRabbitMQ(retries - 1, delay * 2), delay);
            } else {
                console.error("❌ Maximum retries reached. Exiting...");
            }
        });
    } catch (error) {
        console.error("❌ RabbitMQ Connection Error:", error);
        if (retries > 0) {
            console.log(`Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
            setTimeout(() => connectRabbitMQ(retries - 1, delay * 2), delay);
        } else {
            console.error("❌ Maximum retries reached. Exiting...");
        }
    }
};

const sendToQueue = async (exchange: string, routingKey: string, message: string, correlationId: string, replyQueue: string) => {
    if (!channel) {
        throw new Error("Channel is not connected to RabbitMQ");
    }

    await channel.assertExchange(exchange, 'direct', { durable: true });
    channel.publish(exchange, routingKey, Buffer.from(message), {
        correlationId,
        replyTo: replyQueue,
    });
    console.log("📤 Message sent to RabbitMQ Exchange:", exchange, "Routing Key:", routingKey, "Message:", message);
};

export const sendEmail = async (message: object): Promise<void> => {
    try {
        const correlationId = uuidv4();
        const exchange = 'auth_exchange';
        const routingKey = 'auth_routing_key';
        const replyQueue = `reply_queue_${uuidv4()}`;

        if (!channel) {
            throw new Error("Channel is not connected to RabbitMQ");
        }

        await channel.assertQueue(replyQueue, { exclusive: true, autoDelete: false });

        await sendToQueue(exchange, routingKey, JSON.stringify(message), correlationId, replyQueue);
        console.log("📤 Message sent to RabbitMQ Notification-Server");

    } catch (error) {
        console.error("❌ Error in sendEmail:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};