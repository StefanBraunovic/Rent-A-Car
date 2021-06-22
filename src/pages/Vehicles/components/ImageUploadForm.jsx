import React from 'react';
import {useFormContext} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';

function ImageUpload() {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <form>
      <input
        style={{padding: '8px'}}
        {...register('photo[]', {required: true})}
        type="file"
        accept="image/"
        multiple
      />
      <ErrorMessage
        errors={errors}
        name="photo[]"
        render={err => {
          return (
            <p style={{color: 'red', marginLeft: '10px'}}>
              Minimum one image {err.message}
            </p>
          );
        }}
      />
    </form>
  );
}

export default ImageUpload;
