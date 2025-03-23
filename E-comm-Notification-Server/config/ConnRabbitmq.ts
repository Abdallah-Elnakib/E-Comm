import amqp from 'amqplib';
import dotenv from 'dotenv';
import {sendVerificationEmail, sendOtp} from '../utils/milesFormulas';
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
      console.log("✅ Connected to RabbitMQ Notification-Server");

      const exchange = 'auth_exchange';
      const routingKey = 'auth_routing_key';
      const queue = 'reply_queue_d6e3a48d-5410-482d-be2a-9d2e65c11074';
  
      await channel.assertExchange(exchange, 'direct', { durable: true });
      await channel.assertQueue(queue, { durable: false });
      await channel.bindQueue(queue, exchange, routingKey);
  
      channel.consume(queue, (msg) => {
        if (msg) {
          console.log("📩 Message received from RabbitMQ Auth-Server:", msg.content.toString());
          const result = JSON.parse(msg.content.toString());
          if (result.message === "Forgot-Password") {
            sendVerificationEmail(result.email, result.token);
          }
          else if (result.message === "Resend-OTP" || result.message === "Send-OTP") {
            sendOtp(result.email, result.otp);
          }
        }
      }, { noAck: true });

      
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