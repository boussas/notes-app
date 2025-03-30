const express = require("express");
const router = express.Router();
const {
  getNotes,
  addNote,
  deleteNote,
  updateNote,
  togglePinNote,
} = require("../controllers/notesController");
router.get("/", getNotes);
router.post("/", addNote);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);
router.patch("/togglePin/:id", togglePinNote);
module.exports = router;
