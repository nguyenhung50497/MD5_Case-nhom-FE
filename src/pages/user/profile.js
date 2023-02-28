import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../upload/firebaseConfig";
import {useNavigate, useParams} from "react-router-dom";
import {editProfile, getProfile} from "../../service/userService";
import {editHome} from "../../service/homeService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
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
            .then(() => alert("All images uploaded"))
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
            alert("Edit Success !!!");
            navigate("/home");
        });
    };
    return(
        <>
            <div className="row">
                <h1 className="text-center">Edit Profile</h1>
                <div className="col-9 offset-2">
                    <div className="row">
                        <div className="col-7">
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
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field
                                            type="text"
                                            name={"username"}
                                            className="form-control"
                                            id="username"
                                        />
                                        <alert className="text-danger">
                                            <ErrorMessage name={"username"}></ErrorMessage>
                                        </alert>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlFile1">
                                            <strong>Upload Avatar Here</strong>
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control-file"
                                            id="exampleFormControlFile1"
                                            multiple
                                            onChange={handleChange}
                                        />
                                        <br/>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                dispatch(handleUpload)}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary ml-3">
                                            Edit
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className="col-5">
                            <img className="mt-1" src={urls} alt={urls}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}