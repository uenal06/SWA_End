import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
    const [user, setUser] = useState({

        username: "",
        password: "",
    });
    const [group, setGroup] = useState({
        groupname:"",
    })

    const { id } = useParams();

    useEffect(() => {
        loadUser();
        loadGroup()
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    };
    const loadGroup = async () => {
        const groupresult = await axios.get(`http://localhost:8080/group/groupnames/${id}`)
        console.log(groupresult)
        setGroup({groupname:groupresult.data.replace("[","").replace("]","")})


    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">User Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of user id : {user.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Username:</b>
                                    {user.username}
                                </li>
                                <li className="list-group-item">
                                    <b>Password:</b>
                                    {user.password}
                                </li>
                                <li className="list-group-item">
                                    <b>Groups:</b>
                                    {group.groupname}
                                </li>

                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/admin"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}