import { z } from 'zod';

export const createTournamentGroupSchema = z.object({
    group_name: z.string().trim().min(1).max(50),
    tournament_id: z.string().length(24),
});

export const updateTournamentGroupSchema = z.object({
    group_name: z.string().trim().max(50).optional(),
    tournament_id: z.string().length(24).optional(),
}).refine((data) => Object.keys(data).length > 0);

export const validateTournamentGroupIdSchema = z.object({
    id: z.string().length(24),
});