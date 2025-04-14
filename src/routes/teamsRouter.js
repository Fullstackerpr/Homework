import { Router } from "express";
import * as teamsController from "../controllers/teamsController.js";

const router = Router();

router.get('/teams', teamsController.getAllTeams);
router.get('/teams/:id', teamsController.getTeamById);
router.post('/teams', teamsController.createTeam);
router.put('/teams/:id', teamsController.updateTeam);
router.delete('/teams/:id', teamsController.deleteTeam);

export { router as teamsRouter };