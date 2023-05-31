import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import folderimg from "../Folder-icon.png";
import fileimg from "../file.png";
import homeIcon from "../home.png";
import logo from "../arrowUp.png";

export default function ShareTable() {
    const [sharedDirectories, setSharedDirectories] = useState([]);
    const [sharedFiles, setSharedFiles] = useState([]);
    const [titleName, setTitleName] = useState("");
    const [currentDir, setCurrentDir] = useState([]);
    const [firstDir, setFirstDir] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [dirPermissions, setDirPermissions] = useState([]);

    useEffect(() => {
        getSharedDirectories();
        getSharedFiles();
    }, []);

    const getSharedDirectories = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/directory/shared/user/${localStorage.getItem("myStoredId")}`
            );
            setSharedDirectories(response.data);

            const temp = await axios.get(
                `http://localhost:8080/sharing/permission/directory/user/${localStorage.getItem("myStoredId")}`
            );
            setDirPermissions(temp.data);
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

            const temp = await axios.get(
                `http://localhost:8080/sharing/permission/user/${localStorage.getItem("myStoredId")}`
            );
            setPermissions(temp.data);
        } catch (error) {
            console.error("Error fetching shared files:", error);
        }
    };

    const onHomeClick = async () => {
        setFirstDir("");
        setCurrentDir("");
        await getSharedDirectories();
        await getSharedFiles();
        setTitleName("");
    };

    const handleGoUpClick = async () => {
        try {
            if (currentDir.toString() !== firstDir.toString()) {
                const response = await axios.get(`http://localhost:8080/directory/${currentDir}`);
                await openSharedDirectory(response.data.parentDirectoryId);
            } else if (currentDir === firstDir) {
                await onHomeClick();
            }
        } catch (error) {
            console.error("Error handling 'Go Up' click:", error);
        }
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

    const deleteFile = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/file/${id}`);
            await getSharedFiles();
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    const openSharedDirectory = async (id) => {
        setCurrentDir(id);
        try {
            if (firstDir.toString() === "") {
                setFirstDir(id);
            }
            const response = await axios.get(`http://localhost:8080/directory/children/${id}`);
            setSharedDirectories(response.data);
            const fileResponse = await axios.get(`http://localhost:8080/directory/files/${id}`);
            setSharedFiles(fileResponse.data);
            const name = await axios.get(`http://localhost:8080/directory/${id}`);
            setTitleName("(" + name.data.directoryName + ")");
        } catch (error) {
            console.error("Error opening shared directory:", error);
        }
    };

    const hasPermission = (fileId) => {
        return permissions.includes(fileId);
    };

    const hasPermissionDir = (directoryId) => {
        if (dirPermissions.includes(directoryId)) {
            return true;
        } else {
            // Check if any file in the directory has permission
            for (const file of sharedFiles) {
                if (file.directoryId === directoryId && hasPermission(file.fileId)) {
                    return true;
                }
            }
            return false;
        }
    };

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center p-2">
                <img
                    src={homeIcon}
                    className="small-image btn btn-outline-primary p-2"
                    alt="GoUp"
                    onClick={onHomeClick}
                />
                <img
                    src={logo}
                    className="small-image btn btn-outline-primary p-2"
                    alt="GoUp"
                    onClick={handleGoUpClick}
                />
                <h2>Shared Items {titleName}</h2>
            </div>
            <table className="table table-hover border shadow">
                <thead>
                <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Name</th>
                    <th scope="col">Size</th>
                    <th scope="col">Directory ID</th>
                    <th scope="col">Owner User ID</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {sharedDirectories.map((directory, index) => (
                    <tr key={index} className="table table-hover" onClick={() => openSharedDirectory(directory.directoryId)}>
                        <th scope="row">
                            <img className="small-image" src={folderimg} alt="" />
                        </th>
                        <td>{directory.directoryName}</td>
                        <td>-</td>
                        <td>{directory.parentDirectoryId}</td>
                        <td>{directory.ownerUserID}</td>
                        <td>
                            {hasPermissionDir(directory.directoryId) || (titleName.includes("(")&&hasPermissionDir(directory.parentDirectoryId)) ? (
                                <>

                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/editdirectory/${directory.directoryId}`}
                                    >
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger mx-2">Delete</button>
                                    <Link
                                        className="btn btn-outline-secondary"
                                        to={`/shareDir/${directory.directoryId}`}
                                    >
                                        Share
                                    </Link>
                                </>
                            ) : (
                                <p>No permission</p>
                            )}
                        </td>
                    </tr>
                ))}
                {sharedFiles.map((file, index) => (
                    <tr key={index} onClick={() => downloadFile(file.fileId, file.name)}>
                        <th scope="row">
                            <img className="small-image" src={fileimg} alt="" />
                        </th>
                        <td>{file.name}</td>
                        <td>{file.size}</td>
                        <td>{file.directoryId}</td>
                        <td>{file.ownerUserId}</td>
                        <td>
                            {hasPermission(file.fileId) || (titleName.includes("(")&&hasPermissionDir(file.directoryId))? (
                                <>
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
                                </>
                            ) : (
                                <p>No permission</p>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link className="btn btn-success" to={"/dashboard"}>
                My Directory
            </Link>
        </div>
    );
}
