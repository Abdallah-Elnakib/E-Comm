"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.addressSchema = exports.emailSchema = exports.loginSchema = exports.signupSchema = void 0;
// filepath: /home/abdallahelnakib/Desktop/Projects-Node-Js/E-comm-Auth-Server/utils/schemas.ts
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    firstName: zod_1.z.string().nonempty("First name is required"),
    lastName: zod_1.z.string().nonempty("Last name is required"),
    username: zod_1.z.string().nonempty("Username is required"),
    email: zod_1.z.string().email("Invalid email address"),
    addresses: zod_1.z.array(zod_1.z.object({
        street: zod_1.z.string().nonempty("Street is required"),
        city: zod_1.z.string().nonempty("City is required"),
        state: zod_1.z.string().nonempty("State is required"),
        zip: zod_1.z.string().nonempty("ZIP code is required"),
    })).nonempty("Addresses must be a non-empty array"),
    password: zod_1.z.string().min(8, "Password must be more than 8 characters"),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().nonempty("Username is required"),
    password: zod_1.z.string().nonempty("Password is required"),
});
exports.emailSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
});
exports.addressSchema = zod_1.z.object({
    street: zod_1.z.string().nonempty("Street is required"),
    city: zod_1.z.string().nonempty("City is required"),
    state: zod_1.z.string().nonempty("State is required"),
    zip: zod_1.z.string().nonempty("ZIP code is required"),
});
exports.updateAddressSchema = zod_1.z.object({
    addressId: zod_1.z.string().nonempty("Address ID is required"),
    street: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    zip: zod_1.z.string().optional(),
});
