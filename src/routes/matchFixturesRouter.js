import { Router } from "express";
import * as matchFixturesController from "../controllers/matchFixturesController.js";

const router = Router();

router.get('/match_fixtures', matchFixturesController.getAllMatchFixtures);
router.get('/match_fixtures/:id', matchFixturesController.getMatchFixtureById);
router.post('/match_fixtures', matchFixturesController.createMatchFixture);
router.put('/match_fixtures/:id', matchFixturesController.updateMatchFixture);
router.delete('/match_fixtures/:id', matchFixturesController.deleteMatchFixture);

export { router as matchFixturesRouter };