import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITask extends Document {
  nombre: string;
  fecha: Date;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    nombre: { type: String, required: true, trim: true },
    fecha: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);
export default Task;
