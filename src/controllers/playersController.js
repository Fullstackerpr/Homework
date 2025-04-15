import { players } from "../models/playersModel.js";

// Get all Players
export const getAllPlayers = async (req, res, next) => {
    try {
        const playersList = await players.find();
        res.status(200).json({
            success: true,
            data: playersList,
        });
    } catch (error) {
        next(error);
    }
};

// Get Player by ID
export const getPlayerById = async (req, res, next) => {
    try {
        const player = await players.findById(req.params.id);
        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found",
            });
        }
        res.status(200).json({
            success: true,
            data: player,
        });
    } catch (error) {
        next(error);
    }
};

// Create a Player
export const createPlayer = async (req, res, next) => {
    try {
        const newPlayer = new players(req.body);
        await newPlayer.save();
        res.status(201).json({
            success: true,
            message: "Player created successfully",
            data: newPlayer,
        });
    } catch (error) {
        next(error);
    }
};

// Update Player
export const updatePlayer = async (req, res, next) => {
    try {
        const updatedPlayer = await players.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPlayer) {
            return res.status(404).json({
                success: false,
                message: "Player not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Player updated successfully",
            data: updatedPlayer,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Player
export const deletePlayer = async (req, res, next) => {
    try {
        const deletedPlayer = await players.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).json({
                success: false,
                message: "Player not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Player deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};