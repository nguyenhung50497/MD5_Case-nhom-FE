import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { deleteHome, getHomes } from "../../service/homeService";
import { getHomeById } from "../../service/homeService";
import { Link } from "react-router-dom";

export default function HomeDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const { id } = useParams();
  const home = useSelector((state) => {
    return state.homes.home;
  });
  const loading = useSelector((state) => {
    return state.homes.loading
  });
  useEffect(() => {
    dispatch(getHomeById(id))
  }, []);
  return (
    <div className="row">
      <div class="container-xxl py-5">
        {
          loading === false ?
          <>
            <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
          </>
          :
          <center>
            <div className="col-lg-8 col-md-8 wow fadeInUp" data-wow-delay="0.1s">
              <div className="property-item rounded overflow-hidden">
                  <div className="position-relative overflow-hidden">
                      <Link to={`home-detail/${home.idHome}`}><img className="img-fluid" src={home.image} style={{height: "400px", width: "100%"}} alt=""/></Link>
                      { user.idUser === home.idUser &&
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
                                  dispatch(deleteHome(home.idHome)).then(()=>{
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
                          <Link to={`edit-home/${home.idHome}`}>
                              <button className="btn-primary rounded text-white position-absolute start-0 top-0 m-1 mt-5 py-1 px-3">
                              Edit
                              </button>
                          </Link>
                          </>
                      }
                      <Link to={`home-detail/${home.idHome}`} className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{home.nameHome}</Link>
                  </div>
                  <div className="p-4 pb-0">
                      <h5 className="text-primary mb-3">${home.price}</h5>
                      <div className="d-block h5 mb-2">{home.description}</div>
                      <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{home.address}</p>
                      {
                          home.status === "For rent" ? <Link to={`rent-home/${home.idHome}`}><button className="btn btn-warning w-100 mb-3">Rent Home</button></Link>
                          :
                          <button className="btn btn-warning w-100 mb-3">Rented</button>
                      }
                  </div>
                  <div className="d-flex border-top">
                      <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>{home.floorArea} m<sup>2</sup></small>
                      <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>{home.bedrooms} Bed</small>
                      <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>{home.bathrooms} Bath</small>
                  </div>
              </div>
            </div>
          </center>
        }
      </div>
    </div>
  );
}