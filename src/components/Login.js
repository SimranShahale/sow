// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link, Redirect, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button, TextField } from '@material-ui/core';
// import './Login.css'


// function Login() {

//     let navigate = useNavigate();

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const user = { username: username, password: password }

//     const clickHandler = () => {



//         let headersList = {
//             "Content-Type": "application/x-www-form-urlencoded",
//         }
//         let reqOptions = {
//             url: "http://192.168.1.251:8000/signin",
//             method: "POST",
//             headers: headersList,
//             data: user,
//         }
//         axios.request(reqOptions)
//             .then(res => {
//                 if (res.data.message == "Successfully Login") {
//                     navigate("/Landing", { username: "admin" });
//                     setUsername('');
//                     setPassword('');
//                 }
//                 else {
//                     alert(res.data.message)
//                     navigate(".")
//                     setUsername('');
//                     setPassword('');
//                 }
//             })

//     };

//     function handleSubmit(event) {
//         event.preventDefault();
//     }

//     return (
//         <div >
//             <Slide bottom>
//             <img style={styles.logo} src={logo} alt='logo' />

//             <div className="container">

//                 <form onSubmit={handleSubmit}>
//                     <h2><b>Login to SoW Tracker</b></h2>
//                     <div className="ui divider"></div>
//                              <div className="ui form"></div>
//                     <div className="login">
//                         <TextField
//                             fullWidth={true}
//                             className="field"
//                             label="Username"
//                             type="email"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         /><br /><br />
//                         <TextField
//                             fullWidth={true}
//                             className="field"
//                             label="Password"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         /><br /><br /><br />
//                         <Button fullWidth={true} size="small" color="primary" variant="contained" type="submit" onClick={clickHandler} >Login</Button><br /><br />
//                         <p className="forget-password text-right">
//                             <Link to={'/ResetPassword'}>ResetPassword</Link>
//                         </p>
//                     </div>

//                 </form>
//             </div>
//             </Slide>
//         </div>
//     )
// }

// export default Login

// const styles = {
//     logo: {
//         marginTop: '50px',
//         marginLeft: '472px',
//         height: 140,
//         width: 415,
//     }
// }


import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { } from '@material-ui/core';
import logo from './candent_logo2.png'
import { Grid, Paper, Avatar, TextField, Button, Typography, } from '@material-ui/core'
import { } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { color } from '@mui/system';
toast.configure();

const Login = ({ callback }) => {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const user = { username: username, password: password }

    const clickHandler = () => {

        let headersList = {
            "Content-Type": "application/x-www-form-urlencoded",
        }
        let reqOptions = {
            url: "http://192.168.1.251:8000/signin",
            method: "POST",
            headers: headersList,
            data: user,
        }
        axios.request(reqOptions)
            .then(res => {
                if (res.data.message == "Successfully Login") {
                    // toast.success(res.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
                    navigate("/Landing", { username: "admin" });
                    setUsername('');
                    setPassword('');
                    callback(user.username, true);
                    console.log(user)
                }
                else {
                    toast.error(res.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
                    navigate(".")
                    setUsername('');
                    setPassword('');
                }
            })

    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    const paperStyle = { padding: 20, height: '55vh', width: 320, margin: "20px auto" }

    return (
        <Grid>
            <img style={styles.logo} src={logo} alt='logo' /><br /><br />
            <Paper elevation={5} style={paperStyle}>

                <Grid align='center'>
                    <h3>Login to SoW Tracker</h3>
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
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br /><br />
                <Button fullWidth={true} size="small" color="primary" variant="contained" type="submit" onClick={clickHandler} >Login</Button><br /><br />
                <p style={styles.link}>
                    <Link to={'/ResetPassword'}>Reset Password</Link>
                </p>
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
        
    },
    link:{
        textAlign: 'end'
      }
}