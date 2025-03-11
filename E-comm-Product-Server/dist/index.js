"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const productsRouter_1 = __importDefault(require("./routes/productsRouter"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use('/api/products', productsRouter_1.default);
exports.app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Product-Server is running on port ${process.env.PORT}...........`);
    // connectRabbitMQ();
});
