import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import Login from "./pages/Login";
import Directory from "./pages/Directory";
import DirectoryTable from "./pages/Directory";
import ViewDirectory from "./Directory/ViewDirectory";
import AddDirectory from "./Directory/addDirectory";
import NavbarAdmin from "./layout/NavbarAdmin";
import AddGroup from "./Groups/addGroup";
import ManageGroup from "./Groups/ManageGroup";
import FileUpload from "./pages/FileUpload";

if (localStorage.getItem("myStoredId").length === 0) {
    localStorage.setItem("myStoredId", "x");
}
if (localStorage.getItem("myStoredDirectoryId").length === 0) {
    localStorage.setItem("myStoredDirectoryId", "x");
}

function App() {


    return (
        <div className="App">
            <Router>
                <Navbar/>
                <NavbarAdmin></NavbarAdmin>

                <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route exact path="/admin" element={<Home/>}/>
                    <Route exact path="/adduser" element={<AddUser/>}/>
                    <Route exact path="/edituser/:id" element={<EditUser/>}/>
                    <Route exact path="/viewuser/:id" element={<ViewUser/>}/>
                    <Route exact path="/dashboard/" element={<Directory/>}/>
                    <Route exact path="/viewdirectory/:id" element={<ViewDirectory/>}/>
                    <Route exact path="/adddirectory" element={<AddDirectory/>}/>
                    <Route exact path="/addgroup" element={<AddGroup/>}/>
                    <Route exact path="/group/:groupId" element={<ManageGroup/>}/>

                </Routes>
            </Router>
        </div>
    );
}

export default App;