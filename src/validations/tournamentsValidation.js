import { z } from 'zod';

export const createTournamentSchema = z.object({
    tournament_name: z.string().trim().min(1).max(50),
    start_date: z.string().datetime({ offset: true }),
    end_date: z.string().datetime({ offset: true }),
    status: z.string().trim().min(1).max(50),
});

export const updateTournamentSchema = z.object({
    tournament_name: z.string().trim().max(50).optional(),
    start_date: z.string().datetime({ offset: true }).optional(),
    end_date: z.string().datetime({ offset: true }).optional(),
    status: z.string().trim().max(50).optional(),
}).refine((data) => Object.keys(data).length > 0);

export const validateTournamentIdSchema = z.object({
    id: z.string().length(24),
});