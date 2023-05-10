import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Directory() {
    const [directories, setDirectories] = useState([]);

    const { userId, directoryId } = useParams();

    useEffect(() => {
        loadDirectories();
    }, [userId, directoryId]);

    const loadDirectories = async () => {
        const result = await axios.get(`http://localhost:8080/directory/user/1/1`);
        setDirectories(result.data);
    };

    const deleteDirectory = async (id) => {
        await axios.delete(`http://localhost:8080/directory/${id}`);
        loadDirectories();
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">S.N</th>
                        <th scope="col">Directory Name</th>
                        <th scope="col">Parent Directory ID</th>
                        <th scope="col">Owner User ID</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {directories.map((directory, index) => (
                        <tr>
                            <th scope="row" key={index}>
                                {index + 1}
                            </th>
                            <td>{directory.directoryName}</td>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
}
