import { Router } from "express";
import * as tournamentGroupsController from "../controllers/tournamentGroupsController.js";

const router = Router();

router.get('/tournament_groups', tournamentGroupsController.getAllTournamentGroups);
router.get('/tournament_groups/:id', tournamentGroupsController.getTournamentGroupById);
router.post('/tournament_groups', tournamentGroupsController.createTournamentGroup);
router.put('/tournament_groups/:id', tournamentGroupsController.updateTournamentGroup);
router.delete('/tournament_groups/:id', tournamentGroupsController.deleteTournamentGroup);

export { router as tournamentGroupsRouter };