import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  CatId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String, // Optional: URL or icon name (if using an icon set)
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const categoryModel =
  mongoose.models.categories ?? mongoose.model("categories", categorySchema);
