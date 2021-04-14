import { logDOM } from '@testing-library/dom'
import React, { Component } from 'react'
import '../login/Login.css'
import logo from "../../../src/assets/logo.png"
import Axios from 'axios';
import cookies from 'js-cookie';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
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
        //event.preventDefault();
        console.log("rohittt");
        try {
            const res = await Axios.post(
                'http://localhost:3001/login',
                {
                    // method: "POST",
                    data: { username: this.state.username, password: this.state.password },
                }
            );//.catch(res => console.log(res));

            if (res.status === 200) {
                // this.props.setEmpname(data.name);
                // this.props.setEmpid(this.state.employee_id);
                localStorage.setItem('admin_id', this.state.username);
                // localStorage.setItem('admin_name', data.name);
                // this.setState({ redirect: true });
                cookies.set('admin-token', res.data.token, {
                    expires: date,
                });
                alert("success full");
            }
        } catch (err) {

            console.log(err);
            if (err.response) {
                console.log(err.response);
                if (err.response.status === 401) {
                    alert(err)
                }
            }






        }
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
                        <div className="login"  >

                            <input type="text" name="username" placeholder="Username" required value={this.state.admin_id}
                                onChange={this.handleChange} />

                            <div className="field">
                                <input type="password" name="password" placeholder="Password" required value={this.state.pass}
                                    onChange={this.handleChange} />
                            </div>

                            {/* <div className="signin_btn"> */}

                            <button className="ghost" id="signIn" type="submit" onClick={this.handleSubmit}>Sign In</button>

                            {/* </div> */}
                        </div>
                    </div>

                </div>



            </div>


        )
    }


}

export default Login
