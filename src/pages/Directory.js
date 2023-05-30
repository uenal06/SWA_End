import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import FileUpload from "./FileUpload";
import logo from '../arrowUp.png';
import fileimg from '../file.png'
import folderimg from "../Folder-icon.png"
import style from "../App.css";
import { toast } from "react-toastify";

export default function Directory() {
    const [directories, setDirectories] = useState([]);
    const [files, setFiles] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState("");
    const [sharedDirectories, setSharedDirectories] = useState([]);
    const [sharedFiles, setSharedFiles] = useState([]);
    const [showSharedTable, setShowSharedTable] = useState(false);

    const { userId, directoryId } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        const myStoredId = localStorage.getItem("myStoredId");
        if (myStoredId === "") {
            navigate("/login");
            return;
        }

        loadDirectories();
        loadFiles();
        getCurrentDirectory();
        getSharedDirectories();
    }, [userId, directoryId, navigate]);

    const loadDirectories = async () => {
        const result = await axios.get(
            `http://localhost:8080/directory/user/${localStorage.getItem(
                "myStoredId"
            )}/${localStorage.getItem("myStoredDirectoryId")}`
        );
        setDirectories(result.data);
    };

    const loadFiles = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/directory/files/${localStorage.getItem(
                    "myStoredDirectoryId"
                )}`
            );
            setFiles(result.data);
        } catch (error) {
            console.error("Error loading files:", error);
        }
    };

    const getCurrentDirectory = async () => {
        const result = await axios.get(
            `http://localhost:8080/directory/${localStorage.getItem(
                "myStoredDirectoryId"
            )}`
        );
        setCurrentDirectory(result.data);
        loadDirectories();
        loadFiles();
    };

    const deleteDirectory = async (id) => {
        await axios.delete(`http://localhost:8080/directory/${id}`);
        getCurrentDirectory();
    };

    const deleteFile = async (id) => {
        await axios.delete(`http://localhost:8080/file/${id}`);
        loadFiles();
    };

    const updateCurrentDirectory = (newDirectoryId) => {
        localStorage.setItem("myStoredDirectoryId", newDirectoryId);
        getCurrentDirectory();
    };

    const downloadFile = async (id, fileName) => {
        try {
            const response = await axios.get(`http://localhost:8080/download/${id}`, {
                responseType: "blob",
            });
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

    const handleGoUpClick = () => {
        if (currentDirectory.parentDirectoryId !== 0) {
            updateCurrentDirectory(currentDirectory.parentDirectoryId);
        } else {
            toast.info("You already are in the root Folder")
        }
    };

    const getSharedDirectories = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/directory/shared/user/${localStorage.getItem("myStoredId")}`
            );
            setSharedDirectories(response.data);
        } catch (error) {
            console.error("Error fetching shared directories:", error);
        }
    };

    const getSharedFiles = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/file/shared/user/${localStorage.getItem("myStoredId")}`
            );
            setSharedFiles(response.data);
        } catch (error) {
            console.error("Error fetching shared files:", error);
        }
    };

    const toggleTable = () => {
        if (showSharedTable) {
            setShowSharedTable(false);
        } else {
            setShowSharedTable(true);
            getSharedFiles();
        }
    };

    return (
        <div className="container">
            <div className="py-4">
                <div className="container d-flex justify-content-center align-items-center p-2">
                    <img
                        src={logo}
                        className="small-image btn btn-outline-primary p-2"
                        alt="GoUp"
                        onClick={handleGoUpClick}
                    />
                    <h1>{currentDirectory.directoryName}</h1>
                </div>
                <table className="table table-hover border shadow">
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
                    {showSharedTable
                        ? sharedDirectories.map((directory, index) => (
                            <tr key={index} onClick={() => updateCurrentDirectory(directory.directoryId)}>
                                <th scope="row">
                                    <img className="small-image" src={folderimg} alt=""/>
                                </th>
                                <td>{directory.directoryName}</td>
                                <td>-</td>
                                <td>{directory.parentDirectoryId}</td>
                                <td>{directory.ownerUserID}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        onClick={() =>
                                            updateCurrentDirectory(directory.directoryId)
                                        }
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
                                        onClick={() =>
                                            deleteDirectory(directory.directoryId)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        className="btn btn-outline-secondary"
                                        to={`/shareDir/${directory.directoryId}`}
                                    >
                                        Share
                                    </Link>
                                </td>
                            </tr>
                        ))
                        : directories.map((directory, index) => (
                            <tr key={index} className="table table-hover" onClick={() =>
                                updateCurrentDirectory(directory.directoryId)
                            }>
                                <th scope="row">
                                    <img className="small-image" src={folderimg} alt=""/>
                                </th>
                                <td>{directory.directoryName}</td>
                                <td>-</td>
                                <td>{directory.parentDirectoryId}</td>
                                <td>{directory.ownerUserID}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        onClick={() =>
                                            updateCurrentDirectory(directory.directoryId)
                                        }
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
                                        onClick={() =>
                                            deleteDirectory(directory.directoryId)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        className="btn btn-outline-secondary"
                                        to={`/shareDir/${directory.directoryId}`}
                                    >
                                        Share
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    {showSharedTable
                        ? sharedFiles.map((file, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    <img className="small-image" src={fileimg} alt=""/>
                                </th>
                                <td>{file.name}</td>
                                <td>{file.size}</td>
                                <td>{file.directoryId}</td>
                                <td>{file.ownerUserId}</td>
                                <td>
                                    <button
                                        className="btn btn-primary mx-2"
                                        onClick={() => downloadFile(file.fileId, file.name)}
                                    >
                                        Download
                                    </button>
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/editfile/${file.fileId}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteFile(file.fileId)}
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        className="btn btn-outline-secondary"
                                        to={`/shareFile/${file.fileId}`}
                                    >
                                        Share
                                    </Link>
                                </td>
                            </tr>
                        ))
                        : files.map((file, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    <img className="small-image" src={fileimg} alt=""/>
                                </th>
                                <td>{file.name}</td>
                                <td>{file.size}</td>
                                <td>{file.directoryId}</td>
                                <td>{file.ownerUserId}</td>
                                <td>
                                    <button
                                        className="btn btn-primary mx-2"
                                        onClick={() => downloadFile(file.fileId, file.name)}
                                    >
                                        Download
                                    </button>
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/editfile/${file.fileId}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteFile(file.fileId)}
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        className="btn btn-outline-secondary"
                                        to={`/shareFile/${file.fileId}`}
                                    >
                                        Share
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    <tr>
                        <td>
                            <Link className="btn btn-outline-primary" to="/adddirectory">
                                Add Directory
                            </Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <FileUpload
                ownerId={localStorage.getItem("myStoredId")}
                directoryId={localStorage.getItem("myStoredDirectoryId")}
                loadFiles={loadFiles}
            />
            <div className="py-4">
                <button className="btn btn-primary" onClick={toggleTable}>
                    {showSharedTable ? "Show My Directories" : "Show Shared Directories"}
                </button>
            </div>
        </div>
    );
}
