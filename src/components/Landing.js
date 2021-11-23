import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, navigation, useParams, route, navigate, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, MenuIcon, Typography } from '@material-ui/core';
import { } from 'react-bootstrap'
import Header from "./Header"
import '../App.css'

function Landing({ user }) {

    var navigate = useNavigate();

    // const { username } = route.params;

    // console.log(username)

    var role = true;

    var isAdmin = true;

    var isSuperadmin = true;


    function handleSubmit(event) {
        event.preventDefault();
    }


    return (
        <div >
            {/* <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "#1d8fbd", height: "3rem" }}>
                    
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ marginBottom: "1rem" }} >
                            <img style={{ width: 100, height: 100 }} src="https://candentech.com//assets/img/logo-light.svg"></img>
                           
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            </Box> */}

            <h4 style={{ color: 'black' }}>Welcome , {user.username}</h4>
            <div className="LandingCon">

                {/* <form onSubmit={handleSubmit}> */}

                <div className="LandingCard">
                    <Link to="/SowDetail" style={{ color: "black", textDecorationLine: "none" }} >
                        <div className="card" style={{ width: "15rem", height: "10rem" }} >
                            <div className="card-body">
                                <h5 className="card-title">Add Sow Detail</h5>
                                <h6 className="card-subtitle mb-2 text-muted">To Add Project Details</h6>
                            </div>
                        </div>

                    </Link>
                </div>


                {user.username == "superadmin" ?
                    <div className="LandingCard">
                        < Link to="/Admin" style={{ color: "black", textDecorationLine: "none" }} >
                            <div className="card" style={{ width: "15rem", height: "10rem" }} >
                                <div className="card-body">
                                    <h5 className="card-title">Admin</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">To Add Associate</h6>
                                </div>
                            </div>
                        </Link> </div> : null}


                <div className="LandingCard">
                    <Link to="/Analytics" style={{ color: "black", textDecorationLine: "none" }} >
                        <div className="card" style={{ width: "15rem", height: "10rem" }} >
                            <div className="card-body">
                                <h5 className="card-title">Analytics</h5>
                                <h6 className="card-subtitle mb-2 text-muted">To Get Full Details of Sow</h6>
                            </div>
                        </div>
                    </Link></div>

                {user.username != "superadmin" ?
                    <div className="LandingCard">
                        <Link to="/Listofsow" style={{ color: "black", textDecorationLine: "none" }} >
                            <div className="card" style={{ width: "15rem", height: "10rem" }} >
                                <div className="card-body">
                                    <h5 className="card-title">List of Sow</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">To Get the list of Sow</h6>
                                </div>
                            </div>
                        </Link> </div> : null}

            </div>
        </div >
    )
}

export default Landing