import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { getHomes } from "../../service/homeService";
import { useEffect } from "react";

export default function ListHome() {
  const [page, setPage] = useSearchParams();
  const page1 = page.get("page") || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const homes = useSelector((state) => {
    console.log(state);
    // return state.homes.homes.homes;
  });
  const totalPages = useSelector((state) => {
    if (state.homes.homes !== undefined) {
      return state.homes.homes.totalPage;
    }
  });
  useEffect(() => {
    console.log(0, page1);
    dispatch(getHomes(page1));
  }, []);
  return (
    <div className="row">
      <div className="col-12">
        <table border={1}>
          <tr>
            <td>Name</td>
            <td>Address</td>
            <td>Description</td>
            <td>Price</td>
            <td>Count</td>
            <td>Category</td>
            <td>Image</td>
          </tr>
          {homes.map((item) => (
            <tr>
              <td>{item.nameHome}</td>
              <td>{item.address}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.count}</td>
              <td>{item.nameCategory}</td>
              <td>{item.image}</td>
            </tr>
          ))}
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              {page1 == 1 ? (
                <>
                  <div className="page-link">
                    <span aria-hidden="true" style={{ color: "black" }}>
                      &laquo;
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="page-link"
                    onClick={() => {
                      dispatch(getHomes(page1 - 1));
                      navigate("/home/homes?page=" + (page1 - 1));
                    }}
                  >
                    {" "}
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </>
              )}
            </li>
            <li className="page-item">
              <a className="page-link">
                {page1}/{totalPages}
              </a>
            </li>
            <li className="page-item">
              {page1 == totalPages ? (
                <>
                  <div className="page-link">
                    <span aria-hidden="true" style={{ color: "black" }}>
                      &raquo;
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="page-link"
                    onClick={() => {
                      dispatch(getHomes(Number(page1) + 1));
                      navigate("/home/homes?page=" + (Number(page1) + 1));
                    }}
                  >
                    {" "}
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
