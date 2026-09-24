import { Router, Request, Response } from "express";
import { pool } from "./db.js";
import { validateResource } from "./validate.js";
import { createItServiceRequestsSchema, updateItServiceRequestsSchema, idSchema } from "./schemas.js";
import { authenticateToken } from "./authMiddleware.js";

export const itServiceRequestsRoutes = Router();

// GET
itServiceRequestsRoutes.get("/", async (req: Request, res: Response) => {
  const { search } = req.query;

  try {
    let queryText = "SELECT * FROM it_service_requests";
    const queryParams: string[] = [];

    if (search && typeof search === "string") {
      queryText += " WHERE requester_name ILIKE $1";
      queryParams.push(`%${search}%`);
    }

    queryText += " ORDER BY id ASC";

    const result = await pool.query(queryText, queryParams);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST
itServiceRequestsRoutes.post("/", authenticateToken, validateResource(createItServiceRequestsSchema), async (req: Request, res: Response) => {
  const { requester_name, title, description, priority, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO it_service_requests (requester_name, title, description, priority, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [requester_name, title, description, priority, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// PUT
itServiceRequestsRoutes.put("/:id", authenticateToken, validateResource(updateItServiceRequestsSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  const { requester_name, title, description, priority, status } = req.body;

  try {
    const params = { requester_name, title, description, priority, status };
    const presentParams = Object.fromEntries(
      Object.entries(params).filter(([_key, value]) => value !== undefined)
    );

    if (Object.keys(presentParams).length === 0) {
      return res.status(400).json({ error: "No fields supplied." });
    }

    let query = `UPDATE it_service_requests SET`;
    query = Object.entries(presentParams).reduce((acc, [key, _value], i) => {
      return acc + ` ${i > 0 ? "," : ""} ${key} = $${i + 1}`;
    }, query);

    query += ` WHERE id = $${Object.entries(presentParams).length + 1} RETURNING *`;

    const result = await pool.query(
      query,
      Object.values(presentParams).concat(id)
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "IT Service Request not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// DELETE
itServiceRequestsRoutes.delete("/:id", authenticateToken, validateResource(idSchema), async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM it_service_requests WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "IT Service Request not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
