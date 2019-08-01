# MERN Image Upload API w/ Cloudinary

> REST API Microservice example for image uploading, backed by Express & Cloudinary.

## Getting Started

To get started using running this project, you should have [Nodejs](https://nodejs.org/en/) installed on your local dev machine, and also [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/en/).

### Installing

Yarn it!

```
cd server
yarn
```

Or use NPM

```
cd server
npm install
```

Do the same for the client. The client was bootstraped with [CRA(Create React App)](https://www.npmjs.com/package/create-react-app)

```
cd client
yarn
```

or with NPM

```
cd client
npm install
```

## Built With

### Back-end

- [ExpressJs](https://expressjs.com/) - The web framework used
- [mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [multer](https://www.npmjs.com/package/multer) - Middleware for handling multipart/form-data, which is primarily used for uploading files.
- [Cloudinary](https://www.npmjs.com/package/cloudinary) - Cloudinary's NodeJs API for interfacing w/ your Cloudinary account
- [esm](https://www.npmjs.com/package/esm) - ECMAScript module loader, used for using new ES6 syntax for ECMAScript Modules.
- [cors](https://www.npmjs.com/package/cors) - Used for allowing local client to communicate with the api.

### Front-end

- [ReactJs](https://reactjs.org/) - Web framework used for making the SPA
- [axios](https://www.npmjs.com/package/axios) - Used for making http requests to our back-end api.
- [formik](https://www.npmjs.com/package/formik) - For easily making re-usable forms.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/MoonTory/mern-image-upload-cloudinary/tags).

## Author(s)

- **Gustavo Quinta** - _Initial work_ - [MoonTory](https://github.com/moontory)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
