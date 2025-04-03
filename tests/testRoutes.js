import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

router.get("/test", (req, res) => {
  const user = {
    id: 1,
    username: "testuser",
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  const id = user.id;

  res.json({ token, id });
});

export default router;
