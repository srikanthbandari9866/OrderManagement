import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import './Style.css';
import Footer from './Footer';

export default function Cart() {

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user.userId;
    const [cartData, setCartData] = useState('');
    useEffect(() => {
        async function callApi() {
            const res = await axios.get(`https://localhost:44307/api/Carts/Users/${userId}`)
            setCartData(res.data)
        }
        callApi()
    }, [cartData])

    function deleteCart(cartId) {
        const res = axios.delete(`https://localhost:44307/api/Carts/Delete/${cartId}`)
        alert("removed item of id : " + cartId);
    }
    function PlaceOrders(itemId) {
        navigate("/placeOrder", {
            state: {
                itemId: itemId
            }
        });
    }
    function AddTemp(itemId, itemName, price, imagePath, quantity) {
        // alert(itemId + ' ' + itemName + ' ' + quantity)
        const res = axios.get(`https://localhost:44307/api/Items/${itemId}`)
        // setItemName(res.data.itemName);
        // setPrice(res.data.price);

        const cartData = { itemId, userId, itemName, price, quantity, imagePath }
        const result = axios.post(`https://localhost:44307/api/TempItems`, cartData)
            .then(response => {
                alert("Succesfully added to cart!" + cartData);
            })
    }
    return (
        <>
            <Home />
            <div className='cards'>
                <Row>
                    {
                        cartData &&
                        (cartData).map((item) => {
                            return (
                                <Col md={6} lg={4} key={item.cartId}>
                                    {/* xs={12} md={6} lg={3} key={item.itemId} */}
                                    <Card style={{ width: '20rem', marginTop: "30px", padding: "20px" }} >
                                        <Card.Img variant="top" src={item.imagePath} />
                                        <Card.Body>
                                            <Card.Title>{item.itemName}</Card.Title>
                                            <Card.Text>
                                                Order the Tasty food and enjoy!
                                            </Card.Text>
                                            <p><b>Available quantity : </b> {item.quantity}</p>
                                            <h4><b style={{ color: "green" }}>Price : </b> <i>{item.price}</i></h4>
                                            <h5><b style={{ color: "blue" }}>Discount : </b> <i>25%</i></h5>
                                            <Button variant="primary" onClick={() => PlaceOrders(item.itemId)} >Place Order</Button>
                                            <Button variant="warning" style={{ marginLeft: "5px" }} onClick={() => deleteCart(item.cartId)} >Remove</Button>
                                            <Button variant="success" style={{ marginTop: "5px" }} onClick={() => AddTemp(item.itemId, item.itemName, item.price, item.imagePath, item.quantity)} >Add to Order List</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
            {/* <Footer /> */}
        </>
    )
}