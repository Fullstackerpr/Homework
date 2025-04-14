import mongoose from "mongoose";
import {
    tournamentGroupsCollectionName,
    tournamentsCollectionName
} from "../common/index.js";

const tournamentGroupsSchema = new mongoose.Schema({
    group_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    tournament_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: tournamentsCollectionName,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const tournamentGroups = mongoose.model(
    tournamentGroupsCollectionName,
    tournamentGroupsSchema
);