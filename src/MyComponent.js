import React, { useState, useEffect } from "react";

export default function MyComponent() {
    const [myVariable, setMyVariable] = useState(() => {
        // Retrieve the value from localStorage during component initialization
        const storedId = localStorage.getItem("myStoredId");
        return storedId !== null ? storedId : "x";

        const storedDirectoryId = localStorage.getItem("myStoredDirectoryId");
        return storedDirectoryId !== null ? storedId:"x";
    });

    // Update localStorage whenever myVariable changes
    useEffect(() => {
        localStorage.setItem("myStoredId", myVariable);
    }, [myVariable]);

    // Handle changes to myVariable
    const handleChange = (event) => {
        setMyVariable(event.target.value);
    };

    return (
        <div>
            <input type="text" value={myVariable} onChange={handleChange} />
            <p>Value: {myVariable}</p>
        </div>
    );
}
