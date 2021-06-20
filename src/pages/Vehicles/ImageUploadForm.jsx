import React from "react";
import {   useFormContext } from "react-hook-form";

function ImageUpload() {
    const methods = useFormContext();

 return (
    <form>
      <input {...methods.register("photo[]")} type="file" accept="image/" max={5} mix={1}     multiple  />
    
    </form>
    
  );
}

export default ImageUpload;



