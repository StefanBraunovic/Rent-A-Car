import React from "react";
import {   useFormContext } from "react-hook-form";

function ImageUpload() {
    const methods = useFormContext();

 return (
    <form>
      <input {...methods.register("photo[]")} type="file"  />
    
    </form>
    
  );
}

export default ImageUpload;



