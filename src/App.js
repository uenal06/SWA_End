import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import Login from "./pages/Login";
import Directory from "./pages/Directory";
import DirectoryTable from "./pages/Directory";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/adduser" element={<AddUser />} />
                    <Route exact path="/edituser/:id" element={<EditUser />} />
                    <Route exact path="/viewuser/:id" element={<ViewUser />} />
                    <Route exact path="/dashboard/:id/:dirId" element={<Directory />}/>


                </Routes>
            </Router>
        </div>
    );
}

export default App;