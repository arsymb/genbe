import React, { Component } from 'react';
import { Modal, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaCalendarAlt, FaRegWindowClose } from 'react-icons/fa';
import { IoIosSave } from 'react-icons/io';
import Swal from 'sweetalert2';
import '../../assets/Form.css';

export default class PersonEdit extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        console.log(this.props);
    }

    initialState = {
        idPerson: '', status: '', message: '', nik: '', name: '', address: '', hp: '', tgl: '', tempatLahir: ''
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

    updateBiodata = (event) => {
        event.preventDefault();

        const biodata = {
            idPerson: event.target.idPerson.value,
            nik: event.target.nik.value,
            name: event.target.name.value,
            address: event.target.address.value,
            hp: event.target.hp.value,
            tgl: event.target.tgl.value,
            tempatLahir: event.target.tempatLahir.value
        };

        console.log(biodata);

        axios.put("http://localhost:8080/person/" + biodata.idPerson, biodata)
            .then(response => {
                if (response.data != null) {
                    // console.log(response.data);
                    // console.log(response.data.status, response.data.message);
                    this.handleClick(response.data.status, response.data.message);
                }
            });
    }

    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="form-header-modal" id="contained-modal-title-vcenter">
                            UPDATE BIODATA
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="formBiodata" onSubmit={this.updateBiodata}>
                            <Row>
                                <Col>
                                    <Form.Control name="idPerson" value={this.props.id} hidden />
                                    <Form.Group controlId="formGridNik">
                                        <Form.Label>NIK:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="nik" defaultValue={this.props.nik} placeholder="Masukkan nomor NIK" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridName">
                                        <Form.Label>Nama:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="name" defaultValue={this.props.name} placeholder="Masukkan nama" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridAddress">
                                        <Form.Label>Alamat:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="address" defaultValue={this.props.address} placeholder="Masukkan alamat" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formGridHp">
                                        <Form.Label>HP:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="hp" defaultValue={this.props.hp} placeholder="Masukkan nomor HP" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridTgl">
                                        <Form.Label>Tanggal Lahir:</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FaCalendarAlt />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="date" name="tgl" defaultValue={this.props.tgl} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGridTempatLahir">
                                        <Form.Label>Tempat Lahir:</Form.Label>
                                        <Form.Control required style={{ fontSize: "20px" }} autoComplete="off" type="text" name="tempatLahir" defaultValue={this.props.tempat} placeholder="Masukkan tempat lahir" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row style={{ textAlign: "center" }}>
                                <Col>
                                    <Button className="btn-save" size="lg" type="submit" onClick={this.props.onHide}><IoIosSave />Update</Button>{' '}
                                </Col>
                                <Col>
                                    <Button className="btn-table" size="lg" onClick={this.props.onHide}><FaRegWindowClose /> Close</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}