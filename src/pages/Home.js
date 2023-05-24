import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showUsers, setShowUsers] = useState(true);

    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        loadUsers();
        loadGroups();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users");
        const sortedUsers = result.data.sort((a, b) => a.username.localeCompare(b.username));
        setUsers(sortedUsers);
    };

    const loadGroups = async () => {
        const result = await axios.get("http://localhost:8080/groups");
        const sortedGroups = result.data.sort((a, b) => a.groupName.localeCompare(b.groupName));
        setGroups(sortedGroups);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
    };

    const manageGroup = (groupId) => {
        navigate(`/group/${groupId}`);
    };

    const toggleView = () => {
        setShowUsers(!showUsers);
    };

    return (
        <div className="container">
            <div className="py-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>{showUsers ? "Users" : "Groups"}</h2>
                    <button className="btn btn-primary" onClick={toggleView}>
                        {showUsers ? "Show Groups" : "Show Users"}
                    </button>
                </div>
                {showUsers ? (
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.userId}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2" to={`/viewuser/${user.userId}`}>
                                        View
                                    </Link>
                                    <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.userId}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.userId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Group Name</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groups.map((group, index) => (
                            <tr key={group.groupId}>
                                <th scope="row">{index + 1}</th>
                                <td>{group.groupName}</td>
                                <td>
                                    <button className="btn btn-primary mx-2" onClick={() => manageGroup(group.groupId)}>
                                        Manage Group
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
