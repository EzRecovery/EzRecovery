import React, { Component } from 'react'
import Axios from 'axios';

import '../Ticket/TicketStyle.css'



export default class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Borrower_data: [],
            status: '',
            special_note: ''

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    async componentDidMount() {
        var id = localStorage.getItem('borrower_id');

        try {
            const res = await Axios.post(
                'http://localhost:3001/getBorrowerById',
                {
                    // method: "POST",
                    data: { Borrower_id: id },
                }
            );
            this.setState({
                Borrower_data: res.data.Borrower_data

            })

        } catch (err) { }

        console.log(this.state.Borrower_data)


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


        if (this.state.special_note === "" || this.state.status === "") {
            alert("fill the information first and then submit");

        } else {
            try {
                console.log(this.state.status)
                console.log(this.state.special_note)
                const res = await Axios.post(
                    'http://localhost:3001/updateStatus',
                    {

                        data: { Borrower_id: localStorage.getItem('borrower_id'), status: this.state.status, special_note: this.state.special_note },
                    }
                );
                alert(res.status)

            } catch (err) { }
        }


    }



    render() {
        return (
            <div className="Ticket_wrapper">
                <p className="psize">Particular Ticket</p>

                <div className="ticketdropdown">
                    <div id="one">
                        status : <select name="status" required onChange={this.handleChange} >
                            <option value="">None</option>
                            <option value="Paid">Paid</option>
                            <option value="ptp">Promise to Pay</option>
                            <option value="notAvailable">not Available</option>
                        </select>
                    </div>
                    <br></br>
                    <div id="on">
                        special note : <input type="textfield" name="special_note" required onChange={this.handleChange}></input>
                    </div>
                </div>


                {this.state.Borrower_data.map(item => {

                    return (
                        <div className="borrower_container">
                            <p className="borrowerdetails">Loan No : {item.id}</p>
                            <p className="borrowerdetails">Name : {item.name}</p>
                            <p className="borrowerdetails">Address : {item.address}</p>
                            <p className="borrowerdetails">Contact No. : {item.contact_no}</p>
                            <p className="borrowerdetails">Alternate No.: {item.contact_no_1}</p>
                            <p className="borrowerdetails">Bank Name :  {item.bank_name}</p>
                            <p className="borrowerdetails">Current Status:  {item.status}</p>
                            <p className="borrowerdetails">Debt money :  {item.debt_to_clear}</p>

                            <p className="borrowerdetails">total : {item.debt_to_clear}</p>
                            {/* <p>{item.}</p> */}

                        </div>

                    )

                }

                )}
                <hr className="HR"></hr>

                <div className="resonsive-ticketdropdown  ">

                    <span>  status : <select name="status" required onChange={this.handleChange} >
                        <option value="">None</option>
                        <option value="Paid">Paid</option>
                        <option value="ptp">Promise to Pay</option>
                        <option value="notAvailable">not Available</option>
                    </select>
                    </span>
                    <br></br>
                    <span className="special_note">
                        special note : <input type="textfield" name="special_note" required onChange={this.handleChange}></input>
                    </span>
                </div>


                <button className="ticketbutton" type="submit" onClick={this.handleSubmit}>Done</button>


            </div >
        )


    }
}
