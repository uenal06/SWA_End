import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FileUpload from "./FileUpload";

export default function Directory() {
    const [directories, setDirectories] = useState([]);
    const [files, setFiles] = useState([]);
    const [currentDirectoryName, setCurrentDirectoryName] = useState("");

    const { userId, directoryId } = useParams();

    useEffect(() => {
        loadDirectories();
        loadFiles();
        getCurrentDirectoryName();
    }, [userId, directoryId]);

    const loadDirectories = async () => {
        const result = await axios.get(
            `http://localhost:8080/directory/user/${localStorage.getItem(
                "myStoredId"
            )}/${localStorage.getItem("myStoredDirectoryId")}`
        );
        setDirectories(result.data);
    };

    const loadFiles = async () => {
        const result = await axios.get(
            `http://localhost:8080/directory/files/${localStorage.getItem(
                "myStoredDirectoryId"
            )}`
        );
        setFiles(result.data);
    };

    const getCurrentDirectoryName = async () => {
        const result = await axios.get(
            `http://localhost:8080/directory/${localStorage.getItem(
                "myStoredDirectoryId"
            )}`
        );
        setCurrentDirectoryName(result.data.directoryName);
    };

    const deleteDirectory = async (id) => {
        await axios.delete(`http://localhost:8080/directory/${id}`);
        loadDirectories();
    };

    const deleteFile = async (id) => {
        await axios.delete(`http://localhost:8080/file/${id}`);
        loadFiles();
    };

    const downloadFile = async (id, fileName) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/download/${id}`,
                {
                    responseType: "blob", // Set the response type to 'blob'
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <div className="container">
            <div className="py-4">
                <h1>{currentDirectoryName}</h1>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Name</th>
                        <th scope="col">Size</th>
                        <th scope="col">Parent Directory ID</th>
                        <th scope="col">Owner User ID</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {directories.map((directory, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{directory.directoryName}</td>
                            <td>-</td>
                            <td>{directory.parentDirectoryId}</td>
                            <td>{directory.ownerUserID}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewdirectory/${directory.directoryId}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="btn btn-outline-primary mx-2"
                                    to={`/editdirectory/${directory.directoryId}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => deleteDirectory(directory.directoryId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {files.map((file, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{file.name}</td>
                            <td>{file.size}</td>
                            <td>{file.directoryId}</td>
                            <td>{file.ownerUserId}</td>
                            <td>
                                <button
                                    className="btn btn-primary mx-2"
                                    onClick={() =>
                                        downloadFile(file.fileId, file.name) // Pass fileId and fileName to downloadFile function
                                    }
                                >
                                    Download
                                </button>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => deleteFile(file.fileId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <FileUpload
                ownerId={localStorage.getItem("myStoredId")}
                directoryId={localStorage.getItem("myStoredDirectoryId")}
            />
        </div>
    );
}
