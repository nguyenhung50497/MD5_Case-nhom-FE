import {useEffect, useState} from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { deleteHome, getHomes } from "../../service/homeService";
import { useEffect } from "react";

import swal from "sweetalert";
import {getHomes, searchHome} from "../../service/homeService";
import { deleteHome } from "../../service/homeService";
import {Field, Form, Formik} from "formik";

export default function ListHome() {
  const [page, setPage] = useSearchParams();
  const page1 = page.get("page") || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const homes = useSelector((state) => {
    return state.homes.homes.homes;
  });
  const totalPages = useSelector((state) => {
    if (state.homes.homes !== undefined) {
      return state.homes.homes.totalPage;
    }
  });
  useEffect(() => {
    dispatch(getHomes(page1));
  }, []);
  return (
    <div className="row">
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
                  <img src={item.image} alt="" />
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
                    <span aria-hidden="true" style={{ color: "black" }}>
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
                    <span aria-hidden="true" style={{ color: "black" }}>
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
    </div>
  );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useSearchParams();
    const [search, setSearch] = useState('');
    const page1 = page.get('page') || 1;
    const homes = useSelector(state => {
        if (state.homes.homes.homes !== undefined) {
            return state.homes.homes.homes
        }
    })
    const totalPages = useSelector(state => {
        if (state.homes.homes !== undefined) {
            return state.homes.homes.totalPage;
        }
    })
    const loading = useSelector(state => {
        return state.homes.loading
    })
    const user = useSelector(state => state.user.currentUser)
    useEffect(() => {
        dispatch(getHomes(page1));
    }, []);
    const handleDelete = (id) => {
        dispatch(deleteHome(id)).then(() => {
            navigate('/home/homes')
        })
    }
    const handleSearch = (values) => {
        dispatch(searchHome(values.search))
    }
    return (
        <div className="container">
            <Formik
                initialValues={{
                    search: ''
                }}
                onSubmit={(values)=>{
                    handleSearch(values)
                }}
            >
                <Form>
                    <Field
                        className="form-control mr-sm-2"
                        type="search"
                        name = {'search'}
                        placeholder="Search"
                        aria-label="Search"
                        style={{width: "500px"}}
                    />
                    <button className='btn btn-success'>Search</button>
                </Form>
            </Formik>
            <h1 className="text-center">List Home</h1>
            { loading === true ?
            <center className="container-fluid" style={{marginTop: '200px'}}>
                <div className="loader"></div>
            </center>
            :
            <>
                <div className="row">
                    <div className="mx-auto row col-8">
                        {homes !== undefined && homes.map(item => (
                            <div key={item.idHome} className="col-6">
                                <div key={item.idHome} className="card" style={{width: '100%', height: '100%', paddingBottom:'30px'}}>
                                    <img key={item.idHome} src={item.imageHome} className="card-img-top" alt={item.imageHome} />
                                    <div key={item.idHome} className="card-body">
                                        <h1>{item.nameHome}</h1>
                                        <p className="card-text"
                                        style={{color: 'orange'}}>{item.idUser !== undefined && item.username}</p>
                                        <p className="card-text">{item.countSong}</p>
                                        { user.idUser === item.idUser &&
                                        <>
                                            <Link to={'/home/edit-home/'+item.idHome}><button className="btn btn-primary">Edit</button></Link>
                                            <button className="btn btn-danger" onClick={() => {
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "Delete this home!!!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                .then((willDelete) => {
                                                    if (willDelete) {
                                                        handleDelete(item.idHome)
                                                        swal("Poof! Your home has been deleted!", {
                                                        icon: "success",
                                                    });
                                                    } else {
                                                    swal("Your home is safe!");
                                                    }
                                                });
                                            }}>Delete</button>
                                        </>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <hr/>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            {(page1 == 1) ?
                                <>
                                    <div className="page-link"><span aria-hidden="true" style={{color:'black'}}>&laquo;</span></div>
                                </>
                                :
                                <>
                                    <button  className="page-link" onClick={() => {
                                        dispatch(getHomes(page1 - 1));
                                        navigate('/home/homes?page='+(page1-1))
                                    }
                                    }> <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </>
                            }
                        </li>
                        <li className="page-item"><a className="page-link">{page1}/{totalPages}</a></li>
                        <li className="page-item">
                            {(page1 == totalPages) ?
                                <>
                                <div className="page-link"><span aria-hidden="true" style={{color:'black'}}>&raquo;</span></div>
                                </>
                                :
                                <>
                                    <button  className="page-link" onClick={() => {
                                        dispatch(getHomes(Number(page1) + 1));
                                        navigate('/home/homes?page='+(Number(page1)+1))
                                    }
                                    }> <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </>
                            }
                        </li>
                    </ul>
                </nav>
            </>
            }
        </div>
    )
}
