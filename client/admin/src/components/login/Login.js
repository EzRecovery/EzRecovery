import { logDOM } from '@testing-library/dom'
import React, { Component } from 'react'
import '../login/Login.css'
import logo from "../../../src/assets/logo.png"
import Axios from 'axios';
import cookies from 'js-cookie';
import cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: false,
            auth: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    isAuthenticated() {
        return this.state.auth;
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
        console.log("rohittt");
        try {
            const res = await Axios.post(
                'http://localhost:3001/login',
                {
                    // method: "POST",
                    data: { username: this.state.username, password: this.state.password },
                }
            );
            if (res.status === 200) {
                this.props.setUsername(this.state.username);

                localStorage.setItem('username', this.state.username);

                this.setState({ redirect: true });

                alert("success full");
                let date = 1 / 48; //30 min
                cookies.set('admin-token', res.data.token, {
                    expires: date,
                });

                console.log(cookie.get('admin-token'));

                // this.props.history.push("/app");
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

        if (this.state.redirect == false) {
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


            );
        }

        else
            return (
                <Redirect push to='/app' />
            )

    }
}

export default Login
