import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    likes: {
      type: [
        {
          username: { type: String, required: true, unique: true },
        },
      ],
    },
    tags: { type: [String], default: [""] },
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

export default Post;
