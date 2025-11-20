import mongoose from "mongoose";
import { getConnection } from "../utils/connections.js";
import config from "../utils/config.js";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: { type: String, required: true },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});
// Cache the model after first connection
let UserModel;

export const getUserModel = async (url = process.env.MONGO_USER) => {
  if (UserModel) return UserModel;
  const conn = await getConnection(url);
  UserModel = conn.model("User", userSchema);
  return UserModel;
};
