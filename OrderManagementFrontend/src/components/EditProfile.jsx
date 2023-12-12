import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Footer from './Footer';

export default function EditProfile() {

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    const userId = user.userId;
    const name = user.userName;
    const phone = user.phoneNumber;
    const Email = user.email;
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();
    const [formErrors, setFormErrors] = useState({});

    function editData() {
        // alert(userName+" "+ email + " " + password);
        try {
            const errors = { email: "", password: "", userName: "", phoneNumber: "" }
            if (!userName) {
                errors.userName = " * userName is required";
            }
            else if (!phoneNumber) {
                errors.phoneNumber = " * phone number is required";
            }
            else if (!email) {
                errors.email = " * Username is required";
            }
            if (!password) {
                errors.password = " * Password is required";
            }


            setFormErrors(errors);

        } catch (error) {

        }
        if (password != "" && password != null) {
            const userId = user.userId;
            const userName = user.userName;
            const phoneNumber = user.phoneNumber;
            const email = user.email;
            const EditData = { userId, userName, phoneNumber, email, password }
            let res = axios.put(`https://localhost:44307/api/Users/${user.userId}`, EditData)
                .then(response => {
                    alert("Details Changed Login Again !")
                    localStorage.clear();
                    navigate("/login")
                })
        }
    }
    function Back() {
        navigate("/profile")
    }

    return (
        <>
            <Home />
            <Form >
                <div className='col-sm-6 offset-sm-3 Register' >
                    <h1>Change Password</h1>
                    <div style={{ padding: "50px", textAlign: "left" }}>
                        <label htmlFor="" style={{ fontSize: "20px" }}> <b>UserId :</b> </label>

                        <input type="text" value={user.userId} className='form-control' />
                        <label htmlFor="" style={{ fontSize: "20px", paddingTop: "8px", color: "rgb(87, 99, 99)" }}> <b>User Name :</b> </label>
                        {/* <p style={{color:"brown"}}>{formErrors.userName}</p> */}
                        <input type="text" value={user.userName} className='form-control' defaultValue={name} />
                        <label htmlFor="" style={{ fontSize: "20px", paddingTop: "8px", color: "rgb(87, 99, 99)" }}> <b>Mobile :</b> </label>
                        {/* <p style={{color:"brown"}}>{formErrors.phoneNumber}</p> */}
                        <input type="text" value={user.phoneNumber} className='form-control' defaultValue={phone} />
                        <label htmlFor="" style={{ fontSize: "20px", paddingTop: "8px", color: "rgb(87, 99, 99)" }}> <b>Email :</b> </label>
                        {/* <p style={{color:"brown"}}>{formErrors.email}</p> */}
                        <input type="email" value={user.email} className='form-control' defaultValue={Email} />
                        <label htmlFor="" style={{ fontSize: "20px", paddingTop: "8px", color: "rgb(87, 99, 99)" }}> <b>New Password :</b> </label>
                        <p style={{ color: "brown" }}>{formErrors.password}</p>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control' placeholder='Password' /><br />
                        <div style={{ paddingTop: "10px" }}>
                            <Button variant='success' onClick={editData}>Save</Button>
                            <Button variant='warning' onClick={Back} style={{ marginLeft: "20px" }}>Back</Button>
                        </div>
                    </div>
                </div>
            </Form>
            <Footer />
        </>
    )
}