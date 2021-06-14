import React,{useState} from "react";
import { useFormContext } from "react-hook-form";
 


export default function ImageUploadForm() {
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
  const methods = useFormContext();
  return <>
  <input accept="image/png, image/gif, image/jpeg"   type="file" id='photo' name="photo[]" {...methods.register("photo[]")}  
   value={selectedFile}
  multiple/>
  </>
}
