import {useEffect, useState} from "react"
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import swal from 'sweetalert';
import {useDispatch, useSelector} from "react-redux";
import {deleteHome, getHomes, searchHome} from "../../service/homeService";
import {Field, Form, Formik} from "formik";

export default function ListHome() {
    const [page, setPage] = useSearchParams();
    const page1 = page.get("page") || 1;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const homes = useSelector((state) => {
        return state.homes.homes.homes;
    });
    const search = useSelector((state) => {
        return state.homes.search.homes;
    });
    const loading = useSelector(state => {
        return state.homes.loading
    })
    const user = useSelector(state => state.user.currentUser)
    const totalPages = useSelector((state) => {
        if (state.homes.homes !== undefined) {
            return state.homes.homes.totalPage;
        }


    });
    useEffect(() => {
        dispatch(getHomes(page1));
    }, []);
    const handleSearch = (values) => {
        dispatch(searchHome(values.search))
    }
    return (
        <div className="row">
            <div>
            <Formik
                initialValues={{
                    search: ''
                }}
                onSubmit={(values) => {
                    handleSearch(values)
                }}
            >
                <Form>
                    <Field
                        className="form-control mr-sm-2"
                        type="search"
                        name={'search'}
                        placeholder="Search"
                        aria-label="Search"
                        style={{width: "500px"}}
                    />
                    <button type="submit" className='btn btn-success'>Search</button>
                </Form>
            </Formik>
            </div>
            <hr/>
            <br/>
            {search ?
                <div className="col-12">
                    <table border={1}>
                        <tr>
                            <td>STT</td>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Count</td>
                            <td>Category</td>
                            <td>Image</td>
                            <td>Action</td>
                        </tr>
                        {search() !== undefined &&
                            search().map((item, key) => (
                                <tr>
                                    <td>{key + 1}</td>
                                    <td>{item.nameHome}</td>
                                    <td>{item.address}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.count}</td>
                                    <td>{item.nameCategory}</td>
                                    <td>
                                        <img src={item.image} alt=""/>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "!!!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                }).then((willDelete) => {
                                                    if (willDelete) {
                                                        dispatch(deleteHome(item.idHome)).then(() => {
                                                            dispatch(getHomes(page1)).then(() => {
                                                                console.log(page1)
                                                                navigate("/home?page=" + page1);
                                                            });
                                                        });
                                                        swal("Delete Success!!", {
                                                            icon: "success",
                                                        });
                                                    } else {
                                                        swal("Please try again!");
                                                    }
                                                });
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <Link to={`edit-home/${item.idHome}`}>
                                            <button>Edit</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                {page1 == 1 ? (
                                    <>
                                        <div className="page-link">
                    <span aria-hidden="true" style={{color: "black"}}>
                      &laquo;
                    </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="page-link"
                                            onClick={() => {
                                                dispatch(getHomes(page1 - 1));
                                                navigate("/home?page=" + (page1 - 1));
                                            }}
                                        >
                                            {" "}
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </>
                                )}
                            </li>
                            <li className="page-item">
                                <a className="page-link">
                                    {page1}/{totalPages}
                                </a>
                            </li>
                            <li className="page-item">
                                {page1 == totalPages ? (
                                    <>
                                        <div className="page-link">
                    <span aria-hidden="true" style={{color: "black"}}>
                      &raquo;
                    </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="page-link"
                                            onClick={() => {
                                                dispatch(getHomes(Number(page1) + 1));
                                                navigate("/home?page=" + (Number(page1) + 1));
                                            }}
                                        >
                                            {" "}
                                            <span aria-hidden="true">&raquo;</span>
                                        </button>
                                    </>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
                :
                <div className="col-12">
                    <table border={1}>
                        <tr>
                            <td>STT</td>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Count</td>
                            <td>Category</td>
                            <td>Image</td>
                            <td>Action</td>
                        </tr>
                        {homes !== undefined &&
                            homes.map((item, key) => (
                                <tr>
                                    <td>{key + 1}</td>
                                    <td>{item.nameHome}</td>
                                    <td>{item.address}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.count}</td>
                                    <td>{item.nameCategory}</td>
                                    <td>
                                        <img src={item.image} alt=""/>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "!!!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                }).then((willDelete) => {
                                                    if (willDelete) {
                                                        dispatch(deleteHome(item.idHome)).then(() => {
                                                            dispatch(getHomes()).then(() => {
                                                                navigate("/home");
                                                            });
                                                        });
                                                        swal("Delete Success!!", {
                                                            icon: "success",
                                                        });
                                                    } else {
                                                        swal("Please try again!");
                                                    }
                                                });
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <Link to={`edit-home/${item.idHome}`}>
                                            <button>Edit</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                {page1 == 1 ? (
                                    <>
                                        <div className="page-link">
                    <span aria-hidden="true" style={{color: "black"}}>
                      &laquo;
                    </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="page-link"
                                            onClick={() => {
                                                dispatch(getHomes(page1 - 1));
                                                navigate("/home?page=" + (page1 - 1));
                                            }}
                                        >
                                            {" "}
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </>
                                )}
                            </li>
                            <li className="page-item">
                                <a className="page-link">
                                    {page1}/{totalPages}
                                </a>
                            </li>
                            <li className="page-item">
                                {page1 == totalPages ? (
                                    <>
                                        <div className="page-link">
                    <span aria-hidden="true" style={{color: "black"}}>
                      &raquo;
                    </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="page-link"
                                            onClick={() => {
                                                dispatch(getHomes(Number(page1) + 1));
                                                navigate("/home?page=" + (Number(page1) + 1));
                                            }}
                                        >
                                            {" "}
                                            <span aria-hidden="true">&raquo;</span>
                                        </button>
                                    </>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            }
        </div>
    )
}
