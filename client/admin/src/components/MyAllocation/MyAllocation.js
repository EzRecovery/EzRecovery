import React, { Component } from 'react'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Allocation from '../Allocation/Allocation';
import '../MyAllocation/MyAllocationStyle.css'



export default class MyAllocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            field_staff_username: localStorage.getItem('username'),
            allAllocation: [],
            borrowerDetails: [],
            All: '',
            Done: 'none'

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.detailPage = this.detailPage.bind(this);
    }

    async componentDidMount() {
        try {
            const res = await Axios.post(
                'http://localhost:3001/MyAllocation',
                {
                    // method: "POST",
                    data: { field_staff_username: this.state.field_staff_username },
                }
            );
            this.setState({
                allAllocation: res.data.MyAllocation[0],
                borrowerDetails: res.data.MyAllocation[1]
            })
            alert(res.status)
            console.log(res.data['MyAllocation'][1]);
            console.log("only allocation " + this.state.allAllocation)
            console.log("borrowers id " + this.state.borrowerDetails);
        } catch (err) { }



    }

    //validation for number input only

    handleChange(event) {
        const value = event.target.value;

        if (value === "1") {
            console.log(value + "all value")
            this.setState({
                All: '',
                Done: 'none'
            });
        } else if (value === "2") {

            console.log(value + "done value")
            this.setState({
                All: 'none',
                Done: ''
            });
        }



    }
    detailPage(id) {

        console.log(id);
        localStorage.setItem('borrower_id', id);
        this.props.history.push("/app/ticket");
        //  <Redirect push to='/app/import' />
    }

    async handleSubmit(event) {




    }



    render() {
        return (
            <div className="MyAllocation_wrapper">

                <span className="dropdown">
                    <select name="category" onChange={this.handleChange}>
                        <option value="" >select </option>
                        <option value="1">All tickets</option>
                        <option value="2">Done tickets</option>
                        {/* <option value="3">current ticket</option> */}
                    </select>

                </span>
                <p className="MyAllocation" > MY Allocation (tickets)</p>


                {/* <div className="card"> */}
                <div style={{ display: this.state.All }}>
                    {
                        this.state.allAllocation.map(item => {
                            console.log(item.borrower_id, item.field_staff_id)

                            // if (item.category === 1) {
                            return (
                                <div className="All" >
                                    {
                                        this.state.borrowerDetails.map(b => {

                                            if (b.id === item.borrower_id) {
                                                console.log(b.name)
                                                return (

                                                    <div className="cards" onClick={() => this.detailPage(b.id)}>
                                                        <div className="up">
                                                            <p className="left" id="special"> Loan No : {b.id}</p> <p className="right" id="done"> name : {b.name}</p>
                                                        </div>

                                                        <div className="down">
                                                            <p className="right remaining" id="done">{item.category == 1 ? ' remaining' : 'done'}</p>
                                                            <p className="left location"> Location : {b.address}</p>
                                                            <p class="iconify" data-icon="ion-md-cloud-done" data-inline="false"></p>
                                                        </div>
                                                    </div>

                                                )
                                            }

                                        })//inner map

                                    }
                                </div>
                            )
                            // }
                        })//outer map
                    }
                </div>

                <div style={{ display: this.state.Done }}>
                    {
                        this.state.allAllocation.map(item => {
                            console.log(item.borrower_id, item.field_staff_id)

                            if (item.category == 2) {
                                return (
                                    <div className="All" >
                                        {
                                            this.state.borrowerDetails.map(b => {

                                                if (b.id === item.borrower_id) {
                                                    console.log(b.name)
                                                    return (

                                                        <div className="cards" onClick={() => this.detailPage(b.id)}>
                                                            <div className="up">
                                                                <p className="left" id="special"> Loan No : {b.id}</p> <p className="right" id="done"> name : {b.name}</p>
                                                            </div>

                                                            <div className="down">
                                                                <p className="right" id="done">Done</p>
                                                                <p className="left location"> Location : {b.address}</p>
                                                                <p class="iconify" data-icon="ion-md-cloud-done" data-inline="false"></p>
                                                            </div>
                                                        </div>

                                                    )
                                                }

                                            })//inner map

                                        }
                                    </div>
                                )
                            }


                        })//outer map

                    }
                </div>

                {/* </div> */}

                {/* <div className="ALL">
                    <div className="cards">

                        <p className="left">Loan No : 38908</p> <p className="right">name : vishakha bhinde</p>
                        <p className="left">Location : magarpatta pune maharastra</p> <span class="iconify right" data-icon="ion-md-cloud-done" data-inline="false"></span><p className="left">Done</p>
                    </div>
                </div> */}
            </div >

        )
    }
}
