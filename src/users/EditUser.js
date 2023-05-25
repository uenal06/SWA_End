import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";

export default function EditUser() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const { username, password } = user;
    const [errors, setErrors] = useState({});

    const onInputChange = ({ target }) => {
        setUser({ ...user, [target.name]: target.value });
    };

    useEffect(() => {
        const myStoredId = localStorage.getItem("myStoredId");
        if (!myStoredId.includes("admin")) {
            toast.error("You dont have the rights")
            navigate("/dashboard"); // Navigate to "/login/" route
        }

        loadUser();
    }, [id, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrors({ username: !username, password: !password });
            return;
        }

        try {
            await axios.put(`http://localhost:8080/user/${id}`, user);
            navigate("/admin");
        } catch (error) {
            console.error(error);
        }
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit User</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                placeholder="Enter your name"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />
                            {errors.username && <div className="invalid-feedback">Username is required.</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                placeholder="Enter your username"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                            />
                            {errors.password && <div className="invalid-feedback">Password is required.</div>}
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
