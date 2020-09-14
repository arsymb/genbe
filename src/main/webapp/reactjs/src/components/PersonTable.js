import React from 'react';
import axios from 'axios';

import { Card, Table, br } from 'react-bootstrap';

class PersonTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            biodata: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/person/pendidikan")
            .then(response => response.data)
            .then((data) => {
                this.setState({ biodata: data })
            });
    }

    render() {
        return (
            <>
                <Card className="border border-dark bg-warning text-black">
                    <Card.Header className="text-center" as="h5">Tabel Biodata</Card.Header>
                    <Card.Body>
                        <Table responsive striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>NIK</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>No.HP</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Tempat Lahir</th>
                                    <th>Umur</th>
                                    <th>Jenjang</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.biodata.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="12">Tidak ada data yang tersedia.</td>
                                        </tr> :
                                        this.state.biodata.map((biodata) => (
                                            <tr key={biodata.id}>
                                                <td>{biodata.nik}</td>
                                                <td>{biodata.name}</td>
                                                <td>{biodata.address}</td>
                                                <td>{biodata.hp}</td>
                                                <td>{biodata.tgl}</td>
                                                <td>{biodata.tempatLahir}</td>
                                                <td>{biodata.umur}</td>
                                                <td>{biodata.pendidikan_terakhir}</td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <br />
            </>
        )
    }
}

export default PersonTable;