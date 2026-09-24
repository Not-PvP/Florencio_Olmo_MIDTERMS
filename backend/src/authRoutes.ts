import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "./db";
import { validateResource } from "./validate";
import { Router, Request, Response } from "express";
import { authRequestSchema } from "./schemas";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

router.post(
  "/register",
  validateResource(authRequestSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

  try {
    const userCheck = await pool.query(
    `SELECT email FROM users WHERE email = $1`,
    [email]
  );
  if (userCheck.rows.length > 0) {
  return res.status(409).json({ error: "Email already exists." });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const result = await pool.query(
    `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email`,
    [email, passwordHash]
  );

  res.status(201).json({
    message: "User registered successfully!",
    user: result.rows[0],
  });
} catch (error) {
  res.status(500).json({ error: (error as Error).message });
    }
  }
 );

router.post(
  "/login",
  validateResource(authRequestSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      // find the user
      const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );
      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // compare or check whether the login password is correct
      const isValidPassword = await bcrypt.compare(
        password,
        user.password_hash
      );
      if (isValidPassword) {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        // the spec's SET_AUTH action needs both the user and the token
        return res.json({
          message: "Login successful",
          token,
          user: { id: user.id, email: user.email },
        });
      }

      res.status(401).json({ error: "Invalid email or password." });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

// POST Logout /api/auth/logout
router.post("/logout", async (req: Request, res: Response) => {
  // Since standard JWTs are stateless, and stored on the client side,
  // The server doesn't destroy the token. We simply instruct the client to delete it.
  res.json({ message: "Logged out successfully. Please remove the token from your client." });
});

export default router;
