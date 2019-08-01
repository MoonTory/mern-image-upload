import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

export class MultipleFileForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ title: '', file: null }}
        onSubmit={async (values, actions) => {
          const payload = new FormData();

          if (values.file) {
            payload.append('title', values.title);
            payload.append('file', values.file);
            for (let i = 0; i < values.file.length; i++) {
              payload.append('file', values.file[i], values.file[i].name);
            }
          } else {
            console.log('No File was selected ya fool!');
            actions.setSubmitting(false);
            actions.resetForm();
            return;
          }

          console.log('payload', payload);

          const response = await axios({
            method: 'post',
            url: 'http://localhost:5002/api/gallery/album/create',
            data: payload,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          });

          console.log('response', response);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        // TODO: Write Yup validation for the form
        render={({ isSubmitting, errors, touched, values, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div className="form-group">
              <label>title:</label>
              <Field className="form-control" type="title" name="title" placeholder="title" />
            </div>
            <div className="form-group">
              <label htmlFor="file">File upload</label>
              <input
                id="file"
                name="file"
                type="file"
                multiple
                onChange={event => {
                  setFieldValue('file', event.currentTarget.files);
                }}
                className="form-control"
              />
            </div>
            {isSubmitting ? null : (
              <button className="btn btn-secondary" type="submit" disabled={isSubmitting}>
                Enviar
              </button>
            )}
          </Form>
        )}
      />
    );
  }
}
