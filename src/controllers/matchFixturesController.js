import { matchFixtures } from "../models/matchFixturesModel.js";

// Get all Match Fixtures
export const getAllMatchFixtures = async (req, res, next) => {
    try {
        const matchFixturesList = await matchFixtures.find();
        res.status(200).json({
            success: true,
            data: matchFixturesList,
        });
    } catch (error) {
        next(error);
    }
};

// Get Match Fixture by ID
export const getMatchFixtureById = async (req, res, next) => {
    try {
        const matchFixture = await matchFixtures.findById(req.params.id);
        if (!matchFixture) {
            return res.status(404).json({
                success: false,
                message: "Match Fixture not found",
            });
        }
        res.status(200).json({
            success: true,
            data: matchFixture,
        });
    } catch (error) {
        next(error);
    }
};

// Create a Match Fixture
export const createMatchFixture = async (req, res, next) => {
    try {
        const newMatch = new matchFixtures(req.body);
        await newMatch.save();
        res.status(201).json({
            success: true,
            message: "Match Fixture created successfully",
            data: newMatch,
        });
    } catch (error) {
        next(error);
    }
};

// Update Match Fixture
export const updateMatchFixture = async (req, res, next) => {
    try {
        const updatedMatch = await matchFixtures.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMatch) {
            return res.status(404).json({
                success: false,
                message: "Match Fixture not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Match Fixture updated successfully",
            data: updatedMatch,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Match Fixture
export const deleteMatchFixture = async (req, res, next) => {
    try {
        const deletedMatch = await matchFixtures.findByIdAndDelete(req.params.id);
        if (!deletedMatch) {
            return res.status(404).json({
                success: false,
                message: "Match Fixture not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Match Fixture deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};