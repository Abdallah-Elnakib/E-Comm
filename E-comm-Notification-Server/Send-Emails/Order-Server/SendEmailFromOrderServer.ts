import {channel} from '../../config/ConnRabbitmq';
import {orderStatus, orderReview} from '../../utils/milesFormulas';


export const sendEmailFromOrderServer = async () => {
    const exchange = 'order_exchange';
    const routingKey = 'order_routing_key';
    const queue = 'reply_queue_ee4cd019-c7ee-4dad-8c73-6aa419e5e0a7';

    if (!channel) {
        throw new Error("Channel is not connected to RabbitMQ");
    }
    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, exchange, routingKey);

    console.log("✅ Channel With RabbitMQ Order-Server IS Created");
  
    channel.consume(queue, (msg) => {
        if (msg) {
          console.log("📩 Message received from RabbitMQ Order-Server:", msg.content.toString());
          const result = JSON.parse(msg.content.toString());
          if (result.status === "in-progress" || result.status === "completed" || result.status === "cancelled" || result.status === "delivered") {
            orderStatus(result.email, result.OrderId, result.userId, result.status);
          }
          if (result.status === "delivered") {
            orderReview(result.email, result.OrderId, result.userId);
          }
        }
      }, { noAck: true });
}
