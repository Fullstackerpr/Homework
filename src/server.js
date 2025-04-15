import express from "express";
import dotenv from "dotenv";

import { mongoConnect } from "./db/index.js";
import { errorHandler } from "./middlewares/index.js";
import {
    footballClubsRouter,
    matchFixturesRouter,
    playersRouter,
    teamsRouter,
    tournamentGroupsRouter,
    tournamentsRouter
} from "./routes/index.js";

mongoConnect();
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(errorHandler);

const router = [
    footballClubsRouter,
    matchFixturesRouter,
    playersRouter,
    teamsRouter,
    tournamentGroupsRouter,
    tournamentsRouter,
];  

app.use("/football", ...router);

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`));