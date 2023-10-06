import mongoose from "mongoose";
// track the connection
let isConnected = false;
export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.debug("DB connected already");
    return;
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      dbName: process.env.DATABASE_NAME,
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};