import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Allocation from "../Allocation/Allocation";

//Navbar and Sidebar
import Navbar from "../dashboard/navbar/Navbar";
import Sidebar from "../dashboard/sidebar/Sidebar";
import MyAllocation from "../MyAllocation/MyAllocation";
import Ticket from "../Ticket/Ticket"


//pages
import DashboardPage from "../pages/DashboardPage";
import ImportPage from "../pages/ImportPage";


const Dashboard = (props) => {
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
                    {/* <Route exact path='/app/view' component={View_records} /> */}
                    {/* <Route exact path='/app/allocation' component={Allocation} /> */}
                    <Route exact path='/app/myallocation' component={MyAllocation} />
                    <Route exact path='/app/ticket' component={Ticket} />
                </Switch>
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} setUsername={props.username} />
            </div>
        </Router>
    );
};

export default Dashboard;
