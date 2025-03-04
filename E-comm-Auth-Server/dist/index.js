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
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const rabbitmq_1 = require("./config/rabbitmq");
const app = (0, express_1.default)();
(0, connDB_1.connDB)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use('/api/auth', authRoutes_1.default);
mongoose_1.default.connection.once('open', () => {
    console.log('Database connected successfully...................');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}...........`);
    });
    (0, rabbitmq_1.connectRabbitMQ)();
});
mongoose_1.default.connection.on('error', (error) => {
    console.error('Database connection failed:', error);
});
