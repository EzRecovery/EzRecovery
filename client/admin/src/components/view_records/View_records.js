import React, { Component } from 'react'
import Axios from 'axios';
import '../view_records/Style.css'
import { FaSearch } from 'react-icons/fa';
import Fuse from "fuse.js";

export default class View_records extends Component {

    constructor(props) {
        super(props);
        this.state = {
            records: [],
            data: [],
            temp: true,
            remaining: '',
            allocated: 'none',
            ofs: 'none',
            all: 'none'


        };

        this.display = this.display.bind(this);
        this.searchData = this.searchData.bind(this);
    }

    async componentDidMount() {
        const res = await Axios.get('http://localhost:3001/getAllRecords');
        console.log(res)
        this.setState({
            records: res.data.records,
            data: res.data.records
        });

        console.log("data =", this.state.records)
    }

    display(event) {
        console.log(event.target.innerText)
        if (event.target.innerText === 'Unallocated') {
            this.setState({
                allocated: 'none',
                ofs: 'none',
                remaining: ''
            })
        } else if (event.target.innerText === 'Allocated') {

            this.setState({
                allocated: '',
                ofs: 'none',
                remaining: 'none'
            })
        }
        else {
            this.setState({
                allocated: 'none',
                ofs: '',
                remaining: 'none'
            })
        }
    }

    searchData(pattern) {

        if (!pattern) {
            this.setState({
                data: this.state.records,
                all: 'none',
                remaining: '',
                ofs: 'none',
                allocated: 'none'


            });

            return;
        }

        const fuse = new Fuse(this.state.data, {
            keys: ["id", "name"],
        });

        const result = fuse.search(pattern);
        const matches = [];
        if (!result.length) {
            this.setState({
                data: [],

            });
        } else {
            result.forEach(({ item }) => {
                matches.push(item);
            });
            this.setState({
                data: matches,
                all: '',
                remaining: 'none',
                ofs: 'none',
                allocated: 'none'
            });

        }
    };


    render() {
        return (
            <div className="view_record_wrapper">
                <h1 id="text_align">view records</h1>
                <div class="Row" id="text_align">
                    <div class="Column" onClick={this.display}>Unallocated</div>
                    <div class="Column" onClick={this.display}>Allocated</div>
                    <div class="Column" onClick={this.display}>Out of Service</div>
                </div>
                <div className="Search">
                    <span className="SearchSpan">
                        <FaSearch />
                    </span>
                    <input
                        className="SearchInput"
                        type="text"
                        onChange={(e) => this.searchData(e.target.value)}
                        placeholder="type Loan no or name to search"
                    />
                </div>
                {/*-------------------- for unallocate------------------- */}
                <div style={{ display: this.state.remaining }} >



                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Loan No.</th>
                                <th>Name</th>
                                <th>Bank</th>

                                <th>Address</th>
                                <th>Contact No</th>
                                <th>Debt</th>

                                <th>Charges</th>
                                <th>Status</th>
                                <th>category</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.records.map(borrower => {
                                    if (borrower.category == 1) {

                                        if (this.state.temp == true)
                                            this.setState({
                                                temp: false
                                            })
                                        return (
                                            <tr>
                                                <td>{borrower.id}</td>
                                                <td>{borrower.name}</td>

                                                <td>{borrower.bank_name}</td>
                                                <td>{borrower.address}</td>
                                                <td>{borrower.contact_no}</td>
                                                <td>{borrower.debt_to_clear}</td>
                                                <td>{borrower.debt_to_clear}</td>
                                                <td>{borrower.status}</td>
                                                <td>{borrower.category}</td>


                                            </tr>
                                        )
                                    }
                                })
                            }
                            <b>{this.state.temp ? 'There is no data ' : ''}</b>

                        </tbody>
                    </table>
                </div>
                {/*--------- /*for allocated ------------------- */}

                <div style={{ display: this.state.allocated }} >



                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Loan No.</th>
                                <th>Name</th>
                                <th>Bank</th>

                                <th>Address</th>
                                <th>Contact No</th>
                                <th>Debt</th>

                                <th>Charges</th>
                                <th>Status</th>
                                <th>category</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.records.map(borrower => {
                                    if (borrower.category == 2) {

                                        if (this.state.temp == true)
                                            this.setState({
                                                temp: false
                                            })
                                        return (
                                            <tr>
                                                <td>{borrower.id}</td>
                                                <td>{borrower.name}</td>

                                                <td>{borrower.bank_name}</td>
                                                <td>{borrower.address}</td>
                                                <td>{borrower.contact_no}</td>
                                                <td>{borrower.debt_to_clear}</td>
                                                <td>{borrower.debt_to_clear}</td>
                                                <td>{borrower.status}</td>
                                                <td>{borrower.category}</td>


                                            </tr>
                                        )
                                    }
                                })
                            }
                            <b>{this.state.temp ? 'There is no data ' : ''}</b>

