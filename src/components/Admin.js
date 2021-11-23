// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import ListofSow from '../pages/ListofSow';
// import AssociateInfo from './pages/AssociateInfo';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Navigate } from 'react-router';
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
import { Sidebardata } from './Sidebardata';
import './Navbar.css';
import { IconContext } from 'react-icons';

<>
    <Router>
        <Navbar />
        <Routes>
            <Route path='' element={<Home />} />
            <Route path='AssociateInfo' element={<AssociateInfo />} />
            <Route path='ListofSows' element={<ListofSow />} />
        </Routes>
    </Router>
</>

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};




function AssociateInfo() {



    const [associates, setAssociates] = React.useState([])

    React.useEffect(() => {
        axios.get('http://192.168.1.251:8000/sow/associate').then(res => setAssociates(res.data.data))
    }, [])

    const [showForm, setShowForm] = React.useState(false);

    const [associateId, setAssociateId] = React.useState('');
    const [associateName, setAssociateName] = React.useState()
    const [associateEmail, setAssociateEmail] = React.useState()
    const [skillset, setSkilset] = React.useState()
    const [role, setRole] = React.useState()
    const [password, setPassword] = React.useState()
    const [cmpassword, setCmPassword] = React.useState('')



    const saveAssociate = function () {
        // var bodyFormData = new FormData();
        const postData = {
            "associateId": associateId,
            "associateName": associateName,
            "associateEmail": associateEmail,
            "skillset": skillset,
            "role": role,
            "password": password
        }

        let headersList = {
            "Content-Type": "application/x-www-form-urlencoded",
        }
        let reqOptions = {
            url: "http://192.168.1.251:8000/sow/associate",
            method: "POST",
            headers: headersList,
            data: postData
        }
        console.log(postData)
        axios.request(reqOptions).then(res => {
            console.log(res);
            alert(res.data.message);
            // Navigate('.')
        });

    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <h1>Associate Info</h1>
            <Button onClick={handleOpen}>Add Associate</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Required Associate Info
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box sx={style}>
                            <Grid container spacing={2} style={{ padding: 20, margin: 20 }}>

                                <Grid item xs={12}>


                                    <label className="label">Associate Id</label><input type="text" placeholder=" Associate Id" value={associateId} onChange={(e) => setAssociateId(e.target.value)} /><br></br>
                                    <label className="label">Associate Name</label><input type="text" placeholder=" Associate Name" value={associateName} onChange={(e) => setAssociateName(e.target.value)} /><br></br>
                                    <label className="label"> Associate Email</label><input type="text" placeholder="Associate Email" value={associateEmail} onChange={(e) => setAssociateEmail(e.target.value)} /><br></br>
                                    <label className="label">SkillSet</label><input type="text" placeholder="SkillSet" value={skillset} onChange={(e) => setSkilset(e.target.value)} /><br></br>
                                    <label className="label">Role</label><input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                                    <label className="label">Password</label><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
                                    {/* <button onClick={() => saveAssociate(associateId)} >Submit</button>
                  <button type="Cancel">Cancel</button> */}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" onClick={() => saveAssociate(associateId)}>Submit</Button>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            </Grid>

                        </Box>

                    </Typography>
                </Box>
            </Modal>


            {/* <button onClick={() => setShowForm(!showForm)}> Add Associate </button>


      {showForm ?
        <div >
          <label className="label">Associate Id</label><input type="text" placeholder=" Associate Id" value={associateId} onChange={(e) => setAssociateId(e.target.value)} /><br></br>
          <label className="label">Associate Name</label><input type="text" placeholder=" Associate Name" value={associateName} onChange={(e) => setAssociateName(e.target.value)} /><br></br>
          <label className="label"> Associate Email</label><input type="text" placeholder="Associate Email" value={associateEmail} onChange={(e) => setAssociateEmail(e.target.value)} /><br></br>
          <label className="label">SkillSet</label><input type="text" placeholder="SkillSet" value={skillset} onChange={(e) => setSkilset(e.target.value)} /><br></br>
          <label className="label">Role</label><input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
          <label className="label">Password</label><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
          <button onClick={() => saveAssociate(associateId)} >Submit</button>
          <button type="Cancel">Cancel</button>
        </div>
        :
        null
      } */}

            {associates && <AssociateTable associates={associates} />}
        </div>
    );
}

export default AssociateInfo;

function AssociateTable({ associates }) {

    const [showForm, setShowForm] = React.useState(false);

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [cmpassword, setCmPassword] = React.useState('');

    const [passOpen, setPassOpen] = React.useState(false);
    const handlepassOpen = (Email) => {
        setEmail(Email)
        setPassOpen(true);
    }
    const handlepassClose = () => setPassOpen(false);

    const changePasswordforAssociate = () => {

        const userData = {
            username: email,
            password: password,
            cmpassword: cmpassword,
        }

        let headersList = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        let reqOptions = {
            url: "http://192.168.1.251:8000/changePassword",
            method: "POST",
            headers: headersList,
            data: userData
        }
        console.log(userData)
        axios.request(reqOptions).then((response) => {
            console.log(response.data);
            alert(response.data.message);
            handlepassClose()
        }).catch((e) => console.log(e))
    }

    const deleteAssociate = (id) => {

        let headersList = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        let reqOptions = {
            url: `http://192.168.1.251:8000/sow/associate/${id}`,
            method: "DELETE",
            headers: headersList,
        }

        axios.request(reqOptions).then((res) => {
            console.log(res.data);
            alert(res.data.message);
            Navigate(".")
        }).catch((e) => console.log(e))

    }

    return (
        <>
            <table>
                <tr>
                    <th> Associate Id </th>
                    <th> Associate Name </th>
                    <th> Associate Email </th>
                    <th> SkillSet </th>
                    <th> Role </th>
                    {/* <th> Password </th> */}
                    <th>Action</th>


                </tr>

                {associates && associates.map((associate) => (
                    <tr>
                        <td> {associate.associateId} </td>
                        <td> {associate.associateName} </td>
                        <td> {associate.associateEmail} </td>
                        <td> {associate.skillset} </td>
                        <td> {associate.role} </td>
                        {/* <td> {associate.password} </td> */}
                        <td> <button onClick={() => handlepassOpen(associate.associateEmail)}> Change Password </button><br />
                            <button onClick={() => deleteAssociate(associate.id)}> Delete</button> </td>

                    </tr>
                ))}
            </table>
            <Modal
                open={passOpen}
                onClose={handlepassClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Reset Associate Password
                    </Typography>
                    <Box sx={style}>
                        <Grid container spacing={2} style={{ padding: 20, margin: 20 }}>
                            <Grid item xs={12}>
                                <label className="label">Associate Username</label><input type="text" placeholder=" Associate Username" value={email} /><br></br>
                                <label className="label">New Password</label><input type="text" placeholder=" New Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
                                <label className="label">Confirm Password</label><input type="text" placeholder="Confirm Password" value={cmpassword} onChange={(e) => setCmPassword(e.target.value)} /><br></br>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" onClick={changePasswordforAssociate}>Submit</Button>
                            <Button variant="outlined" onClick={handlepassClose}>Cancel</Button>
                        </Grid>

                    </Box>
                </Box>

            </Modal>
        </>
    );
}