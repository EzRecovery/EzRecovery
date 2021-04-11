import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from 'react-router-dom'
import classNames from "classnames";
import StorageIcon from '@material-ui/icons/Storage';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Person as AccountIcon } from "@material-ui/icons";
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';

import useStyles from "./styles";
import SidebarLink from "./components/SidebarLink/SidebarLink";

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../../context/LayoutContext";


const labelForManage = "Manage Field-Staff";
const Arrow = ">";

const Mix = labelForManage + "      " + Arrow;

const structure = [
  { id: 5, type: "divider" },
  {
    id: 0,
    label: "Anish Marathe",
    link: '/app/profile',
    icon: <FaceIcon />,

  },
  {
    id: 1, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon />
  },
  {
    id: 2,
    label: "Import Records",
    link: "/app/import",
    icon: <StorageIcon />,
  },
  { id: 3, label: "View Records", link: "/app/view", icon: <ViewAgendaIcon /> },
  {
    id: 4,
    label: Mix,
    link: "/app/manage",
    icon: <EditIcon />,
    children: [
      { label: "Add", link: "/app/manage/add", icon: <AddIcon /> },
      { label: "Remove", link: "/app/manage/remove", icon: <RemoveIcon /> },
    ],
  },
  {
    id: 5,
    label: "Allocate",
    link: "",
    icon: <AssignmentIndIcon />,

  },

  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  // { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <IconButton
        aria-haspopup="true"
        color="inherit"
        className={classes.headerMenuButton}
        aria-controls="profile-menu"

      >
        <AccountIcon classes={{ root: classes.headerIcon }} /><br />
      </IconButton>

      <div className={classes.mobileBackButton}>

        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {isSidebarOpened && <div className={classes.ezrecoveryText}>
          EzRecovery
        </div>}
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))
        }
        <div className={classes.logout}>
          {isSidebarOpened && <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<LockIcon />}
          >
            Log Out
      </Button>
          }
        </div>
      </List>
    </Drawer >
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
