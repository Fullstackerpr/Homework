import { tournaments } from "../models/tournamentsModel.js";

// Get all Tournaments
export const getAllTournaments = async (req, res, next) => {
    try {
        const tournamentsList = await tournaments.find();
        res.status(200).json({
            success: true,
            data: tournamentsList,
        });
    } catch (error) {
        next(error);
    }
};

// Get Tournament by ID
export const getTournamentById = async (req, res, next) => {
    try {
        const tournament = await tournaments.findById(req.params.id);
        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }
        res.status(200).json({
            success: true,
            data: tournament,
        });
    } catch (error) {
        next(error);
    }
};

// Create a Tournament
export const createTournament = async (req, res, next) => {
    try {
        const newTournament = new tournaments(req.body);
        await newTournament.save();
        res.status(201).json({
            success: true,
            message: "Tournament created successfully",
            data: newTournament,
        });
    } catch (error) {
        next(error);
    }
};

// Update Tournament
export const updateTournament = async (req, res, next) => {
    try {
        const updatedTournament = await tournaments.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Tournament updated successfully",
            data: updatedTournament,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Tournament
export const deleteTournament = async (req, res, next) => {
    try {
        const deletedTournament = await tournaments.findByIdAndDelete(req.params.id);
        if (!deletedTournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Tournament deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};