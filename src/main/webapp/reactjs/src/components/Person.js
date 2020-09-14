import React from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { FaCalendarAlt } from 'react-icons/fa';
import { Card, Form, InputGroup, Button, br } from 'react-bootstrap';

import axios from 'axios';

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.biodataChange = this.biodataChange.bind(this);
        this.submitBiodata = this.submitBiodata.bind(this);
    }

    handleChange = date => {
        this.setState({
            tgl: date
        });
    };

    initialState = {
        nik: '', name: '', address: '', hp: '', tgl: new Date(), tempatLahir: ''
    }

    resetForm = () => {
        this.setState(() => this.initialState);
    }

    submitBiodata(event) {
        console.log(this.state.nik + ' ' + this.state.name + ' ' + this.state.address + ' ' + this.state.hp + ' ' + this.state.tgl + ' ' + this.state.tempatLahir);
        event.preventDefault();

        const biodata = {
            nik: this.state.nik,
            name: this.state.name,
            address: this.state.address,
            hp: this.state.hp,
            tgl: this.state.tgl,
            tempatLahir: this.state.tempatLahir
        };

        axios.post("http://localhost:8080/person", biodata)
            .then(response => {
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("Data dengan nik " + biodata.nik + " berhasil disimpan.");
                }
            });

    }

    biodataChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {
        return (
            <>
                <Card className="border border-dark bg-warning text-black">
                    <Card.Header className="text-center" as="h5">FORM BIODATA</Card.Header>
                    <Form id="formBiodata" onSubmit={this.submitBiodata}>
                        <Card.Body>
                            <Form.Group controlId="formGridNik">
                                <Form.Label>NIK:</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="nik" value={this.state.nik} onChange={this.biodataChange} placeholder="Masukkan nomor NIK" />
                            </Form.Group>
                            <Form.Group controlId="formGridName">
                                <Form.Label>Nama:</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="name" value={this.state.name} onChange={this.biodataChange} placeholder="Masukkan nama" />
                            </Form.Group>
                            <Form.Group controlId="formGridAddress">
                                <Form.Label>Alamat:</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="address" value={this.state.address} onChange={this.biodataChange} placeholder="Masukkan alamat" />
                            </Form.Group>
                            <Form.Group controlId="formGridHp">
                                <Form.Label>HP:</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="hp" value={this.state.hp} onChange={this.biodataChange} placeholder="Masukkan nomor HP" />
                            </Form.Group>
                            <Form.Group controlId="formGridTgl">
                                <Form.Label>Tanggal lahir:</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FaCalendarAlt />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <DatePicker name="tgl" selected={this.state.tgl} onChange={this.handleChange} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="formGridTempatLahir">
                                <Form.Label>Tempat Lahir:</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="tempatLahir" onChange={this.biodataChange} placeholder="Masukkan tempat lahir" />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="dark" type="submit">Simpan</Button>
                        </Card.Footer>
                    </Form>
                </Card>
                <br />
            </>
        )
    }
}

export default Person;