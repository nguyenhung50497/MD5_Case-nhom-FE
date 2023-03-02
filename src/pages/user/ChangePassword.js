import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import {
  changePassword,
  editProfile,
  getProfile,
} from "../../service/userService";
import { ErrorMessage, Field, Form, Formik } from "formik";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idUser } = useParams();
  const handleEdit = (values) => {
    let data = [values, idUser];
    dispatch(changePassword(data)).then((e) => {
      console.log(1, e);

      if (e.payload === "User not found") {
        swal("User not found");
      } else if (e.payload === "Old password does not match") {
        swal("Old password does not match");
      } else if (e.payload === "New password is match with old password") {
        swal("New password is match with old password");
      } else {
        swal("Change Password success");
        localStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <>
      <div class="container-xxl py-5">
        <div class="container">
          <div
            class="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 class="mb-3">Edit Profile</h1>
          </div>
          <div class="row g-4">
            <div class="col-md-8 offset-2">
              <div class="wow fadeInUp" data-wow-delay="0.5s">
                <Formik
                  initialValues={{
                    oldPassword: "",
                    newPassword: "",
                  }}
                  validationSchema={validateSchema}
                  onSubmit={(values) => {
                    handleEdit(values);
                  }}
                  enableReinitialize={true}
                >
                  <Form>
                    <div class="row g-3">
                      <div class="col-12">
                        <div class="form-floating">
                          <Field
                            type="password"
                            class="form-control"
                            name={"oldPassword"}
                            id="oldPassword"
                            placeholder="Old Password"
                          />
                          <label for="oldPassword">Old Password</label>
                          <alert className="text-danger">
                            <ErrorMessage name={"oldPassword"}></ErrorMessage>
                          </alert>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <Field
                            type="password"
                            class="form-control"
                            name={"newPassword"}
                            id="newPassword"
                            placeholder="New Password"
                          />
                          <label for="newPassword">New Password</label>
                          <alert className="text-danger">
                            <ErrorMessage name={"newPassword"}></ErrorMessage>
                          </alert>
                        </div>
                      </div>
                      <div class="col-12">
                        <button
                          class="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Save changes
                        </button>
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
  );
}
