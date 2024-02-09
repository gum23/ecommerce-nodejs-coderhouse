import mongoose from 'mongoose';

(async () => {
    try {
        const db = await mongoose.connect("mongodb+srv://ecommerce:7zrPwBUSYfhVYqPj@practicaintegradoraclus.ghxzurn.mongodb.net/ecommerce?retryWrites=true&w=majority");
        console.log("Database is connected to: ", db.connection.name);
        
    } catch (error) {
        console.error("The connection to database is broken ", error);
    }
})()