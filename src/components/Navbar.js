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
        <div class="container-fluid nav-bar bg-transparent">
            <nav class="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                <Link to="/home" class="navbar-brand d-flex align-items-center text-center">
                    <div class="icon p-2 me-2">
                        <img class="img-fluid" src="img/icon-deal.png" alt="Icon" style={{width: "30px", height: "30px"}}/>
                    </div>
                    <h1 class="m-0 text-primary">KTH</h1>
                </Link>
                <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <input
                  className="form-control offset-1"
                  type="search"
                  name={'search'}
                  placeholder="Search"
                  aria-label="Search"
                  style={{width: "320px"}}
                  onKeyUp={(e) => {
                    handleSearch(e.target.value)
                  }}
                />
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto">
                        <Link to="/home" class="nav-item nav-link active">Home</Link>
                        <Link to="create-home" class="nav-item nav-link">Create Home</Link>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Property</a>
                            <div class="dropdown-menu rounded-0 m-0">
                                <a href="property-list.html" class="dropdown-item">Property List</a>
                                <a href="property-type.html" class="dropdown-item">Property Type</a>
                                <a href="property-agent.html" class="dropdown-item">Property Agent</a>
                            </div>
                        </div>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.username}</a>
                            <div class="dropdown-menu rounded-0 m-0">
                                <a class="btn dropdown-item">Profile</a>
                                <a class="btn dropdown-item text-danger" 
                                  onClick={() => {
                                    localStorage.clear();
                                    navigate("/");
                                  }}>Logout</a>
                            </div>
                        </div>
                    </div>
                    <img
                      className="ml-3"
                      src={user.avatar}
                      alt={user.avatar}
                      style={{ width: "50px", height: "50px", borderRadius: "25%" }}
                    />
                </div>
            </nav>
        </div>
    </>
  );
}
