import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sendToQueue, receivedFromQueue, channel } from '../config/rabbitmq';

export const verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("🔐 Verifying User Authentication...");
    const correlationId = uuidv4();
    const exchange = 'auth_exchange';
    const routingKey = 'auth_routing_key';
    const replyQueue = `reply_queue_${uuidv4()}`;

    if (!channel) {
      throw new Error("Channel is not connected to RabbitMQ");
    }

    await channel.assertQueue(replyQueue, { exclusive: true, autoDelete: true });
    console.log("📤 Created reply queue:", replyQueue);

    await sendToQueue(exchange, routingKey, JSON.stringify({ message: 'user sent a request to Product-Server' }), correlationId, replyQueue);
    console.log("📤 Message sent to RabbitMQ Auth-Server");

    const data = await receivedFromQueue(replyQueue, correlationId);
    console.log("📩 Message received from RabbitMQ Auth-Server:", data);

    if (data.message === "Unauthorized") {
       res.status(401).json({ message: data.message });
       return;
    }

    next();
    console.log("🔓 User Authenticated Successfully!");
  } catch (error) {
    console.error("❌ Error in verifyAuth middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};