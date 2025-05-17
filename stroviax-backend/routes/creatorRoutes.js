import express from "express";
import Creator from "../models/creatorModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const creators = await Creator.find({});
    res.json(creators);
  } catch (err) {
    res.status(500).json({ message: "Error fetching creators" });
  }
});

export default router;
