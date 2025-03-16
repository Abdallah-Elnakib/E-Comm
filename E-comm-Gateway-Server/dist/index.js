"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const reviewsRoutes_1 = __importDefault(require("./routes/reviewsRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/product', productRoutes_1.default);
app.use('/api/reviews', reviewsRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`🚀 Gateway-Server started at http://localhost:${process.env.PORT}............`);
});
