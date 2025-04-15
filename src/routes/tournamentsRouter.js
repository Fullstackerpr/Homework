import { Router } from "express";
import* as tournamentsController from "../controllers/tournamentsController.js";

const router = Router();

router.get('/tournaments', tournamentsController.getAllTournaments);
router.get('/tournaments/:id', tournamentsController.getTournamentById);
router.post('/tournaments', tournamentsController.createTournament);
router.put('/tournaments/:id', tournamentsController.updateTournament);
router.delete('/tournaments/:id', tournamentsController.deleteTournament);

export { router as tournamentsRouter };