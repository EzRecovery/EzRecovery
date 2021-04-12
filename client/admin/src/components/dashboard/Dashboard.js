import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Navbar and Sidebar
import Navbar from "../dashboard/navbar/Navbar";
import Sidebar from "../dashboard/sidebar/Sidebar";


//pages
import DashboardPage from "../pages/DashboardPage";
import ImportPage from "../pages/ImportPage";

const Dashboard = () => {
    const [sidebarOpen, setsidebarOpen] = useState(false);
    const openSidebar = () => {
        setsidebarOpen(true);
    };
    const closeSidebar = () => {
        setsidebarOpen(false);
    };
    return (
        <Router>
            <div className="container">
                <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
                <Switch>
                    <Route exact path='/app/dashboard' component={DashboardPage} />
                    <Route exact path='/app/import' component={ImportPage} />
                </Switch>
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            </div>
        </Router>
    );
};

export default Dashboard;
