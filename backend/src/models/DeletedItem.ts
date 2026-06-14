import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDeletedItem extends Document {
  originalCollection: string;
  originalId: Types.ObjectId;
  document: any;
  deletedBy: Types.ObjectId;
  deletedAt: Date;
}

const DeletedItemSchema: Schema = new Schema(
  {
    originalCollection: { type: String, required: true },
    originalId: { type: Schema.Types.ObjectId, required: true },
    document: { type: Schema.Types.Mixed, required: true },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date, default: Date.now },
  }
);

export default mongoose.model<IDeletedItem>("DeletedItem", DeletedItemSchema);
