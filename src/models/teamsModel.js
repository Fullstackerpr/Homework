import mongoose from "mongoose";
import {
    teamsCollectionName,
    footballClubsCollectionName,
    tournamentGroupsCollectionName
} from "../common/index.js";

const teamsSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    club_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: footballClubsCollectionName,
        required: true,
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: tournamentGroupsCollectionName,
        required: true,
    },
    coach_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
});

export const teams = mongoose.model(
    teamsCollectionName,
    teamsSchema
);