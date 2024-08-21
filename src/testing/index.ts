import { Router } from "express";
import { db } from "../db/mongo-db";

export const testingRouter = Router();

testingRouter.delete("/all-data", async (req, res) => {
  await db.dropDatabase({});
  res.status(204).json({});
});
