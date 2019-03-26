import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    photos: [{ url: String }]
  },
  {
    timestamps: true
  }
);

export const UserModel = mongoose.model('User', UserSchema);
