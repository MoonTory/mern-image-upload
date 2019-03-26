import { Router } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';

import { UserModel } from '../models/user';

import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config';

// Creating an instance of the Express Router that we will export and use in our app.
const router = Router();

// Creating a multer storage, by not specifying a 'destination' property, we are telling multer to store files in the OS's '/tmp' temporary directory.
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

// This function is for filtering the files that are being upload to only be the specified types of 'images'.
const imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Instantiating a multer instance, and passing our helper functions above to configure it properly, also passing a 'limit' property defining in 'bits' the size of limiting the uploaded file, in this case to 5mb.
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5000000 }
});

// Configuring the Cloudinary lib to our settings & env variables.
cloudinary.config({
  cloud_name: 'moontory',
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// API endpoint to upload a single file.
router.post('/upload/single', upload.single('file'), async (req, res, next) => {
  try {
    // req.file holds multer uploaded file.
    // req.body holds any other form fields, if there are any.

    await cloudinary.v2.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        // In case of an error we log it out and send it back to the client.
        console.log('err', err);
        res.status(400).json({
          err: err
        });
      }
      // Otherwise, the upload was succesful & push the resulting Cloudinary url to our payload.
      payload.photo = { url: result.secure_url };

      // Creating a new User to be saved into the DB.
      const user = new UserModel({
        name: req.body.name,
        photos: { url: result.secure_url }
      });

      // Saving the model to the DB and awaiting the results, that we will then send back to the client.
      const payload = await user.save();

      // Send response back to the client.
      res.status(200).json({
        payload
      });
    });
  } catch (error) {
    next(error);
  }
});

// API endpoint to upload multiple files, in this case up to 5 files.
// This can be modified by the second parameter of the 'upload.array(fileName, numFiles)' function.
router.post(
  '/upload/multiple',
  upload.array('file', 5),
  async (req, res, next) => {
    try {
      // req.files holds an array of the multer uploaded files, up to the max of '5'.
      // req.body holds any other form fields, if there are any.

      let photos = []; // Temporary array that will store the uploaded photos url, to then finally be saved into Mongo.

      // Loop through the array of files and upload each one of them to Cloudinary.
      req.files.forEach(async (values, index, array) => {
        await cloudinary.v2.uploader.upload(values.path, (err, result) => {
          if (err) {
            // In case of an error we log it out and send it back to the client.
            console.log('err', err);
            res.status(400).json({
              err: err
            });
          }

          // Otherwise, the upload was succesful & push the resulting Cloudinary url to our array of photos of the payload.
          photos.push({ url: result.secure_url });
        });

        // Only send a response back to the client after all of the files have been properly uploaded.
        if (photos.length === array.length) {
          // Creating a new User to be saved into the DB.
          const user = new UserModel({
            name: req.body.name,
            photos: photos
          });

          // Saving the model to the DB and awaiting the results, that we will then send back to the client.
          const payload = await user.save();

          // Send response back to the client.
          res.status(200).json({
            payload
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
