import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertBudgetSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Mock auth - using a hardcoded user ID for now as requested to "make it workable"
  const MOCK_USER_ID = "123";

  app.get("/api/transactions", async (req, res) => {
    const transactions = await storage.getTransactions(MOCK_USER_ID);
    res.json(transactions);
  });

  app.post("/api/transactions", async (req, res) => {
    const result = insertTransactionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const transaction = await storage.createTransaction(MOCK_USER_ID, result.data);
    res.json(transaction);
  });

  app.get("/api/budgets", async (req, res) => {
    const budgets = await storage.getBudgets(MOCK_USER_ID);
    res.json(budgets);
  });

  app.post("/api/budgets", async (req, res) => {
    const result = insertBudgetSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const budget = await storage.createBudget(MOCK_USER_ID, result.data);
    res.json(budget);
  });

  return httpServer;
}
