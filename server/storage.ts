import { type User, type InsertUser, type Transaction, type InsertTransaction, type Budget, type InsertBudget } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Transactions
  getTransactions(userId: string): Promise<Transaction[]>;
  createTransaction(userId: string, transaction: InsertTransaction): Promise<Transaction>;

  // Budgets
  getBudgets(userId: string): Promise<Budget[]>;
  createBudget(userId: string, budget: InsertBudget): Promise<Budget>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private transactions: Map<string, Transaction>;
  private budgets: Map<string, Budget>;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.budgets = new Map();

    // Seed some data for the "all workable" requirement if needed, 
    // but usually better to start empty or with user-created data.
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(t => t.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createTransaction(userId: string, insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      ...insertTransaction, 
      id, 
      userId,
      date: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getBudgets(userId: string): Promise<Budget[]> {
    return Array.from(this.budgets.values()).filter(b => b.userId === userId);
  }

  async createBudget(userId: string, insertBudget: InsertBudget): Promise<Budget> {
    const id = randomUUID();
    const budget: Budget = { ...insertBudget, id, userId };
    this.budgets.set(id, budget);
    return budget;
  }
}

export const storage = new MemStorage();
