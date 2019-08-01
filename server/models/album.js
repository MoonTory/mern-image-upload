import mongoose from 'mongoose';

const AlbumSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    photos: [{ url: String }]
  },
  {
    timestamps: true
  }
);

export const AlbumModel = mongoose.model('Album', AlbumSchema);
