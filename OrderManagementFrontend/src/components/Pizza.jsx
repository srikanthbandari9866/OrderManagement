import React from 'react';
import Categories from './Categories';
import CatNav from './CatNav';
import Home from './Home';
import ItemMap from './ItemMap';
import Footer from './Footer';
export default function Pizza() {
    const cId = 6;
    return (
        <div>
            <Home />
            <CatNav />
            <h1>Pizza.....page.</h1>
            <ItemMap catId={cId} />

        </div>
    )
}