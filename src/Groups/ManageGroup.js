import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ManageGroup() {
    const { groupId } = useParams();
    const [groupName, setGroupName] = useState("");
    const [groupUsers, setGroupUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        loadGroup();
        loadUsers();
    }, []);

    const loadGroup = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/group/${groupId}`);
            setGroupName(response.data.groupName);
        } catch (error) {
            console.error(error);
        }
    };

    const loadUsers = async () => {
        try {
            const groupUsersResponse = await axios.get(`http://localhost:8080/getUsersInGroup/${groupId}`);
            const allUsersResponse = await axios.get("http://localhost:8080/users");

            setGroupUsers(groupUsersResponse.data);
            setAllUsers(allUsersResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateGroupName = async () => {
        try {
            await axios.put(`http://localhost:8080/group/${groupId}`, { groupName });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUserFromGroup = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/usergroup/${userId}/${groupId}`);
            loadUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const addUserToGroup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/usergroup`, { userId: selectedUser, groupId });
            setSelectedUser("");
            loadUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteGroup = async () => {
        try {
            await axios.delete(`http://localhost:8080/group/${groupId}`);
            navigate("/admin");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="py-4">
                <h2>Manage Group</h2>
                <div className="mb-3">
                    <label htmlFor="groupName" className="form-label">
                        Group Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={updateGroupName}>
                    Update Group Name
                </button>
            </div>

            <div className="py-4">
                <h2>Group Users</h2>
                <ul className="list-group">
                    {groupUsers.map((user) => (
                        <li className="list-group-item d-flex justify-content-between" key={user.userId}>
                            {user.username}
                            <button className="btn btn-danger" onClick={() => deleteUserFromGroup(user.userId)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="py-4">
                <h4>Add User to Group</h4>
                <form onSubmit={addUserToGroup}>
                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label">
                            User ID:
                        </label>
                        <select
                            className="form-select"
                            id="userId"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select User</option>
                            {allUsers.map((user) => (
                                <option value={user.userId} key={user.userId}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!selectedUser}>
                        Add to Group
                    </button>
                </form>
            </div>

            <div className="py-4">
                <button className="btn btn-danger" onClick={deleteGroup}>
                    Delete Group
                </button>
            </div>

            <button className="btn btn-primary my-2" onClick={() => navigate("/admin")}>
                Back to Home
            </button>
        </div>
    );
}
