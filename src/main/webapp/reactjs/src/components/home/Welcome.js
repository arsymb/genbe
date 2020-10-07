import React from 'react';

import { Jumbotron } from 'react-bootstrap';

class Welcome extends React.Component {
    render() {
        const bgColor = {
            backgroundColor: "#955251"
        };

        return (
            <Jumbotron className="text-light" style={bgColor} align="center">
                <h1 className="mb-4">HELLO FOLKS!</h1>
                <blockquote className="blockquote">
                    <p style={{marginBottom: "20px", fontStyle: "italic"}}>“It does not matter how slowly you go as long as you do not stop.”</p>
                    <footer className="blockquote-footer text-light">Confucius</footer>
                </blockquote>
                {/* <p>
                    <Button variant="light">Biodata</Button>{' '}
                    <Button variant="light">Tabel Biodata</Button>{' '}
                    <Button variant="light">Pendidikan</Button>{' '}
                </p> */}
            </Jumbotron>
        )
    }
}

export default Welcome;