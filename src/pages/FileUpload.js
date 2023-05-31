import React, {useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = ({ownerId, directoryId, loadFiles}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length <= 10) {
            setSelectedFiles(Array.from(files));
        } else {
            toast.error('You can only upload up to 10 files');
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length > 0) {
            try {
                const fileUploadPromises = selectedFiles.map(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);


                    // Create file entry in the database
                    const newFile = {
                        name: file.name,
                        ownerUserId: ownerId,
                        directoryId: directoryId,
                        size: file.size
                    };
                    const getUser = await axios.get(`http://localhost:8080/user/${localStorage.getItem("myStoredId")}`)


                    const currentSize = await axios.get(`http://localhost:8080/file/quota/user/${localStorage.getItem("myStoredId")}`)
                    if (currentSize.data + newFile.size > getUser.data.quota) {
                        toast.error("You have exceeded your quota!")
                        return null;

                    }
                    const response = await axios.post('http://localhost:8080/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    await axios.post('http://localhost:8080/file', newFile);
                    toast.success('Files uploaded!');


                    return response;
                });

                await Promise.all(fileUploadPromises);

                loadFiles();
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        }
    };

    return (
        <div>
            <ToastContainer/>
            <label className="form-label"> </label>
            <input className="form-control" type="file" onChange={handleFileChange} multiple/>
            <button className="btn btn-outline-primary" onClick={handleUpload}>
                Upload Files
            </button>
        </div>
    );
};

export default FileUpload;
