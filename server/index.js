import express, { urlencoded, json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Routes
import cloudinary from './routes/cloudinary-upload';

// Config
import { APP_PORT, MONGO_URI } from './config';

// Initilizing Express
const app = express();

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

// Middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

// API endpoint for our uploading routes.
app.use('/api', cloudinary);

// API endpoint to greet a new user!
app.get('/', (req, res) =>
  res.send(
    'Welcome to File Uploading with Multer & Cloudinary, Try out api/cloudinary/upload/single & api/cloudinary/upload/multiple'
  )
);

// Listening of provided port.
app.listen(APP_PORT, () =>
  console.log(`Blast off on http://localhost:${APP_PORT} ...`)
);
