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
import ViewDirectory from "./Directory/ViewDirectory";
import AddDirectory from "./Directory/addDirectory";
import NavbarAdmin from "./layout/NavbarAdmin";
import AddGroup from "./Groups/addGroup";
import ManageGroup from "./Groups/ManageGroup";
import RenameFile from "./File/editFile";
import RenameDirectory from "./Directory/EditDirectory";
import ShareDir from "./Share/ShareDir";
import ShareFile from "./File/shareFile";



function App() {


    return (
        <div className="App">
            <Router>
                <Navbar/>

                <Routes>
                    <Route exact path="/" element={<Directory/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/admin" element={<Home/>}/>
                    <Route exact path="/adduser" element={<AddUser/>}/>
                    <Route exact path="/edituser/:id" element={<EditUser/>}/>
                    <Route exact path="/viewuser/:id" element={<ViewUser/>}/>
                    <Route exact path="/dashboard/" element={<Directory/>}/>
                    <Route exact path="/viewdirectory/:id" element={<ViewDirectory/>}/>
                    <Route exact path="/adddirectory" element={<AddDirectory/>}/>
                    <Route exact path="/editdirectory/:directoryId" element={<RenameDirectory/>}/>
                    <Route exact path="/addgroup" element={<AddGroup/>}/>
                    <Route exact path="/group/:groupId" element={<ManageGroup/>}/>
                    <Route exact path="editfile/:fileId" element={<RenameFile/>}/>
                    <Route exact path="shareDir/:dirId" element={<ShareDir/>}/>
                    <Route exact path="shareFile/:fileId" element={<ShareFile/>}/>

                </Routes>
            </Router>
        </div>
    );
}

export default App;