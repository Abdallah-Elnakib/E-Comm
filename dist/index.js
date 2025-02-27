"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const connDB_1 = require("./config/connDB");
const app = (0, express_1.default)();
(0, connDB_1.connDB)();
mongoose_1.default.connection.once('open', () => {
    console.log('Database connected successfully...................');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}...........`);
    });
});
mongoose_1.default.connection.on('error', (error) => {
    console.error('Database connection failed:', error);
});
