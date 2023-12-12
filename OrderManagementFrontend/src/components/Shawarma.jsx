import React from 'react';
import Categories from './Categories';
import CatNav from './CatNav';
import Home from './Home';
import ItemMap from './ItemMap';
import Footer from './Footer';
export default function Shawarma() {
    const cId = 7;
    return (
        <div>
            <Home />
            <CatNav />
            <h1>Shawarma.....page.</h1>
            <ItemMap catId={cId} />

        </div>
    )
}