                        </tbody>
                    </table>
                </div>


                {/* for out of service */}



                <div style={{ display: this.state.ofs }} >



                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Loan No.</th>
                                <th>Name</th>
                                <th>Bank</th>

                                <th>Address</th>
                                <th>Contact No</th>
                                <th>Debt</th>

                                <th>Charges</th>
                                <th>Status</th>
                                <th>category</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.records.map(borrower => {
                                    if (borrower.category == 3) {

                                        if (this.state.temp == true)
                                            this.setState({
                                                temp: false
                                            })
                                        return (
                                            <tr>
                                                <td>{borrower.id}</td>
                                                <td>{borrower.name}</td>

                                                <td>{borrower.bank_name}</td>
                                                <td>{borrower.address}</td>
                                                <td>{borrower.contact_no}</td>
                                                <td>{borrower.debt_to_clear}</td>
                                                <td>{borrower.debt_to_clear}</td>
                                                <td>{borrower.status}</td>
                                                <td>{borrower.category}</td>


                                            </tr>
                                        )
                                    }
                                })
                            }
                            <b>{this.state.temp ? 'There is no data ' : ''}</b>

                        </tbody>
                    </table>
                </div>


                {/* for search items  */}
                <div style={{ display: this.state.all }} >



                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Loan No.</th>
                                <th>Name</th>
                                <th>Bank</th>

                                <th>Address</th>
                                <th>Contact No</th>
                                <th>Debt</th>

                                <th>Charges</th>
                                <th>Status</th>
                                <th>category</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.data.map(borrower => {
                                    // if (borrower.category == 3) {

                                    // if (this.state.temp == true)
                                    //     this.setState({
                                    //         temp: false
                                    //     })
                                    return (
                                        <tr>
                                            <td>{borrower.id}</td>
                                            <td>{borrower.name}</td>

                                            <td>{borrower.bank_name}</td>
                                            <td>{borrower.address}</td>
                                            <td>{borrower.contact_no}</td>
                                            <td>{borrower.debt_to_clear}</td>
                                            <td>{borrower.debt_to_clear}</td>
                                            <td>{borrower.status}</td>
                                            <td>{borrower.category}</td>


                                        </tr>
                                    )
                                    // }
                                })
                            }
                            <b>{this.state.temp ? 'There is no data ' : ''}</b>

                        </tbody>
                    </table>
                </div>



                {/* <div >
                    <div className="tbl-content" style={{ display: this.state.all }} >
                        <table cellPadding="0" cellSpacing="0" border="0">
                            {
                                this.state.data.map(borrower => {

                                    return (
                                        <tr>
                                            <td>{borrower.name}</td>

                                        </tr>
                                    )

                                })
                            }
                            <b>{this.state.temp ? 'There is no data ' : ''}</b>
                        </table>
                    </div>
                </div> */}

            </div >

        )
    }
}
