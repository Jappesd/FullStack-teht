// seed-if-empty.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.js"; // adjust paths if needed
import Note from "./models/note.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB for conditional seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

const seedIfEmpty = async () => {
  const userCount = await User.countDocuments();
  const noteCount = await Note.countDocuments();

  if (userCount === 0) {
    const passwordHash = await bcrypt.hash("testpassword", 10);
    const user = new User({
      username: "testuser",
      name: "Test User",
      passwordHash,
    });
    await user.save();
    console.log("Test user created");
  } else {
    console.log("Users already exist, skipping user seeding");
  }

  if (noteCount === 0) {
    const user = await User.findOne({ username: "testuser" });
    if (user) {
      const notes = [
        {
          content: "Welcome to your note app!",
          important: true,
          user: user._id,
        },
        { content: "This is a test note.", important: false, user: user._id },
      ];
      await Note.insertMany(notes);
      console.log("Sample notes created");
    } else {
      console.log("No user to assign notes to, skipping note seeding");
    }
  } else {
    console.log("Notes already exist, skipping note seeding");
  }

  mongoose.connection.close();
  console.log("Seeding complete!");
};

seedIfEmpty();
