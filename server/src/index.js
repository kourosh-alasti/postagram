import "dotenv/config";

import express from "express";
import { mongoose } from "mongoose";

const PORT = process.env.NODE_PORT || 3000;
const CONN_STR = process.env.MONGO_CONN_STR || undefined;

const app = express();

app.use(express.json());

const initDatabaseConnection = async () => {
  if (CONN_STR === undefined) {
    throw Error("Undefined Connection URL");
    return;
  }

  await mongoose.connect(CONN_STR);
  console.info("Database Connection Initialized");
};

initDatabaseConnection()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.info("Database Connection Closed");
  });

app.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`);
});
