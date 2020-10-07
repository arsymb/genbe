import React, { Component, forwardRef } from 'react';
import MaterialTable from 'material-table';
// import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
// import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import PersonEdit from '../modals/PersonEdit';

export default class PersonTable3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            biodata: [],
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
                console.log(data);
                this.setState({ biodata: data });
            });
    }

    deleteBiodata = (biodataIdPerson) => {
        // console.log(biodataIdPerson);
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
        const tableIcons = {
            // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            // Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };
        return (
            <div style={{ maxWidth: '100%' }}>
                <h2 style={{ marginTop: "10px", marginBottom: "30px", textAlign: "center", textDecoration: "underline", fontWeight: "bold" }}>TABEL BIODATA</h2>
                <MaterialTable
                    icons={tableIcons}
                    title=""
                    columns={[
                        {
                            title: 'ID',
                            field: 'id',
                            type: 'numeric',
                        },
                        {
                            title: 'NIK',
                            field: 'nik',
                        },
                        {
                            title: 'Nama',
                            field: 'name',
                        },
                        {
                            title: 'Alamat',
                            field: 'address',
                        },
                        {
                            title: 'No.HP',
                            field: 'hp',
                        },
                        {
                            title: 'Tanggal Lahir',
                            field: 'tgl',
                            type: 'date',
                        },
                        {
                            title: 'Tempat Lahir',
                            field: 'tempatLahir',
                        },
                        {
                            title: 'Umur',
                            field: 'umur',
                            type: 'numeric',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                        {
                            title: 'Jenjang',
                            field: 'jenjang',
                            cellStyle: {
                                textAlign: 'center',
                            },
                        },
                    ]}
                    data={this.state.biodata.map((biodata) => (
                        {
                            id: biodata.idPerson,
                            nik: biodata.nik,
                            name: biodata.name,
                            address: biodata.address,
                            hp: biodata.hp,
                            tgl: biodata.tgl,
                            tempatLahir: biodata.tempatLahir,
                            umur: biodata.umur,
                            jenjang: biodata.pendidikan_terakhir
                        }
                    ))}
                    actions={[
                        {
                            icon: () => <Edit />,
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => this.setState({
                                addModalShow: true,
                                sendId: rowData.id,
                                sendNik: rowData.nik,
                                sendName: rowData.name,
                                sendAddress: rowData.address,
                                sendHp: rowData.hp,
                                sendTgl: rowData.tgl,
                                sendTempat: rowData.tempatLahir
                            })
                        },
                        {
                            icon: () => <DeleteOutline />,
                            tooltip: 'Delete User',
                            onClick: (event, rowData) => this.deleteBiodata(rowData.id)
                        }
                    ]}
                    options={{
                        headerStyle: {
                            backgroundColor: '#D59E9A',
                            color: '#FFF',
                            fontSize: '16px',
                            fontFamily: 'Vollkorn',
                            textAlign: 'center',
                        },
                        textAlign: 'center',
                        actionsColumnIndex: -1,
                        exportButton: true,
                        sorting: true,
                        // selection: true
                    }}
                />
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
            </div>
        )
    }
}
