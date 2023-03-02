import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router"
import { getOrderDetailsByIdUser } from "../../service/orderDetailService";
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
    console.log(myOrder);
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
                                <th scope="col" colSpan={2} className="text-center">Action</th>
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
                                            </>
                                            :
                                            <>
                                                <td><button className="btn btn-primary">Edit</button></td>
                                                <td><button className="btn btn-danger"
                                                    onClick={() => {
                                                        swal({
                                                          title: "Are you sure?",
                                                          text: "Once deleted, you will not be able to recover this order!",
                                                          icon: "warning",
                                                          buttons: true,
                                                          dangerMode: true,
                                                        })
                                                        .then((willDelete) => {
                                                          if (willDelete) {
                                                            swal("Poof! Your order has been deleted!", {
                                                              icon: "success",
                                                            });
                                                          } else {
                                                            swal("Your order is safe!");
                                                          }
                                                        });
                                                    }}
                                                >
                                                    Delete</button></td>
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