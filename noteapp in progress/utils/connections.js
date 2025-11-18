import mongoose from "mongoose";
import config from "./config.js";

let _connection = null;

// connection to db (single collection)
export const getConnection = async (url) => {
  if (!_connection) {
    _connection = await mongoose.createConnection(url);
    _connection.on("connected", () => {
      console.log("connected to db for users and notes");
    });
  }
  return _connection;
};

//close connections (for tests)

export const closeConnections = async () => {
  if (_connection) {
    await _connection.close();
    console.log("Closed connection to db");
    _connection = null;
  }
};
