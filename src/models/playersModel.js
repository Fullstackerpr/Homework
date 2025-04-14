import mongoose from "mongoose";
import {
    playersCollectionName,
    teamsCollectionName
} from "../common/index.js";

const playersSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teamsCollectionName,
        required: true,
    },
    jersey_number: {
        type: Number,
        required: true,
    },
});

export const players = mongoose.model(
    playersCollectionName,
    playersSchema
);