import mongoose from "mongoose";
import config from "../../config.js";


// (async () => {
//   try {
//     const db = await mongoose.connect(
//       `mongodb+srv://${config.mongodb_user}:${config.mongodb_password}@${config.mongodb_cluster}/${config.mongodb_dbname}?retryWrites=true&w=majority`
//     );
//     console.log("Database is connected to: ", db.connection.name);
//   } catch (error) {
//     console.error("The connection to database is broken ", error);
//   }
// })();

// const URI = `mongodb+srv://${config.mongodb_user}:${config.mongodb_password}@${config.mongodb_cluster}/${config.mongodb_dbname}?retryWrites=true&w=majority`;
const URI = `${config.mongodb_uri}`;
const db = async () => { 
  
  try {
    const db = await mongoose.connect(URI);
    console.log("Database is conected to: ", db.connection.name)
  } catch (error) {
    console.log("The connection to database is broken ", error)
  }

}

export default db;