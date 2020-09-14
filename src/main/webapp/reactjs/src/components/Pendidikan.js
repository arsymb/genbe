import React from 'react';

import { Card, Form, Button, br } from 'react-bootstrap';

import axios from 'axios';

class Pendidikan extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.pendidikanChange = this.pendidikanChange.bind(this);
        this.submitPendidikan = this.submitPendidikan.bind(this);
    }

    handleChange = event => {
        this.setState({
            jenjang: event.target.value
        });
    };

    initialState = {
        id: '', jenjang: '', institusi: '', masuk: '', lulus: ''
    }

    resetForm = () => {
        this.setState(() => this.initialState);
    }

    submitPendidikan(event) {
        console.log(this.state.id + ' ' + this.state.jenjang + ' ' + this.state.institusi + ' ' + this.state.masuk + ' ' + this.state.lulus);
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

        axios.post("http://localhost:8080/pendidikan/person/"+this.state.id, pendidikanList)
            .then(response => {
                console.log(response.data);
            });
    }

    pendidikanChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {
        return (
            <>
                <Card className="border border-dark bg-warning text-black">
                    <Card.Header className="text-center" as="h5">FORM PENDIDIKAN</Card.Header>
                    <Form id="formPendidikan" onSubmit={this.submitPendidikan}>
                        <Card.Body>
                            <Form.Group controlId="formGridId">
                                <Form.Label>ID Person:</Form.Label>
                                <Form.Control required autoComplete="off" type="number" name="id" value={this.state.id} onChange={this.pendidikanChange} min="1" placeholder="Masukkan id" />
                            </Form.Group>
                            <Form.Group controlId="formGridJenjang">
                                <Form.Label>Jenjang</Form.Label>
                                <Form.Control required as="select" name="jenjang" onChange={this.handleChange} custom>
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
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="dark" type="submit">Simpan</Button>
                        </Card.Footer>
                    </Form>
                </Card>
                <br />
            </>
        )
    }
}

export default Pendidikan;