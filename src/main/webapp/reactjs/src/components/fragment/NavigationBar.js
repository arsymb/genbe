import React from 'react';

import { FaDatabase } from 'react-icons/fa';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component{
    render(){
        const bgColor = {
            backgroundColor: "#955251"
        };

        return (
            <Navbar style={bgColor}>
                <FaDatabase/><Link to={""} className="navbar-brand">Prodemy</Link>
                <Nav className="mr-auto">
                    <Link to={"biodata"} className="nav-link text-light">Form Biodata</Link>
                    <Link to={"data"} className="nav-link text-light">Tabel Biodata</Link>
                    <Link to={"pendidikan"} className="nav-link text-light">Form Pendidikan</Link>
                    {/* <Link to={"edit"} className="nav-link text-light">Try EditModals</Link> */}
                </Nav>
            </Navbar>
        )
    }
}

export default NavigationBar;