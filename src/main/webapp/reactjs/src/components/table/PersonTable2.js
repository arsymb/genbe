import React, { Component, forwardRef } from 'react';
import MaterialTable from 'material-table';
import MUIDataTable from "mui-datatables";
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

export default class PersonTable2 extends Component {
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
                this.setState({ biodata: data });
            });
    }

    deleteBiodata = (biodataIdPerson) => {
        console.log(biodataIdPerson);
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

        const columns = [
            {
                name: "idPerson",
                label: "ID",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "nik",
                label: "NIK",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "name",
                label: "Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "address",
                label: "Alamat",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "hp",
                label: "No.HP",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "tgl",
                label: "Tanggal Lahir",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "tempatLahir",
                label: "Tempat Lahir",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "umur",
                label: "Umur",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "pendidikan_terakhir",
                label: "Jenjang",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "",
                label: "Edit",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return <button>Edit</button>;
                    },
                },
            },
            {
                name: "",
                label: "Delete",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return <button>Delete</button>;
                    },
                },
            },
        ];

        const data = this.state.biodata;
           
        const options = {
            // headerStyle: {
            //     backgroundColor: '#D59E9A',
            //     color: '#FFF',
            //     fontSize: '16px',
            //     fontFamily: 'Vollkorn',
            // },
            // actionsColumnIndex: -1,
            // exportButton: true,
            filterType: 'checkbox',
        };

        // const actions = [
        //     {
        //         icon: () => <Edit />,
        //         tooltip: 'Edit User',
        //         onClick: (event, rowData) => this.setState({
        //             addModalShow: true,
        //             sendId: rowData.id,
        //             sendNik: rowData.nik,
        //             sendName: rowData.name,
        //             sendAddress: rowData.address,
        //             sendHp: rowData.hp,
        //             sendTgl: rowData.tgl,
        //             sendTempat: rowData.tempatLahir
        //         })
        //     },
        //     {
        //         icon: () => <DeleteOutline />,
        //         tooltip: 'Delete User',
        //         onClick: (event, rowData) => this.deleteBiodata(rowData.id)
        //     }
        // ]

        return (
            <div style={{ maxWidth: '100%' }}>
                <h2 style={{ marginTop: "10px", marginBottom: "30px", textAlign: "center", textDecoration: "underline", fontWeight: "bold" }}>TABEL BIODATA</h2>
                <MUIDataTable
                    icons={tableIcons}
                    title=""
                    columns={columns}
                    data={data}
                    options={options}
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
