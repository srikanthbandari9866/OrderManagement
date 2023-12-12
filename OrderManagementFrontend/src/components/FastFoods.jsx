import React from 'react';
import Categories from './Categories';
import CatNav from './CatNav';
import Home from './Home';
import ItemMap from './ItemMap';
import Footer from './Footer';
export default function FastFoods() {
    const cId = 4;
    return (
        <div>
            <Home />
            <CatNav />
            <h1>FastFoods.....page.</h1>
            <ItemMap catId={cId} />

        </div>
    )
}