"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsShema = exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID is required"),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.number().min(1, "Product ID is required"),
        quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
        price: zod_1.z.number().min(0, "Price must be a positive number"),
        total: zod_1.z.number().min(0, "Total must be a positive number").optional(),
    })).min(1, "At least one product is required").optional(),
    orderStatus: zod_1.z.string().min(1, "Order status is required"),
    total: zod_1.z.number().min(0, "Total must be a positive number").optional(),
});
exports.productsShema = zod_1.z.object({
    productId: zod_1.z.number().min(1, "Product ID is required"),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    total: zod_1.z.number().min(0, "Total must be a positive number").optional(),
});
