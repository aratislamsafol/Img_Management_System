import { useState } from "react";
import ImageUploader from "../ImageUploader";

// eslint-disable-next-line react/prop-types
const ImgManage = ({onImageUpload, imgFormat}) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [error, setError] = useState({
        status: false, msg: ''
      });
      
    // Function for base64 and Data onLoad   
    const dataOnLoad = (file) => {
        if (file && isSupportedImageFormat(file, imgFormat)) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Image = event.target.result;
            setSelectedFile([...selectedFile,base64Image]);
            onImageUpload(file, base64Image);
        };
        reader.readAsDataURL(file);
        } else {
        setError(
            {
            status: true,
            msg: `Invalid image format. Please upload an Valid image.`
            });
        }
    }
  
    const isSupportedImageFormat = (file, imgFormat) => {
        // eslint-disable-next-line react/prop-types
        const conCatData = imgFormat.map(element => 'image/' + element);
        return conCatData.includes(file.type)
    };
    return <ImageUploader dataOnLoad={dataOnLoad} imgFormat={imgFormat} setError={setError} error={error} selectedFile={selectedFile}/>
}

export default ImgManage;
