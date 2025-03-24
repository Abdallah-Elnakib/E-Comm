import {channel} from '../../config/ConnRabbitmq';
import {sendMailRating_5, sendMailRating_3, sendMailRating_1} from '../../utils/milesFormulas';


export const sendEmailFromProductServer = async () => {
    const exchange = 'product_exchange';
    const routingKey = 'product_routing_key';
    const queue = 'reply_queue_0b25d18c-c2ac-43bd-b8af-a7d77a1ad627';

    if (!channel) {
        throw new Error("Channel is not connected to RabbitMQ");
    }
    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, exchange, routingKey);

    console.log("✅ Channel With RabbitMQ Product-Server IS Created");
  
    channel.consume(queue, (msg) => {
        if (msg) {
          console.log("📩 Message received from RabbitMQ Product-Server:", msg.content.toString());
          const result = JSON.parse(msg.content.toString());

          if (result.message === "Review-5-Or-4") {
            sendMailRating_5(result.email);
          }
          else if (result.message === "Review-3") {
            sendMailRating_3(result.email);
          }
          else if (result.message === "Review-1-Or-2") {
            sendMailRating_1(result.email);
          }
          
        }
      }, { noAck: true });
}
