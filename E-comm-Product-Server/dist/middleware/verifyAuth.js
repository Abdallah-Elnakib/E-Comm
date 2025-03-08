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
const rabbitmq_1 = require("../config/rabbitmq");
const verifyAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔐 Verifying User Authentication...");
        yield (0, rabbitmq_1.sendToQueue)('auth', 'user sent a request to Product-Server');
        yield (0, rabbitmq_1.receivedFromQueue)('response').then((data) => {
            console.log(data);
            if (data == "❌ Unauthorized User") {
                return res.status(401).json({ message: data });
            }
            next();
        }).catch((error) => {
            console.error("❌ Error in verifyAuth middleware:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        });
        console.log("🔓 User Authenticated Successfully!");
    }
    catch (error) {
        console.error("❌ Error in verifyAuth middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.verifyAuth = verifyAuth;
