import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isAdmin }) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        {localStorage.getItem("myStoredId")}
                    </a>
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

                    {isAdmin ? (
                        <div>
                            <Link className="btn btn-outline-light" to="/adduser">
                                Add User
                            </Link>
                            <Link className="btn btn-outline-light" to="/addgroup">
                                Add Group
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link className="btn btn-outline-light" to="/adddirectory">
                                Add Directory
                            </Link>
                            <Link className="btn btn-outline-light" to="/addfile">
                                Add File
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
