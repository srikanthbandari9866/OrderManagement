import React, { useState } from 'react';
import Home from './Home';
import './Style.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import Pizza from './Pizza';
import Footer from './Footer';
import CatNav from './CatNav';


export default function Categories() {

    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    return (
        <>
            <Home />
            <CatNav />
            <div className='Categories'>
                <Carousel style={{ width: "900px", marginTop: "20px", marginLeft: "20%" }}>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="./om1.jpeg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            {/* <h3 style={{ color: "aqua" }}>Order the tasty food! and Enjoy!!</h3> */}

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src="./om2.jpeg"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Order the tasty food! and Enjoy!!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="./om3.jpeg"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            {/* <h3 style={{ color: "yellow" }}>Order the tasty food! and Enjoy!!</h3> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </div>
            {/* <div className='Cat1'>
                    <h1>This is the Categories Home Page</h1>
                </div> */}
            <Footer />
        </>
    )
}