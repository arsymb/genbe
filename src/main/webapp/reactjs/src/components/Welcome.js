import React from 'react';

import { Jumbotron, Button } from 'react-bootstrap';

class Welcome extends React.Component {
    render() {
        return (
            <Jumbotron className="bg-dark text-white" align="center">
                <h1 className="mb-4">Selamat Datang di Prodemy Data Center</h1>
                <p>
                    Web ini merupakan terapan dari materi front-end dan lanjutan ujian back-end "genbe".
                    Web ini menyediakan service untuk mengisi, menambah, dan menampilkan biodata individu,
                    beserta riwayat pendidikannya.
                </p>
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