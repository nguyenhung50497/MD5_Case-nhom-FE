import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";
import { storage } from "../../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { register } from "../../service/userService";
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

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };
  const handleUpload = () => {
    const promises = [];
    if (images.length > 0) {
      images.map((image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURLs) => {
                setUrls((prevState) => [...prevState, downloadURLs]);
              }
            );
          }
        );
      });
    }
    Promise.all(promises)
      .then(() => swal("All images uploaded"))
      .catch((err) => console.log(err));
  };

  const handleRegister = (values) => {
    console.log(1, values);
    let data = { ...values, avatar: urls[0] };
    dispatch(register(data)).then((value) => {
      if (value.payload === "Username already registered") {
        swal("Username already registered");
        navigate("/register");
      } else {
        navigate("/");
      }
    });
  };

  return (
    <div className="row">
      <div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
                    <h1 class="mb-3">Register</h1>
                </div>
                <div class="row g-4">
                    <div class="col-md-8">
                        <div class="wow fadeInUp" data-wow-delay="0.5s">
                            <Formik
                              initialValues={{
                                username: "",
                                password: "",
                              }}
                              validationSchema={validateSchema}
                              onSubmit={(values) => {
                                handleRegister(values);
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
                                      <label for="exampleFormControlFile1">
                                        <strong>Upload Image Here</strong>
                                      </label>
                                      <input
                                        type="file"
                                        class="form-control-file"
                                        id="exampleFormControlFile1"
                                        multiple
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div class="col-md-6">
                                      <button
                                        type="button"
                                        className="btn btn-secondary w-100 py-3"
                                        onClick={() => dispatch(handleUpload)}
                                      >
                                        Upload
                                      </button>
                                    </div>
                                    <div class="col-md-6">
                                        <Link to={"/"}><button class="btn btn-primary w-100 py-3" type="button">Login</button></Link>
                                    </div>
                                    <div class="col-md-6">
                                        <button class="btn btn-warning w-100 py-3" type="submit">Signup</button>
                                    </div>
                                </div>
                            </Form>
                            </Formik>
                        </div>
                    </div>
                    <div class="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                          <img className="position-relative rounded w-100 h-100" src={urls[0]} alt={urls[0]} />
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}
