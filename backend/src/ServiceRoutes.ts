import { Router, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { pool } from "./db";
import { validateResource } from "./validate";
import { createIncidentSchema, incidentIdSchema, updateIncidentSchema } from "./schemas";
import { authenticateToken } from "./authMiddleware";

const router = Router();

// JOIN users so each incident also shows who reported it
const SELECT_INCIDENTS = `
  SELECT i.*, u.email AS reporter_email
  FROM incidents i
  LEFT JOIN users u ON u.id = i.created_by
`;

//GET /api/incidents
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `${SELECT_INCIDENTS} ORDER BY i.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/incidents
router.post(
  "/",
  authenticateToken,
  validateResource(createIncidentSchema),
  async (req: Request, res: Response) => {
    // retrieve the specific properties of the incident from
    // the request's body
    const { title, description, severity, status } = req.body;
    // the logged in user (decoded JWT set by authenticateToken)
    const { userId } = req.user as JwtPayload;
    try {
      const result = await pool.query(
        `INSERT INTO incidents (title, description, severity, status, created_by)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [title, description, severity ?? "low", status ?? "open", userId]
      );

      // send back the full incident (with reporter_email) like GET does
      const incident = await pool.query(`${SELECT_INCIDENTS} WHERE i.id = $1`, [
        result.rows[0].id,
      ]);
      res.status(201).json(incident.rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

// PATCH /api/incidents/:id  (severity and/or status)
router.patch(
  "/:id",
  authenticateToken,
  validateResource(updateIncidentSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { severity, status } = req.body;
    try {
      const params = { severity, status };
      // keep only the fields that were sent
      const presentParams = Object.fromEntries(
        Object.entries(params).filter(([_key, value]) => value !== undefined)
      );
      if (Object.keys(presentParams).length === 0) {
        return res.status(400).json({ error: "Provide severity and/or status." });
      }

      // "severity = $1, status = $2" (commas between each field)
      const setClause = Object.keys(presentParams)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");

      const result = await pool.query(
        `UPDATE incidents SET ${setClause}
         WHERE id = $${Object.keys(presentParams).length + 1}
         RETURNING id`,
        Object.values(presentParams).concat(id)
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }

      const incident = await pool.query(`${SELECT_INCIDENTS} WHERE i.id = $1`, [id]);
      res.json(incident.rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

// DELETE /api/incidents/:id
router.delete(
  "/:id",
  authenticateToken,
  validateResource(incidentIdSchema),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        `DELETE FROM incidents
         WHERE id = $1
         RETURNING *`,
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Incident not found" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
