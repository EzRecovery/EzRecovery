import { logDOM } from '@testing-library/dom'
import React, { Component } from 'react'
import '../login/Login.css'
import logo from "../../../src/assets/logo.png"
class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employee_id: '',
            pass: '',
            redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const result = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state)
        });
        const data = await result.json();
        if (data.success) {
            this.props.setEmpname(data.name);
            this.props.setEmpid(this.state.employee_id);
            localStorage.setItem('emp_id', this.state.employee_id);
            localStorage.setItem('emp_name', data.name);
            this.setState({ redirect: true });
        }
        else
            alert(data.message);
    }

    render() {

        return (

            <div className="wrapper">

                <div className="login-header">
                    <span className="heading">EzRecovery</span>
                    <span className="logo"><img src={logo}></img></span>

                </div>

                <div className="horizontal-line">
                    <hr></hr>
                </div>
                <div className="hero_text">

                    <h1> EzRecovery </h1>
                    <p> Email inboxes are overflowing. Everyone gets so many email updates, notifications, and special offers that it can be hard to get customers to open yours—no matter how important they are. Gartner reports that the average open rate for emails is only about 20%. But do you know what people open 98% of the time? SMS or text messages.     </p>
                </div>
                <div className="Login-form">
                    <div className="sign-in">
                        <h3>Sign In</h3>
                    </div>
                    <div>
                        <form action="#" className="login">
                            {/* <div class="field"> */}
                            <input type="text" placeholder="Username" required />
                            {/* </div> */}
                            <div className="field">
                                <input type="password" placeholder="Password" required />
                            </div>

                            <div className="signin_btn">

                                <button className="ghost" id="signIn">Sign In</button>

                            </div>
                        </form>
                    </div>

                </div>



            </div>


        )
    }


}

export default Login
