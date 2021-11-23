import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Redirect, useNavigate } from "react-router-dom";
import { Nav } from "./NavbarElements";
import logo from "./logo-light.png";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { toast } from "react-toastify";
import { style } from "@mui/system";
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Navbar = ({ user, callback }) => {
  var navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const name = user.username;
  const onPressSetting = () => { };
  const OnPressLogout = () => {
    axios.get('http://192.168.1.251:8000/logout').then(res => toast.success(res.data.message))
    callback("", false);
    navigate("/")
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Nav>
        <img src={logo} />

        <h3 style={{ color: "#fff", fontStyle: "italic" }}>Candent's SoW Tracker</h3>

        <React.Fragment style={{
          position: 'absolute',
          right: 0
        }}>

          <Tooltip title={name}>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar style={{ alignItems: "right" }} sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(2px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              {user.username}
            </MenuItem>

            <Divider />
            {/* <MenuItem onClick={onPressSetting}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem onClick={OnPressLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      </Nav>
    </>
  );
};

export default Navbar;