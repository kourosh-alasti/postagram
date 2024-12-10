import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, require: true },
    following: {
      type: [
        {
          username: { type: String },
          followingSince: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    posts: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const User = model('User', UserSchema);

export default User;
