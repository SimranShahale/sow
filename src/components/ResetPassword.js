import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { } from '@material-ui/core';
import logo from './candent_logo2.png'
import { Grid, Paper, Avatar, TextField, Button, Typography, } from '@material-ui/core'
import Alert from '@mui/material/Alert';
import { } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Info } from '@mui/icons-material';
toast.configure();


function Login() {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cnpassword, setCnPassword] = useState("");


    const user = { username: username, password: password, cmpassword: cnpassword }

    const clickHandler = () => {

        let headersList = {
            "Content-Type": "application/x-www-form-urlencoded",
        }
        let reqOptions = {
            url: "http://192.168.1.251:8000/changePassword",
            method: "POST",
            headers: headersList,
            data: user,
        }
        axios.request(reqOptions)
            .then(res => {
                console.log(res)
                if (res.data.message == "Successfully Change Password") {
                    // <Alert severity="success">{(res.data.message)}</Alert>
                    toast.success(res.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
                    navigate("/")
                    setUsername('');
                    setPassword('');
                    setCnPassword('');
                }
                else {
                    if (username == '' && password == '' && cnpassword == '') {
                        toast.info('All fields are empty!', { position: toast.POSITION.BOTTOM_RIGHT })
                        navigate(".")
                    }
                    else {
                        toast.error(res.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
                        console.log(res.data)
                        navigate(".")
                        setUsername('');
                        setPassword('');
                        setCnPassword('');
                    }
                }
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
    }


    const paperStyle = { padding: 20, height: '58vh', width: 300, margin: "20px auto" }

    return (
        <Grid>
            <img style={styles.logo} src={logo} alt='logo' /><br /><br />
            <Paper elevation={5} style={paperStyle}>

                <Grid align='center'>
                    <h2>Reset Password</h2>
                </Grid><br />
                <TextField
                    fullWidth={true}
                    className="field"
                    label="Username"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br /><br />
                <TextField
                    fullWidth={true}
                    className="field"
                    label="New Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
                <TextField
                    fullWidth={true}
                    className="field"
                    label="Confirm Password"
                    type="password"
                    value={cnpassword}
                    onChange={(e) => setCnPassword(e.target.value)}
                /><br /><br /><br />
                <Button fullWidth={true} size="small" color="primary" variant="contained" type="submit" onClick={clickHandler} >Save</Button><br /><br />
            </Paper>
        </Grid>
    )
}

export default Login

const styles = {
    logo: {
        // marginTop: '50px',
        // marginLeft: '468px',
        // height: 140,
        // width: 425,
        display: 'block',
        marginRight: "auto",
        marginLeft: "auto",
        width: '30%'
    }
}