import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { deleteHome, getHomeForRent, getHomeRented, getHomes, searchHome } from "../../service/homeService";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function ListHome() {
  const [page, setPage] = useSearchParams();
  const page1 = page.get("page") || 1;
  const [check, setCheck] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const homes = useSelector((state) => {
    return state.homes.homes.homes;
  });
  const address = useSelector((state) => state.homes.address);
  const loading = useSelector(state => state.homes.loading)
  const user = useSelector(state => state.user.currentUser);
  let search = useSelector((state) => {
    return state.homes.searchHome.homes;
  });
  const totalPages = useSelector((state) => {
    if (state.homes.homes !== undefined) {
      return state.homes.homes.totalPage;
    }
  });
  useEffect(() => {
    dispatch(getHomes(1))
  }, []);
  return (
    <>
    {
      loading === true ?
      <>
        <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
      </>
      :
        <>
          <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-0 gx-5 align-items-end">
                    <div className="col-lg-6">
                        <div className="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                            <h1 className="mb-3">Home</h1>
                            <p>Rent a house</p>
                        </div>
                    </div>
                    <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                        <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                            <li className="nav-item me-2">
                                <button className="btn btn-outline-danger" data-bs-toggle="pill"
                                  onClick={() => {
                                    dispatch(getHomes(1))
                                  }}
                                >Total</button>
                            </li>
                            <li className="nav-item me-2">
                                <button className="btn btn-outline-primary" data-bs-toggle="pill"
                                  onClick={() => {
                                    dispatch(getHomeForRent(1))
                                  }}
                                >For rent</button>
                            </li>
                            <li className="nav-item me-0">
                                <button className="btn btn-outline-warning" data-bs-toggle="pill"
                                  onClick={() => {
                                    dispatch(getHomeRented(1))
                                  }}
                                >Rented</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tab-content">
                    <div id="tab-1" className="tab-pane fade show p-0 active">
                        <div className="row g-4">
                        {
                            search ? 
                            <>
                              { search !== undefined &&
                              search.map((item, key) => (
                                <>
                                  <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <Link to={`home-detail/${item.idHome}`}><img className="img-fluid" src={item.image} style={{height: "400px", width: "100%"}} alt=""/></Link>
                                            { user.idUser === item.idUser &&
                                              <>
                                                <button className="btn-danger rounded text-white position-absolute start-0 top-0 m-1 py-1 px-2"
                                                  onClick={() => {
                                                    swal({
                                                      title: "Are you sure?",
                                                      text: "Once deleted, you will not be able to recover this imaginary file!",
                                                      icon: "warning",
                                                      buttons: true,
                                                      dangerMode: true,
                                                    })
                                                    .then((willDelete) => {
                                                      if (willDelete) {
                                                        dispatch(deleteHome(item.idHome)).then(()=>{
                                                          dispatch(getHomes(1)).then(()=>{
                                                            navigate('/home')
                                                          })
                                                        })
                                                        swal("Poof! Your imaginary file has been deleted!", {
                                                          icon: "success",
                                                        });
                                                      } else {
                                                        swal("Your imaginary file is safe!");
                                                      }
                                                    });
                                                  }}
                                                >
                                                  Delete
                                                </button>
                                                <Link to={`edit-home/${item.idHome}`}>
                                                  <button className="btn-primary rounded text-white position-absolute start-0 top-0 m-1 mt-5 py-1 px-3">
                                                    Edit
                                                  </button>
                                                </Link>
                                              </>
                                            }
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{item.username}</div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">${item.price}</h5>
                                            <Link to={`home-detail/${item.idHome}`} className="d-block h5 mb-2" style={{textDecoration: 'none'}}>{item.nameHome}</Link>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{item.address}</p>
                                            { item.idUser !== user.idUser && item.status === "For rent" &&
                                                <Link to={`rent-home/${item.idHome}`}><button className="btn btn-warning w-100 mb-3">Rent Home</button></Link>
                                            }
                                            { item.idUser !== user.idUser && item.status === "Rented" &&
                                                <button className="btn btn-warning w-100 mb-3" disabled>Rented</button>
                                            }
                                            { item.idUser === user.idUser &&
                                                <button className="btn btn-warning w-100 mb-3" disabled>Own</button>
                                            }
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>{item.floorArea} m<sup>2</sup></small>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>{item.bedrooms} Bed</small>
                                            <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>{item.bathrooms} Bath</small>
                                        </div>
                                    </div>
                                  </div>
                                </>
                              ))}
                            <div className="col-12 mt-3">
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
                                            dispatch(searchHome([page1 - 1, address]));
                                            navigate("/home?page=" + (page1 - 1));
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
                                            dispatch(searchHome([Number(page1) + 1, address]));
                                            navigate("/home?page=" + (Number(page1) + 1));
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
                            </>
                            :
                            <>
                            { homes !== undefined &&
                              homes.map((item, key) => (
                                <>
                                  <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <Link to={`home-detail/${item.idHome}`}><img className="img-fluid" src={item.image} style={{height: "400px", width: "100%"}} alt=""/></Link>
                                            { user.idUser === item.idUser &&
                                              <>
                                                <button className="btn-danger rounded text-white position-absolute start-0 top-0 m-1 py-1 px-2"
                                                  onClick={() => {
                                                    swal({
                                                      title: "Are you sure?",
                                                      text: "Once deleted, you will not be able to recover this imaginary file!",
                                                      icon: "warning",
                                                      buttons: true,
                                                      dangerMode: true,
                                                    })
                                                    .then((willDelete) => {
                                                      if (willDelete) {
                                                        dispatch(deleteHome(item.idHome)).then(()=>{
                                                          dispatch(getHomes(1)).then(()=>{
                                                            navigate('/home')
                                                          })
                                                        })
                                                        swal("Poof! Your imaginary file has been deleted!", {
                                                          icon: "success",
                                                        });
                                                      } else {
                                                        swal("Your imaginary file is safe!");
                                                      }
                                                    });
                                                  }}
                                                >
                                                  Delete
                                                </button>
                                                <Link to={`edit-home/${item.idHome}`}>
                                                  <button className="btn-primary rounded text-white position-absolute start-0 top-0 m-1 mt-5 py-1 px-3">
                                                    Edit
                                                  </button>
                                                </Link>
                                              </>
                                            }
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{item.username}</div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">${item.price}</h5>
                                            <Link to={`home-detail/${item.idHome}`} className="d-block h5 mb-2" style={{textDecoration: 'none'}}>{item.nameHome}</Link>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{item.address}</p>
                                            { item.idUser !== user.idUser && item.status === "For rent" &&
                                                <Link to={`rent-home/${item.idHome}`}><button className="btn btn-warning w-100 mb-3">Rent Home</button></Link>
                                            }
                                            { item.idUser !== user.idUser && item.status === "Rented" &&
                                                <button className="btn btn-warning w-100 mb-3" disabled>Rented</button>
                                            }
                                            { item.idUser === user.idUser &&
                                                <button className="btn btn-warning w-100 mb-3" disabled>Own</button>
                                            }
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>{item.floorArea} m<sup>2</sup></small>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>{item.bedrooms} Bed</small>
                                            <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>{item.bathrooms} Bath</small>
                                        </div>
                                    </div>
                                  </div>
                                </>
                              ))}
                            <div className="col-12 mt-3">
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
                                            navigate("/home?page=" + (page1 - 1));
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
                                            navigate("/home?page=" + (Number(page1) + 1));
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
                            </>
                        }
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </>
    }
    </>
  )
}