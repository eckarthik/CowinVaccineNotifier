import React from 'react';
import {Navbar} from 'react-bootstrap';

const Header = (props) => {
    return (
        <>
            <Navbar bg="light">
                <Navbar.Brand><i className="fas fa-syringe" style={{color:"#2e86de",fontSize:"20px"}}></i><span style={{color:"#2e86de"}}>Cowin Shot Notifier</span></Navbar.Brand>
            </Navbar>
            <br />
        </>
    )
};

export default Header;