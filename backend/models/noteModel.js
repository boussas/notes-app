const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    pinned: { type: Boolean, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
