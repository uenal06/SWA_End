import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ShareDir() {
    const { dirId } = useParams();
    const [sharedUsers, setSharedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const [sharedGroups, setSharedGroups] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");

    const [selectedUserPermission, setSelectedUserPermission] = useState(false);
    const [selectedGroupPermission, setSelectedGroupPermission] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        loadSharedUsers();
        loadAllUsers();
        loadSharedGroups();
        loadAllGroups();
    }, []);

    const loadSharedUsers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/sharing/users/directory/${dirId}`
            );
            setSharedUsers(response.data);
        } catch (error) {
            console.error("Error fetching shared users:", error);
        }
    };

    const loadAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users");
            setAllUsers(response.data);
        } catch (error) {
            console.error("Error fetching all users:", error);
        }
    };

    const addSharedUser = async () => {
        try {
            await axios.post(`http://localhost:8080/sharing`, {
                userId: selectedUser,
                directoryId: dirId,
                groupId: 0,
                fileId: 0,
                permission: selectedUserPermission
            });
            setSelectedUser("");
            loadSharedUsers();
        } catch (error) {
            console.error("Error adding shared user:", error);
        }
    };

    const removeSharedUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/sharing/user/${userId}/directory/${dirId}`);
            loadSharedUsers();
        } catch (error) {
            console.error("Error removing shared user:", error);
        }
    };

    const loadSharedGroups = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/sharing/groups/directory/${dirId}`
            );
            setSharedGroups(response.data);
        } catch (error) {
            console.error("Error fetching shared users:", error);
        }

    }

    const loadAllGroups = async () => {
        try {
            const response = await axios.get("http://localhost:8080/groups");
            setAllGroups(response.data);
        } catch (error) {
            console.error("Error fetching all users:", error);
        }
    }

    const removeSharedGroup = async (groupId) => {
        try {
            console.log("Deleting Group")
            await axios.delete(`http://localhost:8080/sharing/group/${groupId}/directory/${dirId}`);
            loadSharedGroups();
            loadSharedUsers();
        } catch (error) {
            console.error("Error Fetching Group:")
        }


    }
    const addSharedGroup = async (groupId) => {
        try {
            const response = await axios.get(`http://localhost:8080/getUsersInGroup/${selectedGroup}`)
            let x=response.data;
            for (const value of x) {
                await axios.post(`http://localhost:8080/sharing`, {
                    userId: value.userId,
                    directoryId: dirId,
                    groupId: selectedGroup,
                    fileId: 0,
                    permission: selectedGroupPermission
                });
                setSelectedUser("");
                loadSharedUsers();
                loadSharedGroups()

            }

        } catch (error) {
            console.error("")
        }

    }


    return (
        <div className="container">
            <h2>Manage Shared Users</h2>

            <div className="py-4">
                <h4>Shared Users</h4>
                <ul className="list-group">
                    {sharedUsers.map((user) => (
                        <li className="list-group-item d-flex justify-content-between" key={user.userId}>
                            {user.username}
                            <button className="btn btn-danger" onClick={() => removeSharedUser(user.userId)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="py-4">
                <h4>Shared Groups</h4>
                <ul className="list-group">
                    {sharedGroups.map((group) => (
                        <li className="list-group-item d-flex justify-content-between" key={group.groupId}>
                            {group.groupName}
                            <button className="btn btn-danger" onClick={() => removeSharedGroup(group.groupId)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="py-4">
                <h4>Add User</h4>
                <form onSubmit={addSharedUser}>
                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label"/>
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
                    <div className="mb-3">
                        <label htmlFor="userPermission" className="form-label"/>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="userPermission"
                                checked={selectedUserPermission}
                                onChange={(e) => setSelectedUserPermission(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="userPermission">
                                Write Permission
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!selectedUser}>
                        Add User
                    </button>
                </form>
            </div>

            <div className="py-4">
                <h4>Add Group</h4>
                <form onSubmit={addSharedGroup}>
                    <div className="mb-3">
                        <label htmlFor="groupId" className="form-label"/>
                        <select
                            className="form-select"
                            id="groupId"
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                        >
                            <option value="">Select Group</option>
                            {allGroups.map((group) => (
                                <option value={group.groupId} key={group.groupId}>
                                    {group.groupName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="groupPermission" className="form-label"/>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="groupPermission"
                                checked={selectedGroupPermission}
                                onChange={(e) => setSelectedGroupPermission(e.target.checked)}
                            />
                            <label className="form-check-label ml-2" htmlFor="groupPermission">
                                Write Permission
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={!selectedGroup}>
                        Add Group
                    </button>
                </form>
            </div>


            <div className="py-4">
                <button className="btn btn-primary" onClick={() => navigate("/directory")}>
                    Back to Directory
                </button>
            </div>
        </div>
    );
}
