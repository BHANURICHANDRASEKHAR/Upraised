import mongoose from "mongoose";

export default async function DatabaseConnection() {
    try {
        const connection = await mongoose.connect(process.env.DataBase_Link);
        console.log("Database Connection Successful:");
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
       
    }
}
