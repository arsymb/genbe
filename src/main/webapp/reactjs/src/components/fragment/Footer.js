import React from 'react';

import { Navbar, Container, Col } from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        const bgColor = {
            backgroundColor: "#955251"
        };

        let fullYear = new Date().getFullYear();
        return (
            <Navbar fixed="bottom" style={bgColor}>
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div className="text-light">{fullYear}-{fullYear + 1} All Rights Reserved by Almighty Java</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}

export default Footer;