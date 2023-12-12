import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import Home from './Home';
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ItemMap from './ItemMap';
import './Style.css';
export default function CatNav() {

    // const [catData, setCatData] = useState('');

    // useEffect(() => {
    //     async function callApi() {
    //         const res = await axios.get('https://localhost:44307/api/Categories')
    //         setCatData(res.data)
    //     }
    //     callApi()
    //     // console.log(itemData)s
    // }, [catData])

    return (
        <div>
            <Navbar bg="warning" variant="dark">
                <Navbar.Brand style={{ paddingLeft: "50px" }}>Hexa-Order</Navbar.Brand>
                <Nav className="me-auto navbar_cat">
                    <Link to="/biryani" style={{ paddingLeft: "30px" }}> Biryani </Link>
                    <Link to="/fastFoods" style={{ paddingLeft: "30px" }}> FastFoods </Link>
                    <Link to="/Pizza" style={{ paddingLeft: "30px" }}> Pizza </Link>
                    <Link to="/burger" style={{ paddingLeft: "30px" }}> Burger </Link>
                    <Link to="/shawarma" style={{ paddingLeft: "30px" }}> Shawarma </Link>
                    <Link to="/pastry" style={{ paddingLeft: "30px" }}> Pastry </Link>
                    <Link to="/desserts" style={{ paddingLeft: "30px" }}> Desserts </Link>

                </Nav>

            </Navbar>
        </div>
    )
}