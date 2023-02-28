import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { deleteHome, getHomes, searchHome } from "../../service/homeService";
import { useEffect } from "react";

import swal from "sweetalert";
import { Field, Form, Formik } from "formik";

export default function ListHome() {
  const [page, setPage] = useSearchParams();
  const page1 = page.get("page") || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const homes = useSelector((state) => {
    return state.homes.homes.homes;
  });
  let search = useSelector((state) => {
    return state.homes.searchHome.homes;
  });
  const totalPages = useSelector((state) => {
    if (state.homes.homes !== undefined) {
      return state.homes.homes.totalPage;
    }
  });
  useEffect(() => {
    dispatch(getHomes(page1))
  }, []);
  const handleSearch = (value) => {
    dispatch(searchHome(value))
  }
  return (
    <>
    <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-0 gx-5 align-items-end">
                    <div class="col-lg-6">
                        <div class="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                            <h1 class="mb-3">Property Listing</h1>
                            <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit diam justo sed rebum.</p>
                        </div>
                    </div>
                    <div class="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                        <ul class="nav nav-pills d-inline-flex justify-content-end mb-5">
                            <li class="nav-item me-2">
                                <a class="btn btn-outline-primary active" data-bs-toggle="pill" href="#tab-1">Featured</a>
                            </li>
                            <li class="nav-item me-2">
                                <a class="btn btn-outline-primary" data-bs-toggle="pill" href="#tab-2">For Sell</a>
                            </li>
                            <li class="nav-item me-0">
                                <a class="btn btn-outline-primary" data-bs-toggle="pill" href="#tab-3">For Rent</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-4">
                        {
                            search ? 
                            <>
                              { search !== undefined &&
                              search.map((item, key) => (
                                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                  <div class="property-item rounded overflow-hidden">
                                      <div class="position-relative overflow-hidden">
                                          <a href=""><img class="img-fluid" src={item.image} style={{height: "400px", width: "100%"}} alt=""/></a>
                                          <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                                          <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{item.nameHome}</div>
                                      </div>
                                      <div class="p-4 pb-0">
                                          <h5 class="text-primary mb-3">${item.price}</h5>
                                          <a class="d-block h5 mb-2" href="">{item.description}</a>
                                          <p><i class="fa fa-map-marker-alt text-primary me-2"></i>{item.address}</p>
                                      </div>
                                      <div class="d-flex border-top">
                                          <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                          <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                          <small class="flex-fill text-center py-2"><i class="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                      </div>
                                  </div>
                                </div>
                              ))}
                            </>
                            :
                            <>
                            { homes !== undefined &&
                              homes.map((item, key) => (
                                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                  <div class="property-item rounded overflow-hidden">
                                      <div class="position-relative overflow-hidden">
                                          <a href=""><img class="img-fluid" src={item.image} style={{height: "400px", width: "100%"}} alt=""/></a>
                                          <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                                          <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{item.nameHome}</div>
                                      </div>
                                      <div class="p-4 pb-0">
                                          <h5 class="text-primary mb-3">${item.price}</h5>
                                          <a class="d-block h5 mb-2" href="">{item.description}</a>
                                          <p><i class="fa fa-map-marker-alt text-primary me-2"></i>{item.address}</p>
                                      </div>
                                      <div class="d-flex border-top">
                                          <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                          <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                          <small class="flex-fill text-center py-2"><i class="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                      </div>
                                  </div>
                                </div>
                              ))}
                            </>
                        }
                        </div>
                    </div>
                </div>
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
            </div>
        </div>
    </>
  )
}