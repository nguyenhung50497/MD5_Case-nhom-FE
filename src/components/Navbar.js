/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchHome } from "../service/homeService";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const handleSearch = (value) => {
    dispatch(searchHome(value))
  }
  return (
    <>
        <div className="container-fluid nav-bar bg-transparent">
            <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                <Link to="/home" className="navbar-brand d-flex align-items-center text-center">
                    <div className="icon p-2 me-2">
                        <img className="img-fluid" src="/img/icon-deal.png" alt="Icon" style={{width: "30px", height: "30px"}}/>
                    </div>
                    <h1 className="m-0 text-primary">Green Home</h1>
                </Link>
                <input
                  className="form-control"
                  type="search"
                  name={'search'}
                  placeholder="Search"
                  aria-label="Search"
                  style={{maxWidth: "250px"}}
                  onKeyUp={(e) => {
                    handleSearch(e.target.value)
                  }}
                />
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto">
                        <Link to="/home" className="nav-item nav-link active">Home</Link>
                        <Link to="create-home" className="nav-item nav-link">Create Home</Link>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Property</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <a href="property-list.html" className="dropdown-item">Property List</a>
                                <a href="property-type.html" className="dropdown-item">Property Type</a>
                                <a href="property-agent.html" className="dropdown-item">Property Agent</a>
                            </div>
                        </div>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.username}</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <Link className="dropdown-item" to={`/user/${user.idUser}`}>
                                  Profile
                                </Link>
                                <Link className="dropdown-item" to={`/user/change-password/${user.idUser}`}>
                                  Change Password
                                </Link>
                                <a className="btn dropdown-item text-danger" 
                                  onClick={() => {
                                    localStorage.removeItem("accessToken");
                                    localStorage.clear();
                                    navigate("/");
                                  }}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
                    <img
                      className="ml-3"
                      src={user.avatar}
                      alt={user.avatar}
                      style={{ width: "50px", height: "50px", borderRadius: "25%" }}
                    />
            </nav>
        </div>
    </>
  );
}
