import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBudget extends Document {
  group?: Types.ObjectId;
  user: Types.ObjectId;
  category: string;
  amount: number;
  currency: string;
  period: "monthly" | "weekly" | "yearly";
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema: Schema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    period: { type: String, enum: ["monthly", "weekly", "yearly"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>("Budget", BudgetSchema);
