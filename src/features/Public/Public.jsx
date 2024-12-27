import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbars/Navbar';
import { faContactBook, faHomeAlt, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

export default function Public() {

    const navbarItems = [
        {
            title: "Home",
            path: "/",
            Icon: faHomeAlt,
        },
        {
            title: "About Us",
            path: "/about-us",
            Icon: faPeopleGroup,
        }
    ];

    const additionalItem = [
        {
            title: "Contact Us",
            Icon: faContactBook,
            onClik: ()=> {}
        },
    ];

    return <div>
        <Navbar navbarItems={navbarItems} additionalItems={additionalItem}/>
        <Outlet/>
    </div>;
}