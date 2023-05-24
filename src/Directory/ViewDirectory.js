import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewDirectory() {
    const [directory, setDirectory] = useState({
        directoryName: "",
        parentDirectoryId: "",
        ownerUserID: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadDirectory();
    }, []);

    const loadDirectory = async () => {
        const result = await axios.get(`http://localhost:8080/directory/${id}`);
        setDirectory(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Directory Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of directory id: {id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Directory Name:</b> {directory.directoryName}
                                </li>
                                <li className="list-group-item">
                                    <b>Parent Directory ID:</b> {directory.parentDirectoryId}
                                </li>
                                <li className="list-group-item">
                                    <b>OwnerUserId:</b> {directory.ownerUserID}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/dashboard"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
