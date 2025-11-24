import mongoose from "mongoose";
const noteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    important: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

noteSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;

    //format date to normal string
    ret.date = new Date(ret.date).toLocaleString("fi-FI", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, //24h format
    });
  },
});

export default mongoose.model("Note", noteSchema);
