import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB conectado correctamente");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Error en MongoDB:", err);
    });

    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", (error as Error).message);
    process.exit(1);
  }
};
