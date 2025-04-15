import { tournamentGroups } from "../models/tournamentGroupsModel.js";

// Get all Tournament Groups
export const getAllTournamentGroups = async (req, res, next) => {
    try {
        const groups = await tournamentGroups.find();
        res.status(200).json({
            success: true,
            data: groups,
        });
    } catch (error) {
        next(error);
    }
};

// Get Tournament Group by ID
export const getTournamentGroupById = async (req, res, next) => {
    try {
        const group = await tournamentGroups.findById(req.params.id);
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Tournament Group not found",
            });
        }
        res.status(200).json({
            success: true,
            data: group,
        });
    } catch (error) {
        next(error);
    }
};

// Create a Tournament Group
export const createTournamentGroup = async (req, res, next) => {
    try {
        const newGroup = new tournamentGroups(req.body);
        await newGroup.save();
        res.status(201).json({
            success: true,
            message: "Tournament Group created successfully",
            data: newGroup,
        });
    } catch (error) {
        next(error);
    }
};

// Update Tournament Group
export const updateTournamentGroup = async (req, res, next) => {
    try {
        const updatedGroup = await tournamentGroups.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedGroup) {
            return res.status(404).json({
                success: false,
                message: "Tournament Group not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Tournament Group updated successfully",
            data: updatedGroup,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Tournament Group
export const deleteTournamentGroup = async (req, res, next) => {
    try {
        const deletedGroup = await tournamentGroups.findByIdAndDelete(req.params.id);
        if (!deletedGroup) {
            return res.status(404).json({
                success: false,
                message: "Tournament Group not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Tournament Group deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};