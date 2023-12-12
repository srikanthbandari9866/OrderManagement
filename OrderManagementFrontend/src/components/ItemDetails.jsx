import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './Home';
import Moment from 'moment';
import { Button, Form, Table } from 'react-bootstrap';
import Footer from './Footer';

export default function OrderDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    const status = location.state.status;
    const [orderData, setOrderData] = useState();

    useEffect(() => {
        async function callApi() {
            let res = await axios.get(`https://localhost:44307/api/OrderItems/Order/${id}`)
            setOrderData(res.data);
        }
        callApi()
    }, [orderData])
    function Back() {
        navigate("/orderDetails")
    }
    async function cancelOrder() {
        if (window.confirm("Do you want to cancel your order?")) {
            let orderStatus = 'Canceled';
            let orderId = id;
            let Data = { orderId, orderStatus }
            let res = await axios.put(`https://localhost:44307/api/Orders/${id}`, Data).then(response => {
                navigate("/orderDetails")
            })
        }
        else {
            return null;
        }
    }

    return (
        <>
            <Home />
            <div>
                <h1>Order Details</h1>
                <Button variant='warning' onClick={Back} style={{ marginLeft: "1330px", marginBottom: "10px", paddingLeft: "50px", paddingRight: "50px" }}>Back</Button>
                <Table striped bordered hover variant="dark">
                    <thead  >
                        <tr style={{ backgroundColor: "slateblue" }}>
                            <th>Order Id</th>
                            <th>User Id</th>
                            <th>Item Name</th>
                            <th>Order Quantity</th>
                        </tr>
                    </thead>
                    <tbody>{orderData &&
                        (orderData).map((l, index) => {
                            return (


                                <tr style={{ backgroundColor: "lavender" }} key={l.orderItemId}>
                                    <td>{l.orderId}</td>
                                    <td>{l.userId}</td>
                                    <td >{l.itemName}</td>
                                    <td >{l.orderQuantity}</td>
                                </tr>

                            )
                        })
                    }
                    </tbody>

                </Table>
                {
                    status == true ? <><Button variant='danger' onClick={cancelOrder} >Cancel your Order</Button></> : null
                }
            </div>
            {/* <Footer /> */}
        </>
    )
}