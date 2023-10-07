import { useState } from "react";
import DropZone from "./DropZone";
import classes from '../../assets/css/module/mainDesign.module.scss';

// eslint-disable-next-line react/prop-types
const ImgManage = ({onImageUpload, imgFormat}) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [error, setError] = useState({
        status: false, msg: ''
      });
      console.log(selectedFile)
      
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
    // SearchBox
    // console.log(selectedFile)
    const SearchBox = ()=> {
        const [searchItem, setSearchItem] = useState('');
        
        // const decodedString = atob(selectedFile);
        
        // var pattern = /data:([^;]+);/;
        // var result=selectedFile.map(selectFile=>selectFile.match(pattern))
        // result.map(items=>console.log(items))
        //  console.log(result)
        //  if (result) {
        //     // result[0] will contain the entire matched substring
        //     // result[1] will contain the content between "data:" and ";"
        //     var extractedData = result[1];
        //     console.log(extractedData);
        //   } else {
        //     console.log("Pattern not found in the input string.");
        //   }
        // result.filter((item) => {
        //     if (item.toLowerCase().includes(searchItem.toLowerCase())) { return item; }
        // })
        return (
            <div>
                <div className="searchBox">
                    <input type="search" placeholder="Search files" name="" id="" value={searchItem} onChange={(event)=>setSearchItem(event.target.value)}/>
                </div>
            </div>
        );
    
    }
    return (
        <div className={classes.row}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h4>Select Image</h4>
                    <p>Close</p>
                </div>
                <div className={classes.sidebar}>
                    <div className={classes.sidebarTopContent}>
                        <div className={classes.sidebarOption}>
                            <p>Store Library</p>
                            <p>Icon</p>
                        </div>
        
                        <div className={classes.sidebarOption}>
                            <p>Images</p>
                            <p>{selectedFile.length}</p>
                        </div>
        
                        <div className={classes.sidebarOption}>
                            <p>Selected</p>
                            <p>Icon</p>
                        </div>
                    </div>
                    <div className={classes.sidebarBottomContent}>
                        <div className={classes.sidebarOption}>
                            <p>Saved Views</p>
                            <p>Icon</p>
                        </div>
                        <div className= {classes.sidebarOption}>
                            <p>No saved views found</p>
                        </div>
                    </div>
                </div>
                <div className={classes.mainBody}>
                    <div className={classes.navFilter}>
                        <SearchBox />
                        <div className={classes.filterOption}>
                            <h5>Filte</h5>
                            <h5>Sort</h5>
                            <h5>View</h5>
                        </div>
                    </div>
                    <div className={classes.scrollBar}>
                        <DropZone dataOnLoad={dataOnLoad} imgFormat={imgFormat} setError={setError} error={error} />

                        <div className={classes.images}>
                            {selectedFile.map((selectFile, index)=>{
                                return(
                                    <div key={index} className={classes.imageBox}>
                                        <img src={selectFile} alt="Uploaded" />
                                    </div>
                                )
                            })}
                        </div> 
                    </div>
                </div>
                <div className={classes.footer}>
                    <button type="button">Close</button>
                    <button type="button">Done</button>
                </div>
            </div>
        </div> 
    )
}

export default ImgManage;
