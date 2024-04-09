import mongoose from "mongoose";
import {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DBNAME,
} from "../../config.js";

(async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DBNAME}?retryWrites=true&w=majority`
    );
    console.log("Database is connected to: ", db.connection.name);
  } catch (error) {
    console.error("The connection to database is broken ", error);
  }
})();
