import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3003;
const MONGOURL = process.env.MONGOURL || "mongodb://localhost:/3003/testerer";

export default { PORT, MONGOURL };
