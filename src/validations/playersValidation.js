import { z } from 'zod';

export const createPlayerSchema = z.object({
    full_name: z.string().trim().min(1).max(50),
    date_of_birth: z.string().datetime({ offset: true }),
    position: z.string().trim().min(1).max(50),
    team_id: z.string().length(24),
    jersey_number: z.number().int().min(1),
});

export const updatePlayerSchema = z.object({
    full_name: z.string().trim().max(50).optional(),
    date_of_birth: z.string().datetime({ offset: true }).optional(),
    position: z.string().trim().max(50).optional(),
    team_id: z.string().length(24).optional(),
    jersey_number: z.number().int().min(1).optional(),
}).refine((data) => Object.keys(data).length > 0);

export const validatePlayerIdSchema = z.object({
    id: z.string().length(24),
});