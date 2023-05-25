import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RenameFile() {
    const { fileId } = useParams();
    const navigate = useNavigate();

    const [file, setFile] = useState({
        name: "",
    });

    const [fileName, setFileName] = useState("");
    const [extension, setExtension] = useState("");
    const { name } = file;
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadFile();
    }, []);

    const loadFile = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/file/${fileId}`);
            setFile(response.data);

            // Separate the file name and extension
            const fileNameWithExtension = response.data.name;
            const fileExtension = fileNameWithExtension.substring(
                fileNameWithExtension.lastIndexOf(".") + 1
            );
            const fileBaseName = fileNameWithExtension.substring(
                0,
                fileNameWithExtension.lastIndexOf(".")
            );

            setFileName(fileBaseName);
            setExtension(fileExtension);
        } catch (error) {
            console.error(error);
        }
    };

    const onFileNameChange = (event) => {
        setFileName(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!fileName) {
            setErrors({ fileName: true });
            return;
        }

        try {
            const newName = `${fileName}.${extension}`;
            await axios.put(`http://localhost:8080/file/${fileId}`, { name: newName });
            toast.success("File renamed successfully");
            navigate("/directory"); // Redirect to the directory page
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Rename File</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fileName" className="form-label">
                                File Name
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className={`form-control ${
                                        errors.fileName ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter new file name"
                                    name="fileName"
                                    value={fileName}
                                    onChange={onFileNameChange}
                                />
                                <div className="input-group-text">.</div>
                                <input
                                    type="text"
                                    className="form-control"
                                    readOnly
                                    value={extension}
                                />
                            </div>
                            {errors.fileName && (
                                <div className="invalid-feedback">File name is required.</div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-outline-primary">
                            Rename
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/directory">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
