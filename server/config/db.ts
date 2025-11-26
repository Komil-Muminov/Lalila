
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lumina_shop');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
    }
    // Cast process to any to avoid TypeScript error about 'exit' not existing on 'Process'
    (process as any).exit(1);
  }
};

export default connectDB;
