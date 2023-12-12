import { Button } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import './Style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Home from './Home';
import Footer from './Footer';

export default function Register() {

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/categories")
        }
    }, [])

    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const form = useRef();
    let res = {};

    async function handleSubmit() {
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
            else if (!password) {
                errors.password = " * Password is required";
            }


            setFormErrors(errors);

        } catch (error) {

        }
        if (userName != '' && phoneNumber != "" && email != "" && password != "") {
            const userdata = { userName, phoneNumber, email, password }
            let result = await axios.post(`https://localhost:44307/api/Users`, userdata)
                .then(response => {
                    alert("Submitting to database")
                    console.log(response.data)
                    res = response.data
                    navigate("/login")
                })
        }


    }
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_nh4tjlm', 'template_mhr806f', form.current, '3xtsS1ZDrSQRLXjb4')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <>
            <Home />
            <div className='col-sm-6 offset-sm-3 Register' >
                <h1>Register Page</h1>
                <div style={{ padding: "50px" }}>
                    <form ref={form} onSubmit={sendEmail} >
                        <input type="text" name='user_name' value={userName} onChange={(e) => { setUserName(e.target.value) }} className='form-control' placeholder='User Name' /> <br />
                        <p style={{ color: "brown" }}>{formErrors.userName}</p>
                        <input type="text" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} className='form-control' placeholder='Phone Number' /><br />
                        <p style={{ color: "brown" }}>{formErrors.phoneNumber}</p>
                        <input type="email" name='user_email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='form-control' placeholder='Email' /><br />
                        <p style={{ color: "brown" }}>{formErrors.email}</p>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control' placeholder='Password' /><br />
                        <p style={{ color: "brown" }}>{formErrors.password}</p>
                        <div style={{ paddingTop: "10px", marginRight: "60px" }}><Button variant='primary' type='submit' onClick={handleSubmit} >Sign Up</Button></div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}