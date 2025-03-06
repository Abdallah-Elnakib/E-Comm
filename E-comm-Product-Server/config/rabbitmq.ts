import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
let channel: amqp.Channel | null = null;

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

async function sendToQueue(queue: string, message: string) {
  if (!channel) {
    throw new Error("Channel is not connected to RabbitMQ");
  }

  await channel.assertQueue(queue, { durable: false });
  const sent = channel.sendToQueue(queue, Buffer.from(message));

  if (sent) {
    console.log("📤 Message sent to RabbitMQ Auth-Server:", message);
  } else {
    console.error("❌ Failed to send message to RabbitMQ");
    throw new Error("Failed to send message to RabbitMQ");
  }
}

async function receivedFromQueue(queue: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!channel) {
      return reject(new Error("Channel is not connected to RabbitMQ"));
    }

    channel.assertQueue(queue, { durable: false }).then(() => {
      if (!channel) {
        return reject(new Error("Channel is not connected to RabbitMQ"));
      }

      channel.consume(queue, (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          console.log("📩 Message received from RabbitMQ Auth-Server:", content);

          if (content.message === "Unauthorized") {
            console.log("1111111111111111111111111111");
            return resolve("❌ Unauthorized User");
          }

          console.log("2222222222222222222222222");
          return resolve(content);
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