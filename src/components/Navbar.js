/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link, useNavigate} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {storage} from "../upload/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const validateSchema = Yup.object().shape({
    nameAlbum: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Required"),
})

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector( state => state.user.currentUser);
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
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(prevState => [...prevState, downloadURLs])
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => alert("All images uploaded"))
            .catch((err) => console.log(err));
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link class="navbar-brand" to="/home/albums">Home</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Add
                            </a>
                            <div class="dropdown-menu">
                                <Link class="dropdown-item" to="/home/create-album">Album</Link>
                                <Link class="dropdown-item" to="/home/create-song">Song</Link>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item btn" data-toggle="modal" data-target="#addAlbumModal">Album with Modal</a>
                            </div>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/home/albums">Albums <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/home/songs">Songs <span class="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    <ul class="navbar-nav mr-auto">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{width: '500px'}} />
                    </ul>
                    <div class="btn-group">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            {user.username}
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item btn text-danger" onClick={() => {
                                localStorage.clear();
                                navigate('/')
                            }}>Logout</a>
                        </div>
                    </div>
                    <img className="ml-3" src={user.avatar} alt={user.avatar} style={{width: "50px", height: '50px', borderRadius: '25%'}} />
                </div>
            </nav>
        </>
    )
}