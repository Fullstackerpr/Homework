import { footballClubs } from "../models/footballClubsModel.js";

// Get all Football Clubs
export const getAllFootballClubs = async (req, res, next) => {
    try {
        const clubs = await footballClubs.find();
        res.status(200).json({
            success: true,
            data: clubs,
        });
    } catch (error) {
        next(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }
};

// Get Football Club by ID
export const getFootballClubById = async (req, res, next) => {
    try {
        const club = await footballClubs.findById(req.params.id);
        if (!club) {
            return res.status(404).json({
                success: false,
                message: "Football Club not found",
            });
        }
        res.status(200).json({
            success: true,
            data: club,
        });
    } catch (error) {
        next(error);
    }
};

// Create a Football Club
export const createFootballClub = async (req, res, next) => {
    try {
        const newClub = new footballClubs(req.body);
        await newClub.save();
        res.status(201).json({
            success: true,
            message: "Football Club created successfully",
            data: newClub,
        });
    } catch (error) {
        next(error);
    }
};

// Update Football Club
export const updateFootballClub = async (req, res, next) => {
    try {
        const updatedClub = await footballClubs.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedClub) {
            return res.status(404).json({
                success: false,
                message: "Football Club not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Football Club updated successfully",
            data: updatedClub,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Football Club
export const deleteFootballClub = async (req, res, next) => {
    try {
        const deletedClub = await footballClubs.findByIdAndDelete(req.params.id);
        if (!deletedClub) {
            return res.status(404).json({
                success: false,
                message: "Football Club not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Football Club deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};