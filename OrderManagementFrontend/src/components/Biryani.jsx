import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import CatNav from './CatNav';
import './Style.css';
import Home from './Home';
import ItemMap from './ItemMap';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Footer from './Footer';
export default function Biryani() {

    const cId = 1;
    // const [itemData, setItemData] = useState('');
    // const [cat, setCat] = useState('');
    // // useEffect(() => {
    // //    async  function callApi(){
    // //             let res = await axios.get(`https://localhost:44307/api/Items`)
    // //             setItemData(res.data)

    // //     }
    // //     callApi()
    // // },[itemData])
    // useEffect(() => {
    //     async function callApi() {
    //         const res = await axios.get('https://localhost:44307/api/Items')
    //         setItemData(res.data)
    //     }
    //     callApi()
    //     // console.log(itemData)
    // }, [itemData])

    return (
        <>
            <Home />
            <CatNav />
            <h1>Biryani... Page...</h1>
            <ItemMap catId={cId} />

        </>
    )
}