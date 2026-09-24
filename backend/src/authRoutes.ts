import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "./db.js";
import { validateResource } from "./validate.js";
import { Router, Request, Response } from "express";
import { authRequestSchema } from "./schemas.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

router.post("/register", validateResource(authRequestSchema), async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const userCheck = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
      [username, passwordHash]
    );

    res.status(201).json({ message: "User registered successfully!", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post("/login", validateResource(authRequestSchema), async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: "Invalid username or password." });

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) return res.status(401).json({ error: "Invalid username or password." });

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post("/logout", async (_req: Request, res: Response) => {
  res.json({ message: "Logged out successfully. Please remove the token from your client." });
});

export default router;
