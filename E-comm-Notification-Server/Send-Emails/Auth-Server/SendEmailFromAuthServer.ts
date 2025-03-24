import {channel} from '../../config/ConnRabbitmq';
import {sendVerificationEmail, sendOtp} from '../../utils/milesFormulas';


export const sendEmailFromAuthServer = async () => {
    const exchange = 'auth_exchange';
    const routingKey = 'auth_routing_key';
    const queue = 'reply_queue_d6e3a48d-5410-482d-be2a-9d2e65c11074';

    if (!channel) {
        throw new Error("Channel is not connected to RabbitMQ");
    }
    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, exchange, routingKey);

    console.log("✅ Channel With RabbitMQ Auth-Server IS Created");
  
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
}
