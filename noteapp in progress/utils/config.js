import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB = process.env.MONGODB_URI || "mongodb://localhost:/3001/testerer";
const MONGO_user = process.env.MONGO_user;

export default { PORT, MONGODB, MONGO_user };
