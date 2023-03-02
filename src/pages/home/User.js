
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Team from "../../components/Team";
import Footer from "../../components/Footer";

export default function User() {
    return (
        <div className="row">
            <div className="col-12">
                <Navbar></Navbar>
                <hr/>
                <Outlet></Outlet>
                <Team></Team>
                <Footer></Footer>
            </div>
        </div>
    )
}
