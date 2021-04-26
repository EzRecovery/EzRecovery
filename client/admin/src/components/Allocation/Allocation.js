import React, { Component } from 'react'
import Axios from 'axios';
import '../Allocation/AllocationStyle.css'



export default class Allocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remainingRecords: '',
            availableEmp: [],
            todatAllocated: '',
            perFieldStaff: ''

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const res = await Axios.get('http://localhost:3001/getAllocationDetails');
        console.log(res.data['AllocationDetails'][1])
        this.setState({
            availableEmp: res.data['AllocationDetails'][0],
            remainingRecords: res.data['AllocationDetails'][1]['count'],
            todatAllocated: res.data['AllocationDetails'][2]['count']
        });


    }

    //validation for number input only

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {


        try {
            if (this.state.perFieldStaff === "")
                alert("please enter number first");
            else if (isNaN(this.state.perFieldStaff)) {

                alert("please enter valid number");
            }
            else if (this.state.remainingRecords < (this.state.perFieldStaff * this.state.availableEmp.length)) {
                console.log("ff")
                alert("sorry, please enter lesser value !! ");

            }
            else {
                const res = await Axios.post(
                    'http://localhost:3001/xyz',
                    {
                        // method: "POST",
                        data: { perFieldStaff: this.state.perFieldStaff, availableEmp: this.state.availableEmp },
                    }
                );
                alert("Allocation Successfull !!")
            }

        } catch (err) { }

    }



    render() {
        return (
            <div className="Allocation_wrapper">
                <h1 id="text_align" >Allocation of Records (tickets)</h1>


                <div className="leftSide">

                    <h2 className="headingElement">Total Not Allocated Records = {this.state.remainingRecords}</h2>
                    <h2 className="headingElement">Records Allocated Today = {this.state.todatAllocated}</h2>

                    <div className="headingElement" id="textAndLabel">
                        <h2 id="allocationLabel">Per Field Staff Allocation</h2> <input className="allocationInput" type="text" name="perFieldStaff" placeholder="enter number" required value={this.state.perFieldStaff} onChange={this.handleChange}></input>

                    </div>
                    <button type="submit" onClick={this.handleSubmit}>Allocate</button>
                </div>

                <div className="AvailableEmployee"  >
                    <h2>All Available Employee</h2>
                    <div className="remaining" >



                        <table class="styled-table1">

                            <tbody>

                                {
                                    this.state.availableEmp.map(item => {
                                        return (
                                            <tr>
                                                {/* <td>{item.id}</td> */}
                                                <td>{item.name}</td>
                                            </tr>
                                        )

                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div >
            </div >

        )
    }
}
