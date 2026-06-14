import mongoose, { Schema, Document, Types } from "mongoose";
import { IExpenseSplit } from "./Expense";

export interface IRecurringExpense extends Document {
  name: string;
  description?: string;
  amount: number;
  currency: string;
  category: string;
  paidBy: Types.ObjectId;
  group?: Types.ObjectId;
  participants: Types.ObjectId[];
  splits: IExpenseSplit[];
  splitMethod: "equal" | "unequal" | "percentage" | "shares";
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  nextRun: Date;
  endDate?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RecurringExpenseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    category: { type: String, required: true },
    paidBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    splits: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        amount: { type: Number, required: true },
        percentage: { type: Number },
        shares: { type: Number },
      },
    ],
    splitMethod: {
      type: String,
      enum: ["equal", "unequal", "percentage", "shares"],
      required: true,
    },
    frequency: { type: String, enum: ["daily", "weekly", "monthly", "yearly"], required: true },
    nextRun: { type: Date, required: true },
    endDate: { type: Date },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRecurringExpense>("RecurringExpense", RecurringExpenseSchema);
