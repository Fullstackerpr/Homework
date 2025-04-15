import mongoose from "mongoose";
import {
    matchFixturesCollectionName,
    teamsCollectionName,
    tournamentsCollectionName
} from "../common/index.js";

const matchFixturesSchema = new mongoose.Schema({
    match_date: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    home_team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teamsCollectionName,
        required: true,
    },
    away_team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teamsCollectionName,
        required: true,
    },
    home_score: {
        type: Number,
        required: true,
    },
    away_score: {
        type: Number,
        required: true
    },
    tournament_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: tournamentsCollectionName,
        required: true,
    },
    match_status: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
});

export const matchFixtures = mongoose.model(
    matchFixturesCollectionName,
    matchFixturesSchema
);