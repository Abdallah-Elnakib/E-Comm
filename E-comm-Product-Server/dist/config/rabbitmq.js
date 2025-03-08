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
exports.receivedFromQueue = receivedFromQueue;
exports.closeRabbitMQ = closeRabbitMQ;
const amqplib_1 = __importDefault(require("amqplib"));
const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
let channel = null;
function connectRabbitMQ() {
    return __awaiter(this, arguments, void 0, function* (retries = 5, delay = 5000) {
        try {
            if (!RABBITMQ_URL) {
                throw new Error("RABBITMQ_URL is not defined");
            }
            const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
            channel = yield connection.createChannel();
            console.log("✅ Connected to RabbitMQ Product-Server");
            connection.on('close', () => {
                console.error("❌ RabbitMQ connection closed. Reconnecting...");
                if (retries > 0) {
                    setTimeout(() => connectRabbitMQ(retries - 1, delay * 2), delay);
                }
                else {
                    console.error("❌ Maximum retries reached. Exiting...");
                }
            });
            connection.on('error', (error) => {
                console.error("❌ RabbitMQ connection error:", error);
                if (retries > 0) {
                    setTimeout(() => connectRabbitMQ(retries - 1, delay * 2), delay);
                }
                else {
                    console.error("❌ Maximum retries reached. Exiting...");
                }
            });
        }
        catch (error) {
            console.error("❌ RabbitMQ Connection Error:", error);
            if (retries > 0) {
                console.log(`Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
                setTimeout(() => connectRabbitMQ(retries - 1, delay * 2), delay);
            }
            else {
                console.error("❌ Maximum retries reached. Exiting...");
            }
        }
    });
}
function sendToQueue(queue, message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!channel) {
            throw new Error("Channel is not connected to RabbitMQ");
        }
        yield channel.assertQueue(queue, { durable: false });
        const sent = channel.sendToQueue(queue, Buffer.from(message));
        if (sent) {
            console.log("📤 Message sent to RabbitMQ Auth-Server:", message);
        }
        else {
            console.error("❌ Failed to send message to RabbitMQ");
            throw new Error("Failed to send message to RabbitMQ");
        }
    });
}
function receivedFromQueue(queue) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function closeRabbitMQ() {
    return __awaiter(this, void 0, void 0, function* () {
        if (channel) {
            yield channel.close();
            channel = null;
            console.log("✅ RabbitMQ connection closed");
        }
    });
}
