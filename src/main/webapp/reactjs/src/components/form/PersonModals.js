import React, { Component } from 'react';
import { Card, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaCalendarAlt, FaTable } from 'react-icons/fa';
import { IoIosSave } from 'react-icons/io';
// import Swal from 'sweetalert2';
import '../../assets/Form.css';

export default class PersonModals extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    handleClick = (status, message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (status === 'true') {
            Toast.fire({
                icon: 'success',
                title: 'status: ' + status + '\nmessage: ' + message + ''
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'status: ' + status + '\nmessage: ' + message + ''
            })
        }
    }

    initialState = {
        nik: '', name: '', address: '', hp: '', tgl: '', tempatLahir: '', status: '', message: ''
    }

    biodataChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitBiodata = (event) => {
        event.preventDefault();

        const biodata = {
            nik: this.state.nik,
            name: this.state.name,
            address: this.state.address,
            hp: this.state.hp,
            tgl: this.state.tgl,
            tempatLahir: this.state.tempatLahir
        };

        // console.log(biodata);

        axios.post("http://localhost:8080/person", biodata)
            .then(response => {
                if (response.data != null) {
                    // console.log(response.data);
                    // console.log(response.data.status, response.data.message);
                    this.handleClick(response.data.status, response.data.message);
                }
            });
        this.setState(this.initialState);
    }

    tableBiodata = () => {
        return this.props.history.push("/data");
    };

    render() {
        return (
            <div>
                <Card className="card-light">
                    <h2 className="form-header">FORM BIODATA</h2>
                    <Form id="formBiodata" onSubmit={this.submitBiodata}>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formGridNik">
                                        <Form.Label>NIK:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="nik" value={this.state.nik} onChange={this.biodataChange} placeholder="Masukkan nomor NIK" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridName">
                                        <Form.Label>Nama:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="name" value={this.state.name} onChange={this.biodataChange} placeholder="Masukkan nama" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridAddress">
                                        <Form.Label>Alamat:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="address" value={this.state.address} onChange={this.biodataChange} placeholder="Masukkan alamat" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formGridHp">
                                        <Form.Label>HP:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="hp" value={this.state.hp} onChange={this.biodataChange} placeholder="Masukkan nomor HP" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridTgl">
                                        <Form.Label>Tanggal Lahir:</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FaCalendarAlt />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="date" name="tgl" value={this.state.tgl} onChange={this.biodataChange} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGridTempatLahir">
                                        <Form.Label>Tempat Lahir:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="tempatLahir" value={this.state.tempatLahir} onChange={this.biodataChange} placeholder="Masukkan tempat lahir" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row style={{ textAlign: "center" }}>
                                <Col>
                                    <Button className="btn-save" size="lg" type="submit"><IoIosSave />Simpan</Button>{' '}
                                </Col>
                                <Col>
                                    <Button className="btn-table" size="lg" type="button" onClick={this.tableBiodata}><FaTable /> Tabel Biodata</Button>
                                </Col>
                            </Row>
                        </Card.Body>

                    </Form>
                </Card>
            </div>
        )
    }
}