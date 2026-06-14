import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGroup extends Document {
  name: string;
  description?: string;
  avatar?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  totalExpenses: number;
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    avatar: { type: String },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    totalExpenses: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IGroup>("Group", GroupSchema);
