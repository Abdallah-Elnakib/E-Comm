// filepath: /home/abdallahelnakib/Desktop/Projects-Node-Js/E-comm-Auth-Server/utils/schemas.ts
import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email address"),
  addresses: z.array(z.object({
    street: z.string().nonempty("Street is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    zip: z.string().nonempty("ZIP code is required"),
  })).nonempty("Addresses must be a non-empty array"),
  password: z.string().min(8, "Password must be more than 8 characters"),
});

export const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const addressSchema = z.object({
  street: z.string().nonempty("Street is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  zip: z.string().nonempty("ZIP code is required"),
});

export const updateAddressSchema = z.object({
  addressId: z.string().nonempty("Address ID is required"),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
});