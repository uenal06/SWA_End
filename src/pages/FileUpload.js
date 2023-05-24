import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ ownerId, directoryId }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await axios.post('http://localhost:8080/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Create file entry in the database
                const newFile = {
                    name: selectedFile.name,
                    ownerUserId: ownerId,
                    directoryId: directoryId,
                    size: selectedFile.size
                };

                await axios.post('http://localhost:8080/file', newFile);
                console.log('File uploaded successfully');
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
