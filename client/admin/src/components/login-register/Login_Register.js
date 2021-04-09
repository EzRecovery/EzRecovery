import React, { Component } from 'react'
//import './Login-register.css'
class Login_Register extends Component {



    render() {

        return (
            <div>
                <div class="wrapper">
                    <div class="title-text">
                        <div class="title login">
                            Login Page
                        </div>

                    </div>
                    <div class="form-container">

                    </div>
                    <div class="form-inner">
                        <form action="#" class="login">
                            <div class="field">
                                <input type="text" placeholder="Username" required />
                            </div>
                            <div class="field">
                                <input type="password" placeholder="Password" required />
                            </div>

                            <div class="field btn">
                                <div class="btn-layer">
                                </div>
                                <input type="submit" value="Login" />

                            </div>
                        </form>

                    </div>

                </div>

            </div>
        )
    }


}

export default Login_Register
