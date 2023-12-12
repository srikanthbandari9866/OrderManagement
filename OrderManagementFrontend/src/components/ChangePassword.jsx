import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Footer from "./Footer";

export default function ChangePassword() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [bools, SetBools] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [formErrors, setFormErrors] = useState({});
    const [formErrors1, setFormErrors1] = useState({});
    const [users, setUsers] = useState({});
    let res = {};

    // function editData() {
    //     // alert(userName+" "+ email + " " + password);
    //     try {
    //         const errors = { email: "", password: "", userName: "", phoneNumber: "" }
    //         if (!email) {
    //             errors.email = " * Username is required";
    //         }
    //         if (!password) {
    //             errors.password = " * Password is required";
    //         }

    //         setFormErrors(errors);

    //     } catch (error) {

    //     }
    //     if (password != "" && password != null) {
    //         let users = axios.get(`https://localhost:44307/api/Users/email/${email}`).then(response => {
    //             setUserId(response.data.userId)

    //         })
    //         alert("user Id : " + userId);

    //     //     console.log("email : " + email)
    //     //     const EditData = { email, password }
    //     //     let res = axios.put(`https://localhost:44307/api/Users${userId}`, EditData)
    //     //         .then(response => {
    //     //             alert("Details Changed Login Again !")
    //     //             localStorage.clear();
    //     //             navigate("/login")
    //     //         })
    //     }
    // }
    async function getData() {
        try {
            const errors = { email: "" };
            if (!email) {
                errors.email = " * Username is required";
            }

            setFormErrors(errors);
        } catch (error) { }

        if (email != "") {
            let user = await axios
                .get(`https://localhost:44307/api/Users/email/${email}`)
                .then((response) => {
                    res = response.data;
                    setUserId(response.data.userId);
                    console.log(response.data.userId);
                    if (response.data.userId != undefined) {
                        SetBools(true);
                    }
                    else {
                        alert("Email does not exists");
                    }
                });


        }

    }
    function calls() {
        if (userId == null || userId == undefined) {
            alert("Invalid Email")
        }
    }
    function editData() {
        try {
            const errors1 = { password: "" };
            if (!password) {
                errors1.password = " * Password is required";
            }

            setFormErrors1(errors1);
        } catch (error) { }
        if (password != "" && password != null) {
            alert("user Id : " + userId);
            const EditData = { userId, email, password }
            let res = axios.put(`https://localhost:44307/api/Users/${userId}`, EditData)
                .then(response => {
                    alert("Details Changed Login Again !")
                    localStorage.clear();
                    navigate("/login")
                })
        }

    }
    function Back() {
        navigate("/login");
    }

    return (
        <>
            <Home />
            <Form>
                <div className="col-sm-6 offset-sm-3 Register">
                    <h1>Reset Your Password</h1>
                    <div style={{ padding: "50px", textAlign: "left" }}>
                        <label
                            htmlFor=""
                            style={{
                                fontSize: "20px",
                                paddingTop: "8px",
                                color: "rgb(87, 99, 99)",
                            }}
                        >
                            {" "}
                            <b>Email :</b>{" "}
                        </label>
                        <p style={{ color: "brown" }}>{formErrors.email}</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="form-control"
                            placeholder="Email"
                        />
                        {bools == false ? (
                            <>
                                <Button variant="success" onClick={getData} style={{ marginTop: "20px" }}>
                                    next
                                </Button>
                            </>
                        ) : null}
                        {bools == true ? (
                            <>
                                <label
                                    htmlFor=""
                                    style={{
                                        fontSize: "20px",
                                        paddingTop: "8px",
                                        color: "rgb(87, 99, 99)",
                                    }}
                                >
                                    {" "}
                                    <b>New Password :</b>{" "}
                                </label>
                                <p style={{ color: "brown" }}>{formErrors1.password}</p>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    className="form-control"
                                    placeholder="Password"
                                />
                                <br />
                                <Button variant="success" onClick={editData}>
                                    Save
                                </Button>
                            </>
                        ) : null}
                        <div style={{ paddingTop: "10px" }}>
                            <Button
                                variant="warning"
                                onClick={Back}

                            >
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
            <Footer />
        </>
    );
}
