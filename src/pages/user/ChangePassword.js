import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import swal from "sweetalert";
import {changePassword, editProfile, getProfile} from "../../service/userService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
const validateSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
    newPassword: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
});

export default function ChangePassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { idUser } = useParams();
    const handleEdit = (values) => {
        let data = [values, idUser];
        dispatch(changePassword(data)).then((e) => {
            console.log(1, e)
            if (e.payload === 'User not found'){
                swal('User not found')
            } else if (e.payload === 'Old password does not match') {
                swal('Old password does not match')
            }else if (e.payload === 'New password is match with old password') {
                swal('New password is match with old password')
            } else {
                swal('Change Password success')
                localStorage.clear();
                navigate("/");
            }
        });
    };

    return(
        <>
            <div className="row">
                <div className="col-8 offset-3">
                    <h1 className="text-center">Change Password</h1>
                    <div className="row">
                        <div className="col-7">
                            <Formik
                                initialValues={{
                                    oldPassword: '',
                                    newPassword: ''
                                }}
                                validationSchema={validateSchema}
                                onSubmit={(values) => {
                                    handleEdit(values)
                                }}
                                enableReinitialize={true}
                            >
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <Field
                                            type="password"
                                            name={"oldPassword"}
                                            className="form-control"
                                            id="oldPassword"
                                        />
                                        <alert className="text-danger">
                                            <ErrorMessage name={"oldPassword"}></ErrorMessage>
                                        </alert>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newPassword">New Password</label>
                                        <Field
                                            type="password"
                                            name={"newPassword"}
                                            className="form-control"
                                            id="newPassword"
                                        />
                                        <alert className="text-danger">
                                            <ErrorMessage name={"newPassword"}></ErrorMessage>
                                        </alert>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary ml-3">
                                            Edit
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}