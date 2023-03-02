import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { getHomeById, getHomes } from "../../service/homeService";
import { rentHome } from "../../service/orderDetailService";
import { useEffect } from "react";

export default function RentHome() {
    const {id} = useParams();
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const home = useSelector((state) => {
        return state.homes.home;
      });
      const loading = useSelector((state) => {
        return state.homes.loading
      });
    const handleRent = (values) => {
        let data = {...values, idHome: +id, idOrder: user.idOrder}
        dispatch(rentHome(data)).then(()=>{
            dispatch(getHomes(1)).then(()=>{
                swal('Order successfully')
                navigate('/home')
            });
        })
    }
    useEffect(() => {
        dispatch(getHomeById(id))
      }, []);
    return (
        <>
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
                            <Link to={`home-detail/${home.idHome}`} className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{home.nameHome}</Link>
                        </div>
                        <div className="p-4 pb-0">
                            <h5 className="text-primary mb-3">${home.price}</h5>
                            <div className="d-block h5 mb-2">{home.description}</div>
                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{home.address}</p>
                            {
                                home.status === "Rented" && <button className="btn btn-warning w-100 mb-3">Rented</button>
                            }
                        </div>
                        <div className="d-flex border-top">
                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>{home.floorArea} m<sup>2</sup></small>
                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>{home.bedrooms} Bed</small>
                            <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>{home.bathrooms} Bath</small>
                        </div>
                    </div>
                    </div>
                    {
                        home.status === "For rent" && home.idUser !== user.idUser &&
                        <div class="container-xxl py-5">
                            <div class="container">
                                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
                                    <h1 class="mb-3">Rent Home</h1>
                                </div>
                                <div class="row g-4">
                                    <div class="col-md-8 offset-2">
                                        <div class="wow fadeInUp" data-wow-delay="0.5s">
                                            <Formik
                                            initialValues={{
                                                checkIn: "",
                                                checkIn: "",
                                            }}
                                            onSubmit={(values) => {
                                                handleRent(values)
                                            }}
                                            >
                                            <Form>
                                                <div class="row g-3">
                                                    <div class="col-md-6">
                                                        <div class="form-floating">
                                                            <Field type="date" class="form-control" name={'checkIn'} id="nameHome"/>
                                                            <label for="checkIn">Check in</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-floating">
                                                            <Field type="date" class="form-control" name={'checkOut'} id="checkOut"/>
                                                            <label for="checkOut">Check out</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <button class="btn btn-warning w-100 py-3" type="submit">Rent</button>
                                                    </div>
                                                </div>
                                            </Form>
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </center>
                }
            </div>
        </div>
        </>
    )
}