const Note = require("../models/noteModel");

const getNotes = async (req, res) => {
  const userId = req.userId;
  try {
    const notes = await Note.find({ userId });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addNote = async (req, res) => {
  const userId = req.userId;
  try {
    const { title, body, pinned } = req.body;
    const note = await Note.create({ title, body, pinned, userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await Note.findById(id);
    if (!exists) {
      throw new Error("Note not found");
    }
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await Note.findById(id);
    if (!exists) {
      throw new Error("Note not found");
    }
    const { title, body, pinned } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, {
      title,
      body,
      pinned,
    });
    res.status(200).json({ updatedNote });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const togglePinNote = async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await Note.findById(id);
    if (!exists) {
      throw new Error("Note not found");
    }
    const updatedNote = await Note.findByIdAndUpdate(id, {
      pinned: !exists.pinned,
    });
    res.status(200).json({ updatedNote });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getNotes, addNote, deleteNote, updateNote, togglePinNote };
