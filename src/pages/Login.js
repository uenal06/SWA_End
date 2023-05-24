import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


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

            setResponseContent(response.data);// Store the response data (user ID)
            localStorage.setItem("myStoredId", response.data);
            console.log(localStorage.getItem("myStoredId"));
            const x = response.data.toString();
            if (x.includes("admin")) {
                navigate(`/admin`)
            } else {
                const parDir = await axios.post(`http://localhost:8080/directory/user/${localStorage.getItem("myStoredId")}/0`)
                localStorage.setItem("myStoredDirectoryId", parDir.data);
                navigate(`/dashboard/`)
                console.log(localStorage.getItem("myStoredDirectoryId"));


            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    );
}
