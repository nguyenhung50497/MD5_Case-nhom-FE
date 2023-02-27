import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import { useSelector } from "react-redux";
import ListHome from './pages/albums/ListHome';
import CreateHome from './pages/albums/CreateHome';
import EditHome from './pages/albums/EditHome';


function App() {
    const user = useSelector( state => state.user.currentUser);
    return (
        <>
            <div className="container-fluid">
                <Routes>
                    <Route path={'/'} element={<Login></Login>}></Route>
                    <Route path={'/register'} element={<Register></Register>}></Route>
                    {
                        user !== "User not found" && user !== "Wrong password" ? 
                        <Route path={'home'} element={<Home/>}>
                            <Route path={'albums'} element={<ListHome/>}></Route>
                            <Route path={'create-album'} element={<CreateHome/>}></Route>
                            <Route path={'edit-album/:id'} element={<EditHome/>}></Route>
                        </Route> :
                        <Route path={'*'} element={<Login></Login>}></Route>
                    }
                    <Route path={'/admin'} element={<Admin/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
