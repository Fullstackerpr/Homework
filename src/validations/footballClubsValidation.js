import { z } from 'zod';

export const createFootballClubSchema = z.object({
    club_name: z.string().trim().min(1).max(50),
    city: z.string().trim().min(1).max(50),
    country: z.string().trim().min(1).max(50),
    founded_year: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
});

export const updateFootballClubSchema = z.object({
    club_name: z.string().trim().max(50).optional(),
    city: z.string().trim().max(50).optional(),
    country: z.string().trim().max(50).optional(),
    founded_year: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
}).refine((data) => Object.keys(data).length > 0);

export const validateFootballClubIdSchema = z.object({
    id: z.string().length(24),
});