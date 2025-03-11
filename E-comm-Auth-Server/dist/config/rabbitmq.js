"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRabbitMQ = connectRabbitMQ;
exports.sendToQueue = sendToQueue;
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
let channel;
function connectRabbitMQ() {
    return __awaiter(this, arguments, void 0, function* (retries = 5) {
        try {
            if (!RABBITMQ_URL) {
                throw new Error("RABBITMQ_URL is not defined");
            }
            const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
            channel = yield connection.createChannel();
            console.log("✅ Connected to RabbitMQ Auth-Server");
            const exchange = 'auth_exchange';
            const routingKey = 'auth_routing_key';
            const queue = 'auth';
            yield channel.assertExchange(exchange, 'direct', { durable: false });
            yield channel.assertQueue(queue, { durable: false });
            yield channel.bindQueue(queue, exchange, routingKey);
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    console.log("📩 Message received from RabbitMQ Auth-Server:", msg.content.toString());
                    const result = yield CheckUserAuth();
                    const replyTo = msg.properties.replyTo;
                    const correlationId = msg.properties.correlationId;
                    channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(result)), { correlationId });
                }
            }), { noAck: true });
        }
        catch (error) {
            console.error("❌ RabbitMQ Connection Error:", error);
            if (retries > 0) {
                console.log(`Retrying in 5 seconds... (${retries} retries left)`);
                setTimeout(() => connectRabbitMQ(retries - 1), 5000);
            }
        }
    });
}
function sendToQueue(exchange, routingKey, message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!channel) {
            throw new Error("Channel is not connected to RabbitMQ");
        }
        yield channel.assertExchange(exchange, 'direct', { durable: false });
        const sent = channel.publish(exchange, routingKey, Buffer.from(message));
        if (sent) {
            console.log(`📤 Message sent to RabbitMQ Exchange: ${exchange}, Routing Key: ${routingKey}, Message: ${message}`);
        }
        else {
            console.error("❌ Failed to send message to RabbitMQ");
            throw new Error("Failed to send message to RabbitMQ");
        }
    });
}
function CheckUserAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(process.env.ENDPOINTAUTH + '/api/auth/check-user-auth');
        const data = yield response.json();
        return data;
    });
}
