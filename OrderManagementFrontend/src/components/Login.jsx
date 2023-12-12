import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Style.css';
import Home from './Home';
import axios from 'axios';
import Footer from './Footer';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let res = {};
    let user = JSON.parse(localStorage.getItem('user-info'));
    // const[userData,setUserData] = useState("");
    let userId = null;
    const [formErrors, setFormErrors] = useState({});

    // useEffect(() => {
    //     // if (user.userId != null ) {
    //     if (localStorage.getItem('user-info')) {
    //         navigate("/categories")
    //     }
    // }, [])
    async function handleSubmit() {
        try {
            const errors = { email: "", password: "" }
            if (!email) {
                errors.email = " * Username is required";
            }
            else if (!password) {
                errors.password = " * Password is required";
            }

            setFormErrors(errors);

        } catch (error) {

        }
        let result = await axios.get(`https://localhost:44307/api/Users/login/${email}/${password}`)
            .then(response => {
                userId = response.data.userId;
                let userName = response.data.userName;
                let email = response.data.email;
                let phoneNumber = response.data.phoneNumber;
                res = { userId, userName, email, phoneNumber };
                alert(userId);
                console.log("userData is : " + userId);
                if (userId == null || userId == undefined) {
                    alert("Invalid Login")
                }
                else if (userId == 1) {
                    navigate("/categories")
                }
                else {
                    navigate("/categories")
                }
            })
        if (res.userId != null) {
            localStorage.setItem("user-info", JSON.stringify(res))
        }
    }

    return (
        <>
            <Home />
            <div className='col-sm-6 offset-sm-3 Login' >
                <h1>Login Page</h1>
                <div style={{ padding: "50px" }}>
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className='form-control' placeholder='UserName/Email' />
                    <p style={{ color: "brown" }}>{formErrors.email}</p><br />
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control' placeholder='Password' />
                    <p style={{ color: "brown" }}>{formErrors.password}</p><br />
                    <div style={{ paddingTop: "10px", marginRight: "50px" }}><Button onClick={handleSubmit}>Login</Button></div>
                    <div style={{ paddingLeft: "0px", marginTop: "20px", marginRight: "50px", color: 'aqua' }}><Link to="/changePassword" style={{ color: 'aqua' }}> forget password </Link></div>
                </div>
            </div>
            <Footer />
        </>
    )
}