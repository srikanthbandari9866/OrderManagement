import React from 'react';
import Categories from './Categories';
import CatNav from './CatNav';
import Home from './Home';
import ItemMap from './ItemMap';
import Footer from './Footer';
export default function Burger() {
    const cId = 2;
    return (
        <div>
            <Home />
            <CatNav />
            <h1>Burger.....page.</h1>
            <ItemMap catId={cId} />

        </div>
    )
}