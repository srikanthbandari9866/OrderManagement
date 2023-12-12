import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import './Style.css';
import Footer from './Footer';

export default function OrdersList() {

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user.userId;
    const [tempData, setTempData] = useState('');
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [shippingAddress, setShippingAddress] = useState('');
    const [formErrors, setFormErrors] = useState({});
    let Oid = 0;
    useEffect(() => {
        async function callApi() {
            const res = await axios.get(`https://localhost:44307/api/TempItems/User/${userId}`)
                .then(response => {
                    setTempData(response.data);
                })
            setCount(tempData.length);
            setPrice(TotalPrice());

        }
        callApi()
    }, [tempData])

    function TotalPrice() {
        let p = 0;
        tempData.forEach(element => {
            p = (p + element.price);
        });
        return parseInt((p - (p * 0.25)));
    }
    function deleteCart(tempItemsId) {
        const res = axios.delete(`https://localhost:44307/api/TempItems/${tempItemsId}`)
        // alert("removed item of id : " + tempItemsId);
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
        if (count == 0) {
            alert("Select items to order");
        }
        if (shippingAddress != "") {
            // alert("continue Order")
            let userId = user.userId;
            let userName = user.userName;
            let orderTotal = count;
            let totalPrice = price;
            let discount = parseInt((price + (price * 0.25)) - price);
            let orderStatus = 'Placed';
            let date = new Date().toJSON();
            const orderPlaceData = { userId, userName, orderTotal, totalPrice, discount, date, shippingAddress, orderStatus }

            let place = axios.post(`https://localhost:44307/api/Orders`, orderPlaceData)
                .then(response => {
                    // alert("inserted Orders" + response.data.orderId)
                    Oid = response.data.orderId;
                    if (Oid != 0) {
                        tempData &&
                            (tempData).forEach(item => {
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

                            });
                        // alert("updated orderItems")
                        tempData.forEach(item => {
                            let res = axios.delete(`https://localhost:44307/api/TempItems/${item.tempItemsId}`)
                                .then(response => {

                                })
                        })
                        // alert("Deleted Orders list")
                        alert("order Placed.")
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
            <div className='ordersList'>
                {
                    count == 0 ? <><h2 style={{ backgroundColor: "rgb(242, 251, 217)", marginRight: "14%" }}>Add Items To Order.</h2></> : null
                }
                <table className="table table-striped table-border " style={{
                    backgroundColor: "lightcyan", borderRadius: "300px"
                    , border: "2px solid white", width: "800px"
                }}>
                    <thead  >
                        <tr style={{ backgroundColor: "slateblue" }}>
                            <th>Item Id</th>
                            <th>Item Name</th>

                            <th>Price</th>
                            <th>Manage Items</th>

                        </tr>
                    </thead>
                    <tbody>{tempData &&
                        (tempData).map((l, index) => {
                            return (


                                <tr style={{ backgroundColor: "lavender" }} key={l.tempItemsId}>
                                    <td>{l.itemId}</td>
                                    <td >{l.itemName}</td>
                                    <td >{l.price}</td>
                                    <td><Button variant="warning" style={{ marginLeft: "5px" }} onClick={() => deleteCart(l.tempItemsId)} >Remove</Button></td>

                                </tr>

                            )
                        })
                    }
                    </tbody>
                </table>
                {
                    count != 0 ?
                        <>
                            <div>
                                <h5><b style={{ color: "blue" }}>Discount : </b> <i>25%</i></h5>
                                <h4>Total Items : {count} </h4>
                                <h4>Total Price : {price} </h4>
                                <div>
                                    <input type="text" style={{ marginBottom: "10px" }} value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Enter shipping address" />
                                    <p style={{ color: "brown" }}>{formErrors.shippingAddress}</p>
                                </div>
                                <Button variant="primary" onClick={ContinueOrder} style={{ marginBottom: "20px" }} >Continue Order</Button>
                                {/* <Button variant="warning" style={{ marginLeft: "5px" }} onClick={Back} >Back</Button> */}
                            </div>
                        </>
                        :
                        null
                }
            </div>
            {/* <Footer /> */}
        </>
    )
}

// function increment(id) {
//     alert(id)
//     tempData.forEach(element => {
//         if (element.tempItemsId == id) {
//             setCount(count + 1);
//         }
//     });
//     // setCount(count + 1);
// }
// function decrement(id) {
//     if (count > 0) {
//         setCount(count - 1);
//         // SetDiscount(
//         //     (item.price * count )* (25/100)
//         // )
//     }
// }

{/* <td><div style={{ marginBottom: "20px" }}>
                                        <Button variant="secondary" onClick={() => increment(l.tempItemsId)} >+</Button>
                                        <h4>Quantity : {count}</h4>
                                        <Button variant="secondary" onClick={() => decrement(l.tempItemsId)} >-</Button>

                                    </div></td> */}