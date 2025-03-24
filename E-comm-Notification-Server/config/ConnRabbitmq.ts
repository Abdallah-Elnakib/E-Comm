import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();
import { sendEmailFromAuthServer } from '../Send-Emails/Auth-Server/SendEmailFromAuthServer';
import { sendEmailFromProductServer } from '../Send-Emails/Product-Server/SendEmailFromProductServer';
import { sendEmailFromOrderServer } from '../Send-Emails/Order-Server/SendEmailFromOrderServer';

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

      await sendEmailFromAuthServer();
      await sendEmailFromProductServer();
      await sendEmailFromOrderServer();
      
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