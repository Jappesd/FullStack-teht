import mongoose from "mongoose";
import { getConnection } from "../utils/connections.js";
import config from "../utils/config.js";
const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  important: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

noteSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});
// Cache the model after first connection
let NoteModel;

export const getNoteModel = async () => {
  if (NoteModel) return NoteModel;
  const conn = await getConnection(config.MONGO_user);
  NoteModel = conn.model("Note", noteSchema);
  return NoteModel;
};
