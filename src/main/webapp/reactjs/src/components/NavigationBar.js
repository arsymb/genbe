import React from 'react';

import { FaDatabase } from 'react-icons/fa';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component{
    render(){
        return (
            <Navbar className="m" fixed="top" bg="dark" variant="dark">
                <FaDatabase/><Link to={""} className="navbar-brand">Prodemy</Link>
                <Nav className="mr-auto">
                    <Link to={"biodata"} className="nav-link">Form Biodata</Link>
                    <Link to={"data"} className="nav-link">Tabel Biodata</Link>
                    <Link to={"pendidikan"} className="nav-link">Form Pendidikan</Link>
                </Nav>
            </Navbar>
        )
    }
}

export default NavigationBar;