import { z } from 'zod';

export const createTeamSchema = z.object({
    team_name: z.string().trim().min(1).max(50),
    club_id: z.string().length(24),
    group_id: z.string().length(24),
    coach_name: z.string().trim().min(1).max(50),
});

export const updateTeamSchema = z.object({
    team_name: z.string().trim().max(50).optional(),
    club_id: z.string().length(24).optional(),
    group_id: z.string().length(24).optional(),
    coach_name: z.string().trim().max(50).optional(),
}).refine((data) => Object.keys(data).length > 0);

export const validateTeamIdSchema = z.object({
    id: z.string().length(24),
});