import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
    });



    const {username, password} = user;
    const [errors, setErrors] = useState({});

    const onInputChange = ({target}) => {
        setUser({...user, [target.name]: target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrors({username: !username, password: !password});
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user", user);

            // Create a directory with parentId=0, ownerId=userId, and name="root"
            const directory = {
                directoryName: "root",
                parentDirectoryId: 0,
                ownerUserID: response.data.userId, // Assuming the response contains the created user's ID
            };
            await axios.post("http://localhost:8080/directory", directory);

            navigate("/admin");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />
                            {errors.username && (
                                <div className="invalid-feedback">Username is required.</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">Password is required.</div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/admin">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
