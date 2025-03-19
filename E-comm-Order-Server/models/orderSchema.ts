import { z } from 'zod';



export const orderSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    products: z.array(
        z.object({
            productId: z.number().min(1, "Product ID is required"),
            quantity: z.number().min(1, "Quantity must be at least 1"),
            price: z.number().min(0, "Price must be a positive number"),
            total: z.number().min(0, "Total must be a positive number").optional(),
        })
    ).min(1, "At least one product is required").optional(),
    orderStatus: z.string().min(1, "Order status is required"),
    total: z.number().min(0, "Total must be a positive number").optional(),
});

export type Order = z.infer<typeof orderSchema>;