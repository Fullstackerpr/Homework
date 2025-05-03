import express from "express";
import cookieParser from "cookie-parser";
import { mainRouter } from "./routes/index.js";
import { mongoDB } from "./config/db.js";
import { logger } from "./utils/logger/logger.js";
mongoDB();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());

app.use("/course", mainRouter);

process.on("uncaughtException", (err) => {
  if (err) console.log(`Uncaught exception:`, err);
  process.exit(1);
});

process.on("unhandledRejection", (ression) =>
  console.log(`Unhandled rejection:`, ression)
);

app.use((err, __, res, next) => {
  if (err) {
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  } else {
    next();
  }
});

app.listen(PORT, logger.info(`Server is running on port ${PORT}`));
