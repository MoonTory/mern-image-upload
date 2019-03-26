export const {
  APP_PORT = process.env.PORT || 5000,
  NODE_ENV = process.env.NODE_ENV || '',
  CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '',
  // Mongo Config
  DB_USER = process.env.DB_USER || '',
  DB_PASS = process.env.DB_PASS || '',
  DB_HOST = process.env.DB_HOST || '',
  DB_PORT = process.env.DB_PORT || '',
  DB_NAME = process.env.DB_NAME || '',
  MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
} = process.env;
