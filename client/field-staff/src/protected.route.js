import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard'

// setEmpid={Rest.setEmpid} emp_name={Rest.emp_name}

export const ProtectedRoute = ({ isAuth: isAuth, ...Rest }) => {
    return (
        <Route
            render={() => {
                if (isAuth != null) {
                    return <Dashboard username={isAuth} setUsername={Rest.setUsername} />;
                }
                else {
                    return <Redirect to='/' />;
                }
            }
            }
        />
    );
};