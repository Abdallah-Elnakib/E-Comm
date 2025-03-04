import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
let channel;

async function connectRabbitMQ() {
    try {
        if (!RABBITMQ_URL) {
            throw new Error("RABBITMQ_URL is not defined");
        }
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
    }
}

export { connectRabbitMQ, channel };
