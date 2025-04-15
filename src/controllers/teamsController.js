import { teams } from "../models/teamsModel.js";

// Get all Teams
export const getAllTeams = async (req, res, next) => {
    try {
        const teamsList = await teams.find();
        res.status(200).json({
            success: true,
            data: teamsList,
        });
    } catch (error) {
        next(error);
    }
};

// Get Team by ID
export const getTeamById = async (req, res, next) => {
    try {
        const team = await teams.findById(req.params.id);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }
        res.status(200).json({
            success: true,
            data: team,
        });
    } catch (error) {
        next(error);
    }
};

// Create a Team
export const createTeam = async (req, res, next) => {
    try {
        const newTeam = new teams(req.body);
        await newTeam.save();
        res.status(201).json({
            success: true,
            message: "Team created successfully",
            data: newTeam,
        });
    } catch (error) {
        next(error);
    }
};

// Update Team
export const updateTeam = async (req, res, next) => {
    try {
        const updatedTeam = await teams.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTeam) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Team updated successfully",
            data: updatedTeam,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Team
export const deleteTeam = async (req, res, next) => {
    try {
        const deletedTeam = await teams.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Team deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};