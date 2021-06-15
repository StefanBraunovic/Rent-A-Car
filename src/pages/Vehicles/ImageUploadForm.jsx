// import React,{useState} from "react";
import { useFormContext } from "react-hook-form";
 


// export default function ImageUploadForm() {
  
//   const methods = useFormContext();
//   return <>
//   <input accept="image/png, image/gif, image/jpeg"   type="file" id='photo' name="photo[]" {...methods.register("photo[]")}  

//   multiple/>
//   </>
// }


import React, { useState } from 'react';
import { Upload } from 'antd';
//import ImgCrop from 'antd-img-crop';

const ImageUpload = ({fileList,setFileList}) => {

   const methods = useFormContext();

  

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
  
                maxCount={5}
                minCount={1}
                multiple
                onPreview={onPreview}
                {...methods.register("photo[]")}
            >
                {fileList.length < 5 && '+ Upload'}
            </Upload>
    );
};

export default ImageUpload;


