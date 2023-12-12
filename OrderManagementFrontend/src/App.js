import logo from './logo.svg';
import './App.css';
import { Button,Form,Card } from 'react-bootstrap';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import { MDBFooter, MDBContainer, MDBCol,MDBRow,  MDBBtn} from 'mdb-react-ui-kit';
import Categories from './components/Categories';
import Protected from './components/Protected';
import Pizza from './components/Pizza';
import Pastry from './components/Pastry';
import Desserts from './components/Desserts';
import FastFoods from './components/FastFoods';
import Burger from './components/Burger';
import Biryani from './components/Biryani';
import Shawarma from './components/Shawarma';
import Footer from './components/Footer';
import CatNav from './components/CatNav';
import ItemMap from './components/ItemMap';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import PlaceOrder from './components/PlaceOrder';
import OrderDetails from './components/OrderDetails';
import ChangePassword from './components/ChangePassword';
import OrdersList from './components/OrdersList';
import ItemDetails from './components/ItemDetails';


function App() {
  return (
    <div className="App container-fluid" >
      <h2 className="H1"><b><marquee behavior="alternate" width="80%" direction="left" >Food Order Management</marquee></b></h2>
  
      <Router>    
      
      <Routes>
      <Route exact path='/Home' element={<Home/>}/>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/changePassword' element={<ChangePassword/>}/>
      <Route exact path='/cart' element={<Protected Cmp = {Cart} />}/>
      <Route exact path='/categories' element={<Protected Cmp = {Categories} />}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/pizza' element={<Protected Cmp = {Pizza}/>}/>
      <Route exact path='/burger' element={<Protected Cmp = {Burger}/>}/>
      <Route exact path='/pastry' element={<Protected Cmp = {Pastry}/>}/>
      <Route exact path='/desserts' element={<Protected Cmp = {Desserts}/>}/>
      <Route exact path='/biryani' element={<Protected Cmp = {Biryani}/>}/>
      <Route exact path='/shawarma' element={<Protected Cmp = {Shawarma}/>}/>
      <Route exact path='/fastfoods' element={<Protected Cmp = {FastFoods}/>}/>
      <Route exact path='/footer' element={<Protected Cmp = {Footer}/>}/>
      <Route exact path='/catNav' element={<Protected Cmp = {CatNav}/>}/>
      <Route exact path='/itemMap' element={<Protected Cmp = {ItemMap}/>}/>
      <Route exact path='/profile' element={<Protected Cmp = {Profile}/>}/>
      <Route exact path='/editProfile' element={<Protected Cmp = {EditProfile}/>}/>
      <Route exact path='/placeOrder' element={<Protected Cmp = {PlaceOrder}/>}/>
      <Route exact path='/orderDetails' element={<Protected Cmp = {OrderDetails}/>}/>
      <Route exact path='/ordersList' element={<Protected Cmp = {OrdersList}/>}/>
      <Route exact path='/itemDetails' element={<Protected Cmp = {ItemDetails}/>}/>
      </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
