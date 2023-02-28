
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import Team from "../../components/Team";

export default function Home() {
    return (
        <div className="row">
            <div className="col-12">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Team></Team>
                <Footer></Footer>
            </div>
            <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
        </div>
    )
}
