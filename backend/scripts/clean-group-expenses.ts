import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Expense from "../src/models/Expense";
import Settlement from "../src/models/Settlement";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const cleanGroupExpenses = async () => {
  const groupId = process.argv[2];

  if (!groupId) {
    console.error("Please provide a groupId as an argument.");
    console.error("Usage: npx ts-node scripts/clean-group-expenses.ts <groupId>");
    process.exit(1);
  }

  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    console.log(`Connecting to database...`);
    await mongoose.connect(mongoUri);

    console.log(`Cleaning expenses for group: ${groupId}`);
    const expenseResult = await Expense.deleteMany({ group: groupId });
    console.log(`Deleted ${expenseResult.deletedCount} expenses.`);

    console.log(`Cleaning settlements for group: ${groupId}`);
    const settlementResult = await Settlement.deleteMany({ group: groupId });
    console.log(`Deleted ${settlementResult.deletedCount} settlements.`);

    console.log("Cleanup completed successfully!");
  } catch (error) {
    console.error("Error cleaning group expenses:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

cleanGroupExpenses();
