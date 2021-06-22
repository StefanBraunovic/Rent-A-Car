import React from 'react';
import {useFormContext} from 'react-hook-form';

function ImageUpload() {
  const methods = useFormContext();

  return (
    <form>
      <input
        style={{padding: '8px'}}
        {...methods.register('photo[]', {required: true, min: 1, max: 5})}
        type="file"
        accept="image/"
        max={5}
        mix={1}
        multiple
      />
    </form>
  );
}

export default ImageUpload;
