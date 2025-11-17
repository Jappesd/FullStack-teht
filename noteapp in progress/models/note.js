import mongoose from "mongoose";
import { noteConnection } from "../utils/connections.js";
mongoose.set("strictQuery", false);

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Note = noteConnection.model("Note", noteSchema);
