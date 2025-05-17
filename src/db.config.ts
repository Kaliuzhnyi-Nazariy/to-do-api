import mongoose from "mongoose";

export const connectDB = async () => {
  const { DB_HOST } = process.env;

  try {
    await mongoose.connect(DB_HOST!).then(() => {});
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
