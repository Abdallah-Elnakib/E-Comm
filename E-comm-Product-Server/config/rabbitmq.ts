import amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';

const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
export let channel: amqp.Channel | null = null;

async function connectRabbitMQ(retries = 5, delay = 5000) {
  try {
    if (!RABBITMQ_URL) {
      throw new Error("RABBITMQ_URL is not defined");
    }

    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("✅ Connected to RabbitMQ Product-Server");

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
}

async function sendToQueue(exchange: string, routingKey: string, message: string, correlationId: string, replyQueue: string) {
  if (!channel) {
    throw new Error("Channel is not connected to RabbitMQ");
  }

  await channel.assertExchange(exchange, 'direct', { durable: false });
  channel.publish(exchange, routingKey, Buffer.from(message), {
    correlationId,
    replyTo: replyQueue,
  });
  console.log("📤 Message sent to RabbitMQ Exchange:", exchange, "Routing Key:", routingKey, "Message:", message);
}

async function receivedFromQueue(queue: string, correlationId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!channel) {
      return reject(new Error("Channel is not connected to RabbitMQ"));
    }

    channel.assertQueue(queue, { exclusive: true, autoDelete: true }).then(() => {
      if (!channel) {
        return reject(new Error("Channel is not connected to RabbitMQ"));
      }

      channel.consume(queue, (msg) => {
        if (msg && msg.properties.correlationId === correlationId) {
          const content = msg.content.toString();
          console.log("📩 Message received from RabbitMQ:", content);

          // Parse the content as JSON
          try {
            const parsedData = JSON.parse(content);
            resolve(parsedData);
          } catch (error) {
            reject(new Error("Failed to parse message content"));
          }
        }
      }, { noAck: true });
    }).catch(reject);
  });
}

async function closeRabbitMQ() {
  if (channel) {
    await channel.close();
    channel = null;
    console.log("✅ RabbitMQ connection closed");
  }
}

export { connectRabbitMQ, sendToQueue, receivedFromQueue, closeRabbitMQ };