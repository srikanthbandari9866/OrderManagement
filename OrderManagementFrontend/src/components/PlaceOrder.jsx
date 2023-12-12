import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home'; import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import CatNav from './CatNav';
import './Style.css';
import Footer from './Footer';

export default function PlaceOrder() {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const location = useLocation();
    const navigate = useNavigate();
    const itemId = location.state.itemId;
    // const [orderId,setOrderId] = useState();
    // const [orderTotal, setOrderTotal] = useState();
    const [item, setItem] = useState('');
    const [order, setOrder] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    // const [item, setItem] = useState('');
    const [count, setCount] = useState(1);
    // const [cc, setCc] = useState(0);
    let Oid = 0;
    // const [discount,SetDiscount] = useState(0);
    let Od = {};
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        async function callApi() {
            const res = await axios.get(`https://localhost:44307/api/Items/${itemId}`)
            setItem(res.data)

        }
        callApi()
        // console.log(itemData)

    }, [item])
    useEffect(() => {
        async function callApi() {
            const res = await axios.get(`https://localhost:44307/api/Orders/user/${user.userId}`)
            setOrder(res.data)

        }
        callApi()

    }, [order])


    function increment() {

        // if(count != 0){
        //     SetDiscount(
        //         (item.price * (count + 1) )* (25/100)
        //     )
        // }
        setCount(count + 1);
    }
    function decrement() {
        if (count > 1) {
            setCount(count - 1);
            // SetDiscount(
            //     (item.price * count )* (25/100)
            // )
        }
        console.log(order)
    }
    function ContinueOrder() {
        try {
            const errors = { shippingAddress: "" }
            if (!shippingAddress) {
                errors.shippingAddress = " * shipping address is required";
            }
            setFormErrors(errors);
        } catch (error) {

        }
        if (shippingAddress != "") {
            // alert("continue Order" + count + "  " + item.price);
            let userId = user.userId;
            let userName = user.userName;
            let orderTotal = 1;
            let discount = ((item.price * count) * (10 / 100));
            let totalPrice = item.price * count - discount;
            let orderStatus = 'Placed';
            let date = new Date().toJSON();
            const orderPlaceData = { userId, userName, orderTotal, totalPrice, discount, date, shippingAddress, orderStatus }
            // alert(discount)
            let place = axios.post(`https://localhost:44307/api/Orders`, orderPlaceData)
                .then(response => {
                    // alert("inserted Orders" + response.data.orderId)
                    Oid = response.data.orderId;
                    if (Oid != 0) {
                        let userName = user.userName;
                        let userId = user.userId;
                        let orderId = Oid;
                        let OrderQuantity = 1;
                        let itemName = item.itemName;
                        let itemId = item.itemId;
                        // const current = new Date();
                        // let date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
                        // let date = new Date().toJSON();
                        let Data = { orderId, itemId, userId, itemName, OrderQuantity }

                        let result = axios.post(`https://localhost:44307/api/OrderItems`, Data).then(response => {

                        })


                        navigate('/OrderDetails');
                    }
                })
        }
    }
    function Back() {
        navigate(-1);
    }

    return (
        <>
            <Home />
            <CatNav />
            <div>
                <h1>Place Order Page......{itemId} </h1>
                <div className='placeOrdercard' >
                    {/* xs={12} md={6} lg={3} key={item.itemId} */}
                    <Card style={{ width: '29rem', height: '750px', marginTop: "20px", padding: "20px" }} >
                        <Card.Img variant="top" src={item.imagePath} height="300" width="300" />
                        <Card.Body>
                            <Card.Title>{item.itemName}</Card.Title>
                            <Card.Text>
                                Order the Tasty food and enjoy!
                            </Card.Text>
                            <p><b>Available quantity : </b> {item.quantity}</p>
                            <h4><b style={{ color: "green" }}>Price : </b> <i>{item.price}</i></h4>
                            <h5><b style={{ color: "blue" }}>Discount : </b> <i>{(item.price * count) * (10 / 100)}</i></h5>
                            <div style={{ marginBottom: "20px" }}>
                                <Button variant="secondary" onClick={increment} >+</Button>
                                <h4>Quantity : {count}</h4>
                                <Button variant="secondary" onClick={decrement} >-</Button>

                            </div>
                            <div>
                                <input type="text" style={{ marginBottom: "10px" }} value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Enter shipping address" />
                                <p style={{ color: "brown" }}>{formErrors.shippingAddress}</p>
                            </div>
                            <Button variant="primary" onClick={ContinueOrder} >Continue Order</Button>
                            <Button variant="warning" style={{ marginLeft: "5px" }} onClick={Back} >Back</Button>

                        </Card.Body>
                    </Card>

                </div>
            </div>
            <Footer />
        </>
    )
}


// if (window.confirm("Do you want to continue order ?")) {
//     setCc(cc + 1);
//     alert(cc);
//     navigate(-1);
// }
// else {
    // alert(user.userId + " cc : " + cc);
    // const res = axios.get(`https://localhost:44307/api/Orders/user/${user.userId}`)
    // .then(response => {
    //     console.log(response.data);
    //     setOrder(response.data);
    //     setOrderId(response.data.orderId);
    // setOrderTotal(response.data.orderTotal)
    // console.log(response.data.orderId);
    // })
    // alert(order + " " + order.orderId + " " + order.orderTotal)

    // console.log("order after response " + order + "bhsvcxsvxgvggvvgvv");
    // if (order == '' || order == undefined) {
    //     let orderTotal = 1;
    //     let userId = user.userId;
    //     let userName = user.userName;
    //     const orderPlaceData = { userId, userName, orderTotal }
    //     alert("if")
    //     let place = axios.post(`https://localhost:44307/api/Orders`, orderPlaceData)
    //         .then(response => {
    //             alert("inserted Orders" + response.data.orderId)
    //             Oid = response.data.orderId;
    //         })
    // }
    // else {
    //     // let orderId = order.orderId;

    //     let userId = user.userId;
    //     let userName = user.userName;
    //     let orderId = order.orderId
    //     let orderTotal = order.orderTotal
    //     const orderPlaceData = { orderId, userId, userName, orderTotal: order.orderTotal + 1 }
    //     alert(order.orderTotal + "  " + user.userName + "  Ot:" + order.orderTotal)
    //     alert("else" + orderTotal);
    //     let place = axios.put(`https://localhost:44307/api/Orders/${userId}`, orderPlaceData)
    //         .then(response => {
    //             alert("Updated Orders")
    //         })
    // }

// }