import { ErrorMessage, Field, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/userService";
import { useEffect } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
const validateSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
    password: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    await dispatch(login(values)).then((e) => {
      if (e.payload !== "User not found" && e.payload !== "Wrong password") {
        navigate("/home");
      } else if (e.payload === "User not found") {
        swal("User not found");
        navigate("/");
      } else if (e.payload === "Wrong password") {
        swal("Wrong password");
        navigate("/");
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
                <h1 class="mb-3">Login</h1>
            </div>
            <div class="row g-4">
                <div class="col-md-8 offset-2">
                    <div class="wow fadeInUp" data-wow-delay="0.5s">
                        <Formik
                            initialValues={{
                              username: "",
                              password: "",
                            }}
                            validationSchema={validateSchema}
                            onSubmit={(values) => {
                              handleLogin(values)
                            }}
                        >
                        <Form>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <Field type="text" class="form-control" name={'username'} id="username" placeholder="Username"/>
                                        <label for="username">Username</label>
                                        <alert className="text-danger">
                                        <ErrorMessage name={"username"}></ErrorMessage>
                                        </alert>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <Field type="password" class="form-control" name={'password'} id="password" placeholder="Password"/>
                                        <label for="password">Password</label>
                                        <alert className="text-danger">
                                        <ErrorMessage name={"password"}></ErrorMessage>
                                        </alert>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-primary w-100 py-3" type="submit">Login</button>
                                </div>
                                <div class="col-md-6">
                                    <Link to={"/register"}><button class="btn btn-warning w-100 py-3" type="submit">Register</button></Link>
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
