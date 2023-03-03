/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getHomes, searchHome } from "../service/homeService";

export default function Navbar() {
  const [page, setPage] = useSearchParams();
  const page1 = page.get("page") || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const totalPages = useSelector((state) => {
    if (state.homes.homes !== undefined) {
      return state.homes.homes.totalPage;
    }
  });
  const handleSearch = (value) => {
    dispatch(searchHome([page1, value]))
  }
  return (
    <>
        <div className="container-fluid nav-bar bg-transparent">
            <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                <a className="btn btn-light btn-outline-light navbar-brand d-flex align-items-center text-center" 
                  onClick={() =>{
                    dispatch(getHomes(1)).then(()=>{
                      navigate(`/home`)
                    })
                  }}
                >
                    <div className="icon p-2 me-2">
                        <img className="img-fluid" src="/img/icon-deal.png" alt="Icon" style={{width: "30px", height: "30px"}}/>
                    </div>
                    <h1 className="m-0 text-primary">Green Home</h1>
                </a>
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
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Home</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <Link className="dropdown-item" to={`create-home`}>
                                  Create Home
                                </Link>
                                <Link className="dropdown-item" to={`my-home/${user.idUser}`}>
                                  My Home
                                </Link>
                            </div>
                        </div>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{user.username}</a>
                            <div className="dropdown-menu rounded-0 m-0">
                                <Link className="dropdown-item" to={`/user/${user.idUser}`}>
                                  Profile
                                </Link>
                                <Link className="dropdown-item" to={`/user/my-order/${user.idUser}`}>
                                  My Order
                                </Link>
                                <Link className="dropdown-item" to={`/user/change-password/${user.idUser}`}>
                                  Change Password
                                </Link>
                                <a className="btn dropdown-item text-danger" 
                                  onClick={() => {
                                    localStorage.removeItem("access-token");
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
