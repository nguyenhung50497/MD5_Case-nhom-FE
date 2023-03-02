import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import { storage } from "../../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { addHome } from "../../service/homeService";
import { getCategories } from "../../service/categoryService";
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
});

export default function CreateHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.currentUser;
  });
  const categories = useSelector((state) => {
    return state.categories.categories;
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
      .then(() => swal("All images uploaded"))
      .catch((err) => console.log(err));
  };

  const handleCreateHome = (values) => {
    let idUser = user.idUser;
    let data = { ...values, image: urls[0], idUser: idUser };
    console.log(1, data);
    dispatch(addHome(data)).then((value) => {
      swal("Create Success !!!");
      navigate("/home");
    });
  };
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="row">
      <div class="container-xxl py-5">
        <div class="container">
          <div
            class="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 class="mb-3">Create Home</h1>
          </div>
          <div class="row g-4">
            <div class="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
              <img
                className="position-relative rounded w-100 h-100"
                src={urls[0]}
                alt={urls[0]}
              />
            </div>
            <div class="col-md-8">
              <div class="wow fadeInUp" data-wow-delay="0.5s">
                <Formik
                  initialValues={{
                    nameHome: "",
                    address: "",
                    description: "",
                    price: "",
                    floorArea: "",
                    bedrooms: "",
                    bathrooms: "",
                    idCategory: "",
                  }}
                  validationSchema={validateSchema}
                  onSubmit={(values) => {
                    handleCreateHome(values);
                  }}
                >
                  <Form>
                    <div class="row g-3">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <Field
                            type="text"
                            class="form-control"
                            name={"nameHome"}
                            id="nameHome"
                            placeholder="Home"
                          />
                          <label for="nameHome">Home</label>
                          <alert className="text-danger">
                            <ErrorMessage name={"nameHome"}></ErrorMessage>
                          </alert>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <Field
                            type="text"
                            class="form-control"
                            name={"address"}
                            id="address"
                            placeholder="Address"
                          />
                          <label for="address">Address</label>
                          <alert className="text-danger">
                            <ErrorMessage name={"address"}></ErrorMessage>
                          </alert>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <Field
                            type="text"
                            class="form-control"
                            name={"description"}
                            id="description"
                            placeholder="Description"
                          />
                          <label for="description">Description</label>
                          <alert className="text-danger">
                            <ErrorMessage name={"description"}></ErrorMessage>
                          </alert>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <Field
                            type="number"
                            class="form-control"
                            name={"price"}
                            id="price"
                            placeholder="Price"
                          />
                          <label for="price">Price</label>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-floating">
                          <Field
                            type="number"
                            class="form-control"
                            name={"floorArea"}
                            id="floorArea"
                            placeholder="Floor Area"
                          />
                          <label for="floorArea">Floor Area</label>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-floating">
                          <Field
                            type="number"
                            class="form-control"
                            name={"bedrooms"}
                            id="bedrooms"
                            placeholder="Number of Bedrooms"
                          />
                          <label for="bedrooms">Number of Bedrooms</label>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-floating">
                          <Field
                            type="number"
                            class="form-control"
                            name={"bathrooms"}
                            id="bathrooms"
                            placeholder="Number of Bathrooms"
                          />
                          <label for="bathrooms">Number of Bathrooms</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <Field
                          as="select"
                          name={"idCategory"}
                          className="form-control"
                          id="idCategory"
                        >
                          <option selected>Category</option>
                          {categories !== undefined &&
                            categories.map((item, index) => (
                              <option value={item.idCategory}>
                                {item.nameCategory}
                              </option>
                            ))}
                        </Field>
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
                      <div class="col-12">
                        <button
                          class="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Add
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
    </div>
  );
}
