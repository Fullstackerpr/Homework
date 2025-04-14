import { Router } from "express";
import * as playersController from "../controllers/playersController.js";

const router = Router();

router.get('/players', playersController.getAllPlayers);
router.get('/players/:id', playersController.getPlayerById);
router.post('/players', playersController.createPlayer);
router.put('/players/:id', playersController.updatePlayer);
router.delete('/players/:id', playersController.deletePlayer);

export { router as playersRouter };