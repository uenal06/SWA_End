import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RenameDirectory() {
    const { directoryId } = useParams();
    const navigate = useNavigate();

    const [directory, setDirectory] = useState({
        directoryName: "",
    });

    const { directoryName } = directory;
    const [errors, setErrors] = useState({});

    const onInputChange = (event) => {
        setDirectory({ ...directory, directoryName: event.target.value });
    };

    useEffect(() => {
        loadDirectory();
    }, []);

    const loadDirectory = async () => {
        try {
            console.log("DirectoryId:" + directory.directoryId + "Id: " + directoryId)
            const response = await axios.get(`http://localhost:8080/directory/${directoryId}`);
            setDirectory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!directoryName) {
            setErrors({ directoryName: true });
            return;
        }

        try {
            await axios.put(`http://localhost:8080/directory/${directoryId}`, directory);
            toast.success("Directory renamed successfully");
            navigate("/dashboard"); // Redirect to the dashboard page
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Rename Directory</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="directoryName" className="form-label">
                                Directory Name
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.directoryName ? "is-invalid" : ""
                                }`}
                                placeholder="Enter new directory name"
                                name="directoryName"
                                value={directoryName}
                                onChange={onInputChange}
                            />
                            {errors.directoryName && (
                                <div className="invalid-feedback">
                                    Directory name is required.
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-outline-primary">
                            Rename
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/dashboard">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
