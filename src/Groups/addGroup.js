import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddGroup() {
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState("");

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!groupName) {
            setError("Group name is required.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/group", {
                groupName,
            });
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Create Group</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="groupName" className="form-label">
                                Group Name
                            </label>
                            <input
                                type="text"
                                className={`form-control ${error ? "is-invalid" : ""}`}
                                placeholder="Enter the group name"
                                name="groupName"
                                value={groupName}
                                onChange={handleGroupNameChange}
                            />
                            {error && <div className="invalid-feedback">{error}</div>}
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
