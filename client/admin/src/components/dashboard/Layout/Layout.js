import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { Box } from '@material-ui/core'


//icons

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../../pages/dashboard";
import Import from "../../../pages/import";
import View from "../../../pages/view";
import Manage from "../../../pages/manage"
// context
import { useLayoutState } from "../../../context/LayoutContext";
import Add from "../../../pages/manage/add/Add";
import Remove from "../../../pages/manage/remove/Remove";
import Profile from "../../../pages/profile/Profile";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/import" component={Import} />
            <Route path="/app/profile" component={Profile} />
            <Route path="/app/view" component={View} />
            <Route exact path="/app/manage" component={Manage} />
            <Route exact path="/app/manage/add" component={Add} />
            <Route exact path="/app/manage/remove" component={Remove} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>

            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
