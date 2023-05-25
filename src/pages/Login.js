import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseContent, setResponseContent] = useState("");
    let navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                username,
                password,
            });

            setResponseContent(response.data); // Store the response data (user ID)
            const x = response.data.toString();
            if (x.includes("invalid")) {
                toast.error("Login failed. Please check your credentials.");
            }

            localStorage.setItem("myStoredId", response.data);
            console.log(localStorage.getItem("myStoredId"));
            if (x.includes("admin")) {
                navigate(`/admin`);
            }
            if (x.includes("nvalid")) {
                toast.error("Login failed. Please check your credentials."); // Display toast message
            } else {
                const parDir = await axios.post(
                    `http://localhost:8080/directory/user/${localStorage.getItem(
                        "myStoredId"
                    )}/0`
                );
                localStorage.setItem("myStoredDirectoryId", parDir.data);
                navigate(`/dashboard/`);
                console.log(localStorage.getItem("myStoredDirectoryId"));
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please check your credentials."); // Display toast message
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Login</h2>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                className="form-control m-2"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                className="form-control m-2"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
