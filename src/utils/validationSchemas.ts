import { z } from 'zod';

export const signupSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Name is required')
            .trim()
            .regex(/^[A-Za-zÀ-ÿ ]+$/, 'Name must contain only letters and spaces'),
        email: z
            .string()
            .min(1, 'Email is required')
            .trim()
            .email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special')
            .refine((v) => /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v) && /[^\w\s]/.test(v), {
                message: 'At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special',
            }),
        confirmPassword: z.string().min(1, 'Confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });
