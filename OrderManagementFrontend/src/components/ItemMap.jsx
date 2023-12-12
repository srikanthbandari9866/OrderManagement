import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import CatNav from './CatNav';
import './Style.css';
import Home from './Home';
// import ItemMap from './ItemMap';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
export default function ItemMap(props) {

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    const catId = props.catId
    const [itemData, setItemData] = useState('');
    const [count, setCount] = useState(0);
 
    const userId = user.userId;
    // const [itemName,setItemName] = useState();
    // const [price,setPrice] = useState();
    // useEffect(() => {
    //    async  function callApi(){
    //             let res = await axios.get(`https://localhost:44307/api/Items`)
    //             setItemData(res.data)

    //     }
    //     callApi()
    // },[itemData])
    useEffect(() => {
        async function callApi() {
            const res = await axios.get(`https://localhost:44307/api/Items/Category/${catId}`)
            setItemData(res.data)
        }
        callApi()
        // console.log(itemData)
    }, [itemData])

    function Addcart(itemId,itemName,price,imagePath,quantity){
        // alert(itemId+' ' + itemName+ ' ' +quantity)
        const res = axios.get(`https://localhost:44307/api/Items/${itemId}`)
        // setItemName(res.data.itemName);
        // setPrice(res.data.price);
        
        const cartData = {itemId,userId,itemName,price,quantity,imagePath}
        const result = axios.post(`https://localhost:44307/api/Carts`,cartData)
        .then(response => {
            alert("Succesfully added to cart!" + cartData);
        })
    }
    function PlaceOrders(itemId){
        navigate("/placeOrder", {
            state:{
                itemId:itemId
            }
        });
    }
    function AddTemp(itemId,itemName,price,imagePath,quantity){
        // alert(itemId+' ' + itemName+ ' ' +quantity)
        const res = axios.get(`https://localhost:44307/api/Items/${itemId}`)
        // setItemName(res.data.itemName);
        // setPrice(res.data.price);
        
        const cartData = {itemId,userId,itemName,price,quantity,imagePath}
        const result = axios.post(`https://localhost:44307/api/TempItems`,cartData)
        .then(response => {
            alert("Succesfully added to cart!" + cartData);
        })
    }

    return (
        <>
            {/* <Home />
            <CatNav /> */}
            <div>
                {/* <h1>Biryani....page.</h1> */}
                <div className='cards'>
                <Row>
                    {
                        itemData &&
                        (itemData).map((item) => {
                            return (
                                <Col md={6} lg={4} key={item.itemId}>
                                {/* xs={12} md={6} lg={3} key={item.itemId} */}
                                    <Card style={{ width: '20rem',marginTop:"30px", padding:"20px" }} >
                                        <Card.Img variant="top" src={item.imagePath} />
                                        <Card.Body>
                                            <Card.Title>{item.itemName}</Card.Title>
                                            <Card.Text>
                                                Order the Tasty food and enjoy!
                                            </Card.Text>
                                            <p><b>Available quantity : </b> {item.quantity}</p>
                                            <h4><b style={{color:"green"}}>Price : </b> <i>{item.price}</i></h4>
                                            <h5><b style={{color:"blue"}}>Discount : </b> <i>25%</i></h5>
                                            <Button variant="primary" onClick={() => PlaceOrders(item.itemId)} >Place Order</Button>
                                            <Button variant="warning" style={{marginLeft:"5px" }} onClick={() => Addcart(item.itemId,item.itemName,item.price,item.imagePath,item.quantity)} >Add to Cart</Button>
                                            <Button variant="success" style={{marginTop:"5px" }} onClick={() => AddTemp(item.itemId,item.itemName,item.price,item.imagePath,item.quantity)} >Add to Order List</Button>
                                                
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
                </div>
                {/* <Row>
                    {itemData &&
                        (itemData).map(product => (
                            <ItemMap key={product.itemId} product={product} />
                        ))}
                </Row> */}
            </div>
            <Footer/>
        </>
    )
}








// import React from 'react';
// import './Style.css';
// import { Button, Card } from 'react-bootstrap'
// import Col from 'react-bootstrap/Col';


// const ItemMap = ({ product }) => (


   
//         <Col xs={12} md={6} lg={5} key={product.itemId} style={{marginLeft:"200px"}}>
//             {/* xs={12} md={6} lg={5} key={product.itemId} */}
//             <Card style={{ width: '25rem' }}>
//                 <Card.Header></Card.Header>
//                 <Card.Img variant="top" src={product.imagePath} />
//                 <Card.Body>
//                     <Card.Title>Card Title</Card.Title>
//                     <Card.Text>
//                         {product.itemName}
//                     </Card.Text>
//                     <Button variant="primary">Add to cart</Button>
//                     <Button>Add to favs</Button>
//                 </Card.Body>
//             </Card>
//         </Col>
   
// )

// export default ItemMap;