import React, { Component } from 'react';
import { SingleFileForm } from './components/forms/single';
import { MultipleFileForm } from './components/forms/multiple';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <p>
          File Upload Example using ReactJs, Formik, & Axios on the Front-end.
          ExpressJs, Multer, Cloudinary(npm api) & Mongoose on the Back-end
        </p>
        <h3>Upload a Single File!</h3>
        <SingleFileForm />
        <h3>Upload Multiple Files! Max: 5</h3>
        <MultipleFileForm />
      </div>
    );
  }
}

export default App;
