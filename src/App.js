import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import { useSelector } from "react-redux";
import CreateHome from "./pages/home/CreateHome";
import ListHome from "./pages/home/ListHome";
import EditHome from "./pages/home/EditHome";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <div className="container-fluid">
        <Routes>
          <Route path={""} element={<Login></Login>}></Route>
          <Route path={"register"} element={<Register></Register>}></Route>
          <Route path={"home"} element={<Home />}>
            <Route path={""} element={<ListHome></ListHome>}></Route>
            <Route path={"create-home"} element={<CreateHome></CreateHome>} />
            <Route path={"edit-home/:id"} element={<EditHome />}></Route>
            <Route path={"delete-home/:id"}></Route>
          </Route>

          {/* {
                        user !== "User not found" && user !== "Wrong password" ? 
                        <Route path={'home'} element={<Home/>}>
                            <Route path={'albums'} element={<ListHome/>}></Route>
                            <Route path={'create-album'} element={<CreateHome/>}></Route>
                            <Route path={'edit-album/:id'} element={<EditHome/>}></Route>
                        </Route> :
                        <Route path={'*'} element={<Login></Login>}></Route>
                    } */}
        </Routes>
      </div>
    </>
  );
}

export default App;
