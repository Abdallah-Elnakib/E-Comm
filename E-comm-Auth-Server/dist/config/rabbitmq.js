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
exports.channel = void 0;
exports.connectRabbitMQ = connectRabbitMQ;
const amqplib_1 = __importDefault(require("amqplib"));
const RABBITMQ_URL = process.env.RABBITMQ_URL || '';
let channel;
function connectRabbitMQ() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!RABBITMQ_URL) {
                throw new Error("RABBITMQ_URL is not defined");
            }
            const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
            exports.channel = channel = yield connection.createChannel();
            console.log("Connected to RabbitMQ");
        }
        catch (error) {
            console.error("RabbitMQ Connection Error:", error);
        }
    });
}
