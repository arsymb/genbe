import React, { Component } from 'react';
import axios from 'axios';
import MyToast from './MyToast';

import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import EditModals from './EditModals';

export default class PersonTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            biodata: [],
            currentPage: 1,
            rowsPerPage: 5,
            rowsPerPageOption: [5, 10, 15, 20],
            addModalShow: false
        };
    }

    componentDidUpdate() {
        fetch("http://localhost:8080/person/data")
            .then(response => response.json())
            .then(data => {
                this.setState({ biodata: data });
            });
    }

    componentDidMount() {
        this.findAllBiodata();
    }

    findAllBiodata() {
        axios.get("http://localhost:8080/person/data")
            .then(response => response.data)
            .then((data) => {
                this.setState({ biodata: data });
            });
    }

    deleteBiodata = (biodataIdPerson) => {
        axios.delete("http://localhost:8080/person/" + biodataIdPerson)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        "show": true,
                        status: response.data.status,
                        message: response.data.message
                    });
                    setTimeout(() => this.setState({ "show": true }), 3000);
                    this.setState({
                        biodata: this.state.biodata.filter(biodata => biodata.idPerson !== biodataIdPerson)
                    });
                } else {
                    this.setState({ "show": false });
                }
            });
    }

    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        const { sendId, sendNik, sendName, sendAddress, sendHp, sendTgl, sendTempat } = this.state;
        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={this.state.status + ': ' + this.state.message} type={"danger"} />
                </div>
                <h2 style={{ marginTop: "10px", marginBottom: "30px", textAlign: "center", textDecoration: "underline", fontWeight: "bold" }}>TABEL BIODATA</h2>
                {/* <Card>
                    <Card.Header className="text-center bg-warning text-black" as="h5">Tabel Biodata</Card.Header>
                    <Card.Body> */}
                <Table className="bg-light" responsive striped hover style={{ textAlign: "center" }}>
                    <thead style={{ fontSize: "20px" }}>
                        <tr style={{ backgroundColor: "#D59E9A" }}>
                            <th style={{ borderTop: "none" }}>NIK</th>
                            <th style={{ borderTop: "none" }}>Nama</th>
                            <th style={{ borderTop: "none" }}>Alamat</th>
                            <th style={{ borderTop: "none" }}>No.HP</th>
                            <th style={{ borderTop: "none" }}>Tanggal Lahir</th>
                            <th style={{ borderTop: "none" }}>Tempat Lahir</th>
                            <th style={{ borderTop: "none" }}>Umur</th>
                            <th style={{ borderTop: "none" }}>Jenjang</th>
                            <th style={{ borderTop: "none" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: "19px" }}>
                        {
                            this.state.biodata.length === 0 ?
                                <tr align="center">
                                    <td colSpan="12">Tidak ada data yang tersedia.</td>
                                </tr> :
                                this.state.biodata.map((data) => (
                                    <tr key={data.idPerson}>
                                        <td>{data.nik}</td>
                                        <td>{data.name}</td>
                                        <td>{data.address}</td>
                                        <td>{data.hp}</td>
                                        <td>{data.tgl}</td>
                                        <td>{data.tempatLahir}</td>
                                        <td>{data.umur}</td>
                                        <td>{data.pendidikan_terakhir}</td>
                                        <td>
                                            {/* <Link to={"edit/" + data.idPerson} className="btn btn-sm" style={{ borderColor: "#31251C" }}><FaEdit /></Link>{' '} */}
                                            <ButtonToolbar>
                                                <Button size="sm" variant="outline-dark"
                                                    onClick={() => this.setState({
                                                        addModalShow: true,
                                                        sendId: data.idPerson,
                                                        sendNik: data.nik,
                                                        sendName: data.name,
                                                        sendAddress: data.address,
                                                        sendHp: data.hp,
                                                        sendTgl: data.tgl,
                                                        sendTempat: data.tempatLahir
                                                    })}><FaEdit />
                                                </Button>
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteBiodata.bind(this, data.idPerson)}><FaTrashAlt /></Button>
                                            </ButtonToolbar>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
                <PersonEdit
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    id={sendId}
                    nik={sendNik}
                    name={sendName}
                    address={sendAddress}
                    hp={sendHp}
                    tgl={sendTgl}
                    tempat={sendTempat} />
                {/* </Card.Body>
                </Card> */}
            </div>
        )
    }
}