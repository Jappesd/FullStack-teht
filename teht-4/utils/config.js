import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3003;
const MONGOURL = process.env.MONGOURL || process.env.TEST_MONGODB;

export default { PORT, MONGOURL };
