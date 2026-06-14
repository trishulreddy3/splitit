import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAuditLog extends Document {
  action: string;
  user: Types.ObjectId;
  entityType: string;
  entityId: Types.ObjectId;
  details: string;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    action: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    entityType: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
    details: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
