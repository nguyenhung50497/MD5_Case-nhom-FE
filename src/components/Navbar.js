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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/home">
          Home
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="create-home">
                Add Home <span class="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav mr-auto">
              <input
                  className="form-control mr-sm-2"
                  type="search"
                  name={'search'}
                  placeholder="Search"
                  aria-label="Search"
                  style={{width: "500px"}}
                  onKeyUp={(e) => {
                    handleSearch(e.target.value)
                  }}
              />
          </ul>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              {user.username}
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <Link class="dropdown-item" to={`/user/${user.idUser}`}>
                Profile
              </Link>
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item btn text-danger"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </a>
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
    </>
  );
}
