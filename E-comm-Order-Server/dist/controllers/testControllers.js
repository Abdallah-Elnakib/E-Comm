"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testControllers = void 0;
const testControllers = (req, res) => {
    console.log("Order server is running");
    res.status(200).json({ message: "Order server is running" });
    return;
};
exports.testControllers = testControllers;
