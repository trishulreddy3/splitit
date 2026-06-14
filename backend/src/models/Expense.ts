import mongoose, { Schema, Document, Types } from "mongoose";

export interface IExpenseSplit {
  user: Types.ObjectId;
  amount: number;
  percentage?: number;
  shares?: number;
}

export interface IExpense extends Document {
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
  expenseDate: Date;
  receipt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema = new Schema(
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
    expenseDate: { type: Date, default: Date.now },
    receipt: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
