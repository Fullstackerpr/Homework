import { z } from 'zod';

export const createMatchFixtureSchema = z.object({
    match_date: z.string().datetime({ offset: true }),
    venue: z.string().trim().min(1).max(50),
    home_team_id: z.string().length(24),
    away_team_id: z.string().length(24),
    home_score: z.number().int().min(0),
    away_score: z.number().int().min(0),
    tournament_id: z.string().length(24),
    match_status: z.string().trim().min(1).max(50),
});

export const updateMatchFixtureSchema = z.object({
    match_date: z.string().datetime({ offset: true }).optional(),
    venue: z.string().trim().max(50).optional(),
    home_team_id: z.string().length(24).optional(),
    away_team_id: z.string().length(24).optional(),
    home_score: z.number().int().min(0).optional(),
    away_score: z.number().int().min(0).optional(),
    tournament_id: z.string().length(24).optional(),
    match_status: z.string().trim().max(50).optional(),
}).refine((data) => Object.keys(data).length > 0);

export const validateMatchFixtureIdSchema = z.object({
    id: z.string().length(24),
});