import React from 'react';
import Categories from './Categories';
import CatNav from './CatNav';
import Home from './Home';
import ItemMap from './ItemMap';
import Footer from './Footer';
export default function Desserts() {
    const cId = 3;

    return (
        <div>
            <Home />
            <CatNav />
            <h1>Desserts.....page.</h1>
            <ItemMap catId={cId} />

        </div>
    )
}