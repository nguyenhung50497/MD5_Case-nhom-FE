import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import * as Yup from "yup";

import { getHomes } from "../../service/homeService";
import { rentHome } from "../../service/orderDetailService";
const validateSchema = Yup.object().shape({
  checkIn: Yup.string()
    .required("Required"),
  checkOut: Yup.string()
    .required("Required"),
});

export default function RentHome() {
    const {id} = useParams();
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRent = (values) => {
        let data = {...values, idHome: +id, idOrder: user.idOrder}
        dispatch(rentHome(data)).then(()=>{
            dispatch(getHomes(1)).then(()=>{
                swal('Order successfully')
                navigate('/home')
            });
        })
    }
    return (
        <>
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
                              validationSchema={validateSchema}
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
        </>
    )
}