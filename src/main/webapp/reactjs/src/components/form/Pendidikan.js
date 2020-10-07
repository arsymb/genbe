import React, { Component } from 'react';

import { IoIosSave } from 'react-icons/io';
import { Card, Form, Button } from 'react-bootstrap';

import axios from 'axios';

export default class Pendidikan extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.pendidikanChange = this.pendidikanChange.bind(this);
        this.submitPendidikan = this.submitPendidikan.bind(this);
    }

    initialState = {
        id: '', jenjang: '', institusi: '', masuk: '', lulus: ''
    }

    submitPendidikan(event) {
        event.preventDefault();

        const pendidikan = {
            jenjang: this.state.jenjang,
            institusi: this.state.institusi,
            masuk: this.state.masuk,
            lulus: this.state.lulus
        };

        const pendidikanList = [];
        pendidikanList.push(pendidikan);
        console.log(pendidikanList);

        axios.post("http://localhost:8080/pendidikan/person/" + this.state.id, pendidikanList)
            .then(response => {
                console.log(response.data);
            });
        this.setState(this.initialState);
    }

    pendidikanChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    resetPendidikan = () => {
        this.setState(() => this.initialState);
    }

    render() {
        return (
            <>
                <Card className="bg-light text-black" style={{ borderRadius: "20px" }}>
                    {/* <Card.Header className="text-center" as="h5">FORM PENDIDIKAN</Card.Header> */}
                    <h2 style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center", textDecoration: "underline", fontWeight: "bold" }}>FORM PENDIDIKAN</h2>
                    <Form id="formPendidikan" onSubmit={this.submitPendidikan}>
                        <Card.Body>
                            <Form.Group controlId="formGridId">
                                <Form.Label>ID Person:</Form.Label>
                                <Form.Control required autoComplete="off" type="number" name="id" value={this.state.id} onChange={this.pendidikanChange} min="1" placeholder="Masukkan id" />
                            </Form.Group>
                            <Form.Group controlId="formGridJenjang">
                                <Form.Label>Jenjang</Form.Label>
                                <Form.Control required as="select" name="jenjang" value={this.state.jenjang} onChange={this.pendidikanChange} custom>
                                    <option value="">Pilih...</option>
                                    <option value="sd">SD</option>
                                    <option value="smp">SMP</option>
                                    <option value="sma">SMA</option>
                                    <option value="s1">S1</option>
                                    <option value="s2">S2</option>
                                    <option value="s3">S3</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formGridInstitusi">
                                <Form.Label>Intitusi:</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="institusi" value={this.state.institusi} onChange={this.pendidikanChange} placeholder="Masukkan nama institusi" />
                            </Form.Group>
                            <Form.Group controlId="formGridMasuk">
                                <Form.Label>Tahun Masuk:</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="masuk" value={this.state.masuk} onChange={this.pendidikanChange} placeholder="Masukkan tahun masuk" />
                            </Form.Group>
                            <Form.Group controlId="formGridLulus">
                                <Form.Label>Tahun Lulus:</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="lulus" onChange={this.pendidikanChange} placeholder="Masukkan tahun lulus" />
                            </Form.Group>
                            <div style={{ textAlign: "center" }}>
                                <Button size="lg" style={{ backgroundColor: "#31251C", border: "none", borderRadius: "20px" }} type="submit"><IoIosSave />Simpan</Button>
                            </div>
                        </Card.Body>
                    </Form>
                </Card>
            </>
        )
    }
}