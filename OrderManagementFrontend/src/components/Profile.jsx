import React from 'react';
import Home from './Home';
import './Style.css';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


export default function Profile() {

    let user = JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    function editP() {
        navigate("/editProfile");
    }
    function OrderD() {
        navigate("/orderDetails")
    }
    return (
        <>
            <Home />
            <div>
                {/* <h1>Profile page.........</h1> */}
                <div>
                    <Card className="bg-dark text-white" style={{ width: "50rem", marginLeft: "400px", marginTop: "30px" }}  >
                        <Card.Img src="bg.jfif" alt="Card image" height="700" />
                        <Card.ImgOverlay>
                            <Card.Title> <h1>User Profile.</h1> </Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.
                            </Card.Text>
                            <div className='profile' >
                                <Card.Text> <h3> <b>User Id &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                                </b>&nbsp;&nbsp; {user.userId} </h3> </Card.Text>
                                <Card.Text><h3> <b>User Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b> &nbsp;&nbsp;{user.userName} </h3> </Card.Text>
                                <Card.Text><h3> <b>Phone Number {" "}: </b> &nbsp;&nbsp;{user.phoneNumber} </h3> </Card.Text>
                                <Card.Text><h3> <b>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    : </b> &nbsp;&nbsp;{user.email} </h3> </Card.Text>
                            </div>
                            <div className='profile'>
                                <Button onClick={editP}> Change Password </Button>
                                <Button onClick={OrderD} style={{ marginLeft: "20px" }} > Order Details </Button>
                            </div>
                        </Card.ImgOverlay>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    )
}