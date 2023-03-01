import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import { useSelector } from "react-redux";
import CreateHome from "./pages/homes/CreateHome";
import ListHome from "./pages/homes/ListHome";
import EditHome from "./pages/homes/EditHome";
import Profile from "./pages/user/profile";
import User from "./pages/home/User";
import ChangePassword from "./pages/user/ChangePassword";
import RentHome from "./pages/homes/RentHome";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path={""} element={<Login></Login>}></Route>
          <Route path={"register"} element={<Register></Register>}></Route>
          <Route path={"home"} element={<Home />}>
            <Route path={""} element={<ListHome/>}></Route>
            <Route path={"create-home"} element={<CreateHome/>}/>
            <Route path={"edit-home/:id"} element={<EditHome/>}/>
            <Route path={"rent-home/:id"} element={<RentHome/>}/>
          </Route>
          <Route path={"user"} element={<User/>}>
            <Route path={":idUser"} element={<Profile/>}></Route>
            <Route path={"change-password/:idUser"} element={<ChangePassword/>}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
