import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router"
import { cancelOrderDetail, checkOut, getOrderDetailsByIdUser } from "../../service/orderDetailService";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function MyOrder() {
    const {idUser} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myOrder = useSelector(state => {
        return state.orderDetails.orderDetails
    })
    const loading = useSelector(state => {
        return state.orderDetails.loading
    })
    useEffect(()=>{
        dispatch(getOrderDetailsByIdUser(idUser))
    }, [])
    return(
        <>
            {
                loading === true ? 
                <>
                    <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                        <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </>
                :
                <>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Home</th>
                                <th scope="col">Address</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Check In</th>
                                <th scope="col">Check Out</th>
                                <th scope="col">Status</th>
                                <th scope="col" colSpan={3} className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myOrder.map((item, key)=>(
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{item.nameHome}</td>
                                        <td>{item.address}</td>
                                        <td>{item.nameCategory}</td>
                                        <td>{item.price}</td>
                                        <td><Link to={`/home/home-detail/${item.idHome}`}><img src={item.image}/></Link></td>
                                        <td>{item.checkIn}</td>
                                        <td>{item.checkOut}</td>
                                        <td>{item.statusOrder}</td>
                                        {
                                            item.statusOrder === "Check out" ?
                                            <>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </>
                                            :
                                            <>
                                            {
                                                item.statusOrder === "Check in" ?
                                                <>
                                                    <td><Link to={`/user/edit-order/${item.idOrderDetail}`}><button className="btn btn-primary">Edit</button></Link></td>
                                                    <td>
                                                        <button className="btn btn-warning"
                                                        onClick={() => {
                                                            swal({
                                                            title: "Are you sure?",
                                                            text: "Once check out, you will not be able to recover this order!",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                            })
                                                            .then((willDelete) => {
                                                            if (willDelete) {
                                                                dispatch(checkOut([item.idOrderDetail, {idHome:item.idHome}])).then((e) => {
                                                                    dispatch(getOrderDetailsByIdUser(idUser)).then(()=>{
                                                                        navigate(`/user/my-order/${idUser}`)
                                                                    })
                                                                    swal("Check out successfully!", {
                                                                        icon: "success",
                                                                    });
                                                                })
                                                            } else {
                                                                swal("Your order is safe!");
                                                            }
                                                            });
                                                        }}
                                                    >
                                                        Check out</button></td>
                                                    <td>
                                                        <button className="btn btn-danger"
                                                        onClick={() => {
                                                            swal({
                                                            title: "Are you sure?",
                                                            text: "Once canceled, you will not be able to recover this order!",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                            })
                                                            .then((willDelete) => {
                                                            if (willDelete) {
                                                                dispatch(cancelOrderDetail([item.idOrderDetail, +idUser])).then((e) => {
                                                                    if (e.payload[0] === `Wrong`) {
                                                                        swal(`You can't cancel!!!`)
                                                                    } else {
                                                                        dispatch(getOrderDetailsByIdUser(idUser)).then(()=>{
                                                                            navigate(`/user/my-order/${idUser}`)
                                                                        })
                                                                        swal("Poof! Your order has been deleted!", {
                                                                        icon: "success",
                                                                        });
                                                                    }
                                                                })
                                                            } else {
                                                                swal("Your order is safe!");
                                                            }
                                                            });
                                                        }}
                                                    >
                                                        Cancel</button></td>
                                                </>
                                                :
                                                <>
                                                    <td></td>
                                                    <td><Link to={`/home/rent-home/${item.idHome}`}><button className="btn btn-primary">Rent again</button></Link></td>
                                                    <td></td>
                                                </>
                                            }
                                            </>
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
            }
        </>
    )
}