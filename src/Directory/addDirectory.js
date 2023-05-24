import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getValue} from "@testing-library/user-event/dist/utils";

export default function AddDirectory() {
    let navigate = useNavigate();

    const [directory, setDirectory] = useState({
        directoryName: "",
        parentDirectoryId: "",
        ownerUserID: localStorage.getItem("myStoredId")
    });

    const { directoryName, parentDirectoryId, ownerUserID } = directory;

    const onInputChange = (e) => {
        setDirectory({ ...directory, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/directory", directory);
            console.log(directory)
            navigate(`/dashboard`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Directory</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="DirectoryName" className="form-label">
                                Directory Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter directory name"
                                name="directoryName"
                                value={directoryName}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ParentDirectoryId" className="form-label">
                                Parent Directory ID
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter parent directory ID"
                                name="parentDirectoryId"
                                value={parentDirectoryId}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
