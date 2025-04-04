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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const productsRouter_1 = __importDefault(require("./routes/productsRouter"));
const reviewsRouter_1 = __importDefault(require("./routes/reviewsRouter"));
const connRedisServer_1 = require("./config/connRedisServer");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', productsRouter_1.default);
app.use('/api/reviews', reviewsRouter_1.default);
app.listen(process.env.PORT || 5000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🚀 Product-Server is running on port ${process.env.PORT}...........`);
    yield (0, connRedisServer_1.connRedis)();
    // connectRabbitMQ();
}));
