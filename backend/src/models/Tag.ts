import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITag extends Document {
  name: string;
  group?: Types.ObjectId;
  user: Types.ObjectId;
  color?: string;
  createdAt: Date;
}

const TagSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    color: { type: String, default: "#000000" },
  },
  { timestamps: true }
);

export default mongoose.model<ITag>("Tag", TagSchema);
