import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../upload/firebaseConfig";
import {useNavigate, useParams} from "react-router-dom";
import {editProfile, getProfile} from "../../service/userService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
const validateSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
});

export default function Profile(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => {
        return state.user.profile
    })
    const [avatar, setAvatar] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setAvatar((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];
        if (avatar.length > 0) {
            avatar.map((image) => {
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
                                setUrls("");
                                setUrls(downloadURLs);
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
    const { idUser } = useParams();
    useEffect(() => {
        dispatch(getProfile(idUser)).then((e) => {
            setUrls(e.payload.avatar)
        });
    }, [])
    const handleEdit = (values) => {
        let data = [{ ...values, avatar: urls }, idUser];
        dispatch(editProfile(data)).then((value) => {
            swal("Edit Success !!!");
            navigate("/home");
        });
    };
    return(
        <>
        <div class="container-xxl py-5">
            <div class="container">
                <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
                    <h1 class="mb-3">Edit Profile</h1>
                </div>
                <div class="row g-4">
                    <div class="col-md-8">
                        <div class="wow fadeInUp" data-wow-delay="0.5s">
                            <Formik
                              initialValues={{
                                username: user.username,
                                avatar: user.avatar,
                            }}
                            validationSchema={validateSchema}
                            onSubmit={(values) => {
                                handleEdit(values).then(
                                    navigate("home"));
                            }}
                            enableReinitialize={true}
                            >
                            <Form>
                                <div class="row g-3">
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <Field type="text" class="form-control" name={'username'} id="username" placeholder="Home"/>
                                            <label for="username">Username</label>
                                            <alert className="text-danger">
                                              <ErrorMessage name={"username"}></ErrorMessage>
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
                                    <div class="col-12">
                                        <button class="btn btn-primary w-100 py-3" type="submit">Save changes</button>
                                    </div>
                                </div>
                            </Form>
                            </Formik>
                        </div>
                    </div>
                    <div class="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                          <img className="position-relative rounded w-100 h-100" src={urls} alt={urls} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}