import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import { storage } from "../../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { addHome } from "../../service/homeService";
const validateSchema = Yup.object().shape({
  nameHome: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  price: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
});

export default function CreateHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
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
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };
  const handleCreateHome = (values) => {
    console.log(1, values);
    let idUser = user.idUser;
    let data = { ...values, image: urls[0], idUser };
    dispatch(addHome(data)).then((value) => {
      alert("Create Success !!!");
    });
  };

  return (
    <div className="row">
      <div className="col-8 offset-3">
        <h1 className="text-center">Add Home</h1>
        <div className="row">
          <div className="col-7">
            <Formik
              initialValues={{
                nameHome: "",
                address: "",
                description: "",
                price: "",
                idCategory: "",
              }}
              validationSchema={validateSchema}
              onSubmit={(values) => {
                handleCreateHome(values);
              }}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="nameHome">Name Home</label>
                  <Field
                    type="text"
                    name={"nameHome"}
                    className="form-control"
                    id="nameHome"
                  />
                  <alert className="text-danger">
                    <ErrorMessage name={"nameHome"}></ErrorMessage>
                  </alert>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field
                    type="text"
                    name={"address"}
                    className="form-control"
                    id="address"
                  />
                  <alert className="text-danger">
                    <ErrorMessage name={"address"}></ErrorMessage>
                  </alert>
                </div>
                <div className="form-group">
                  <label htmlFor="description">description</label>
                  <Field
                    type="text"
                    name={"description"}
                    className="form-control"
                    id="description"
                  />
                  <alert className="text-danger">
                    <ErrorMessage name={"description"}></ErrorMessage>
                  </alert>
                </div>
                <div className="form-group">
                  <label htmlFor="price">price</label>
                  <Field
                    type="text"
                    name={"price"}
                    className="form-control"
                    id="price"
                  />
                  <alert className="text-danger">
                    <ErrorMessage name={"price"}></ErrorMessage>
                  </alert>
                </div>
                <div className="form-group">
                  <label htmlFor="idCategory">Category</label>
                  <Field
                    type="text"
                    name={"idCategory"}
                    className="form-control"
                    id="idCategory"
                  />
                  <alert className="text-danger">
                    <ErrorMessage name={"idCategory"}></ErrorMessage>
                  </alert>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">
                    <strong>Upload Home Image Here</strong>
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                    multiple
                    onChange={handleChange}
                  />
                  <br />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => dispatch(handleUpload)}
                  >
                    Upload
                  </button>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary ml-3">
                    Add
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          <div className="col-5">
            <img className="mt-1" src={urls[0]} alt={urls[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
