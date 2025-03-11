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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const uuid_1 = require("uuid");
const rabbitmq_1 = require("../config/rabbitmq");
const verifyAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔐 Verifying User Authentication...");
        const correlationId = (0, uuid_1.v4)();
        const exchange = 'auth_exchange';
        const routingKey = 'auth_routing_key';
        const replyQueue = `reply_queue_${(0, uuid_1.v4)()}`;
        if (!rabbitmq_1.channel) {
            throw new Error("Channel is not connected to RabbitMQ");
        }
        yield rabbitmq_1.channel.assertQueue(replyQueue, { exclusive: true, autoDelete: true });
        console.log("📤 Created reply queue:", replyQueue);
        yield (0, rabbitmq_1.sendToQueue)(exchange, routingKey, JSON.stringify({ message: 'user sent a request to Product-Server' }), correlationId, replyQueue);
        console.log("📤 Message sent to RabbitMQ Auth-Server");
        const data = yield (0, rabbitmq_1.receivedFromQueue)(replyQueue, correlationId);
        console.log("📩 Message received from RabbitMQ Auth-Server:", data);
        if (data.message === "Unauthorized") {
            res.status(401).json({ message: data.message });
            return;
        }
        next();
        console.log("🔓 User Authenticated Successfully!");
    }
    catch (error) {
        console.error("❌ Error in verifyAuth middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.verifyAuth = verifyAuth;
