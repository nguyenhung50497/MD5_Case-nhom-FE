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
import HomeDetail from "./pages/homes/HomeDetail";
import MyOrder from "./pages/user/myOrder";
import EditOrder from "./pages/user/editOrder";
import MyHome from "./pages/homes/MyHome";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <>
      <div className="container-fluid">
        <Routes>
              <Route path={""} element={<Login></Login>}></Route>
              <Route path={"register"} element={<Register></Register>}></Route>
          {
            user !== "User not found" || user !== "Wrong password" ? 
            <>
              <Route path={"home"} element={<Home />}>
                <Route path={""} element={<ListHome/>}></Route>
                <Route path={"create-home"} element={<CreateHome/>}/>
                <Route path={"edit-home/:id"} element={<EditHome/>}/>
                <Route path={"rent-home/:id"} element={<RentHome/>}/>
                <Route path={"home-detail/:id"} element={<HomeDetail/>}/>
                <Route path={"my-home/:id"} element={<MyHome/>}/>
              </Route>
              <Route path={"user"} element={<User/>}>
                <Route path={":idUser"} element={<Profile/>}></Route>
                <Route path={"change-password/:idUser"} element={<ChangePassword/>}></Route>
                <Route path={"my-order/:idUser"} element={<MyOrder/>}></Route>
                <Route path={"edit-order/:id"} element={<EditOrder/>}></Route>
              </Route>
            </>
            :
            <>
              <Route path={"/"} element={<Login></Login>}></Route>
            </>
          }
        </Routes>
      </div>
    </>
  );
}

export default App;
