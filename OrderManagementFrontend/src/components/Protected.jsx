import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Style.css';
import Home from './Home';

export default function Protected(props) {
    let Cmp = props.Cmp
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login")
        }
    }, [])
    return (
        <div>
            <Cmp />
        </div>
    )
}