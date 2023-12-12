import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './Home';
import Moment from 'moment';
import { Button, Form } from 'react-bootstrap';
import Footer from './Footer';

export default function OrderDetails() {

  let user = JSON.parse(localStorage.getItem('user-info'));
  const [orderData, setOrderData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function callApi() {
      let res = await axios.get(`https://localhost:44307/api/Orders/user/${user.userId}`)
      setOrderData(res.data);
    }
    callApi()
  }, [orderData])

  function Back() {
    navigate("/profile")
  }
  function ViewDetails(id, status) {
    if (status == 'Placed') {
      navigate("/itemDetails", {
        state: {
          id: id,
          status: true,
        }
      })
    }
    else {
      navigate("/itemDetails", {
        state: {
          id: id,
          status: false,
        }
      })
    }
  }

  return (
    <>
      <Home />
      <div>

        <div style={{ paddingTop: "10px" }}>
          <h1 style={{ marginTop: "10px" }}>My Orders</h1>
          <Button variant='secondary' onClick={Back} style={{ marginLeft: "1340px", marginBottom: "10px", paddingLeft: "30px", paddingRight: "30px" }}>Profile</Button>
        </div>
        <table className="table table-striped table-border " style={{ backgroundColor: "lightcyan", borderRadius: "300px", border: "2px solid white" }}>
          <thead  >
            <tr style={{ backgroundColor: "slateblue" }}>
              <th>Order Id</th>
              <th>User Id</th>
              <th>User Name</th>
              <th>Order Total</th>
              <th>Discount</th>
              <th>Total Price</th>
              <th>Shipping address</th>
              <th>Date</th>
              <th>Order Status</th>
              <th>Order Details</th>

            </tr>
          </thead>
          <tbody>{orderData &&
            (orderData).map((l, index) => {
              return (


                <tr style={{ backgroundColor: "lavender" }} key={l.orderItemId}>
                  <td>{l.orderId}</td>
                  <td>{l.userId}</td>
                  <td >{l.userName}</td>
                  <td >{l.orderTotal}</td>
                  <td >{l.discount}</td>
                  <td >{l.totalPrice}</td>
                  <td>{l.shippingAddress}</td>
                  <td>{Moment(l.date).format('DD-MM-YYYY')}</td>
                  <td><button id="sts" class="btn btn-outline-success" value={l.orderStatus}>{l.orderStatus}</button></td>
                  <td><button id="sts" class="btn btn-outline-primary" onClick={() => ViewDetails(l.orderId, l.orderStatus)}>View Details</button></td>


                </tr>

              )
            })
          }
          </tbody>
        </table>

      </div>
      {/* <Footer /> */}
    </>
  )
}