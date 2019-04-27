import cloudinary from 'cloudinary';

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../../config';

// Configuring the Cloudinary lib to our settings & env variables.
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export default {
  /**
   * Uploads an array of files parsed by multer to cloudinary, and returns an array of strings with the url of the
   * uploaded files respectivley
   * @params files An Array of files that have been parsed by the multer middleware normally found in 'req.files''
   * @returns [String] { url: String } An array of strings containing the uploaded files url.
   */
  uploadFiles: function(files) {
    // The 'Cloudinary' API doesn't return a Promise by default, so we have to excplicitly return one ouselves so that
    // we can use the new await/async syntax.
    return new Promise((resolve, reject) => {
      let payload = []; // Temporary array that will store the uploaded photos url to be sent back to client.

      // Loop through the array of files and upload each one of them to Cloudinary.
      files.forEach((values, index, array) => {
        cloudinary.v2.uploader.upload(values.path, (err, result) => {
          if (err) return reject(err); // In case of an error we reject the promise and pass the error.

          // Otherwise, the upload was succesful & push the resulting Cloudinary url to our array of photos of the payload.
          payload.push({ url: result.secure_url });
          // Only send a response back to the client after all of the files have been properly uploaded.
          if (payload.length === array.length) {
            resolve(payload);
          }
        });
      });
    });
  }
};
