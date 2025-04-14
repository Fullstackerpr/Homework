import { Router } from "express";
import * as footballClubsController from "../controllers/index.js";

const router = Router();

router.get('/football_clubs', footballClubsController.getAllFootballClubs);
router.get('/football_clubs/:id', footballClubsController.getFootballClubById);
router.post('/football_clubs', footballClubsController.createFootballClub);
router.put('/football_clubs/:id', footballClubsController.updateFootballClub);
router.delete('/football_clubs/:id', footballClubsController.deleteFootballClub);

export { router as footballClubsRouter };