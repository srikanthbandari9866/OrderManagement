import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css';


export default function Home() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  let user = JSON.parse(localStorage.getItem('user-info'));
  let arr = ['biryani', 'burger', 'cart', 'categories', 'changePassword', 'desserts', 'editProfile',
    'fastFoods', 'orderDetails', 'ordersList', 'pastry', 'pizza', 'profile', 'shawarma', 'Biryani', 'Burger', 'Cart', 'Categories', 'ChangePassword', 'Desserts', 'EditProfile',
    'FastFoods', 'OrderDetails', 'OrdersList', 'Pastry', 'Pizza', 'Profile', 'Shawarma']
  function logout() {
    localStorage.clear();
    navigate("/login");

  }
  function Profile() {
    navigate("/profile")
  }
  function SearchBar() {
    if (arr.includes(category)) {
      let str = "/" + category
      navigate(str);
    }
    // arr.some(element => {
    //   if (element == category) {
    //     let str = "/" + category
    //     navigate(str);
    //   }
    // });
  }
  return (
    <div className=''>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{ paddingLeft: "50px" }}>Hexa-Order</Navbar.Brand>
        <Nav className="me-auto navbar_home">
          {
            localStorage.getItem('user-info') && user.userId == 1 ?
              <>
                <div style={{ paddingLeft: "100px" }}>
                  {/* <Link to="/home"> Home </Link> */}

                  <Link to="/categories" style={{ paddingLeft: "30px" }}> Categories </Link></div>
              </>
              :
              localStorage.getItem('user-info') && user.userId != 1 && (user.userId != null || user.userId == undefined) ?
                <>
                  <div style={{ paddingLeft: "100px" }}>
                    {/* <Link to="/home"> Home </Link> */}
                    <Link to="/categories" style={{ paddingLeft: "30px" }}> Categories </Link></div>
                  <Link to="/cart" style={{ paddingLeft: "30px" }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                  </svg> Cart </Link>
                  <Link to="/ordersList" style={{ paddingLeft: "30px" }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg> Orders List </Link>
                  <Link to="/orderDetails" style={{ paddingLeft: "30px" }} > Order History </Link>
                  <form class="d-flex input-group w-auto ms-lg-3 my-3 my-lg-0"  >
                    <input type="search" class="form-control" placeholder="SearchByCategory" aria-label="Search" onChange={e => { setCategory(e.target.value) }} style={{ marginLeft: "35px" }} />

                    <button class="btn btn-primary" type="button" data-mdb-ripple-color="dark" onClick={SearchBar} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </form>
                </>
                :
                <>
                  <div style={{ paddingLeft: "50px" }}><Link to="/login"> Login </Link>
                    <Link to="/register" style={{ paddingLeft: "30px" }}> Register </Link></div>
                </>
          }
        </Nav>
        {
          localStorage.getItem('user-info') ?
            <Nav >
              <div style={{ paddingRight: "50px" }}>
                <NavDropdown title={user && user.email} >
                  <NavDropdown.Item onClick={Profile}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                    </svg> Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                  </svg> Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
            : null
        }
      </Navbar>

    </div>
  )
}