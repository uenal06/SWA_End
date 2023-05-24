import React from "react";
import {Link} from "react-router-dom";

export default function NavbarAdmin() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Users</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link className="btn btn-outline-light" to="/adduser"> Add User </Link>
                    <Link className="btn btn-outline-light" to="/addgroup">Add Group</Link>

                </div>
            </nav>
        </div>
    )
}