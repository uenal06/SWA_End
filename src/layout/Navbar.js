import React from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Navbar({isAdmin}) {
    let navigate = useNavigate();
    let vsbl = "hidden";
    if (localStorage.getItem("myStoredId").includes("admin")) {
        vsbl = "visible";

    }

    const logout = () => {
        localStorage.setItem("myStoredId", "");
        localStorage.setItem("myStoredDirectoryId", "");
        navigate(`/login/`);


    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard/">
                        {localStorage.getItem("myStoredId")}
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <Link className="btn btn-outline-light mx-2" id="hiddenButton" to="/admin"
                                style={{visibility: `${vsbl}`}}> Manage User/Groups</Link>



                                    <button className="btn btn-outline-light" onClick={logout}>
                                    Logout
                                    </button>
                                    </div>

                                    </div>
                                    </nav>
                                    </div>
                                    );
                                }
