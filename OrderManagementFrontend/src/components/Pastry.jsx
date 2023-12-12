import React from 'react';
import Categories from './Categories';
import CatNav from './CatNav';
import Home from './Home';
import ItemMap from './ItemMap';
import Footer from './Footer';
export default function Pastry() {
    const cId = 5;
    return (
        <div>
            <Home />
            <CatNav />
            <h1>Pastry.....page.</h1>
            <ItemMap catId={cId} />

        </div>
    )
}