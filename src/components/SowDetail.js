import '../App.css'
import React, { useState, useEffect } from 'react'
import { TextField, Button, Paper, Container, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './styles'
import Select from 'react-select';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import axios from 'axios';
import { BrowserRouter as Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import NavBar from './NavBar';
//import "react-datepicker/dist/react-datepicker.css";
toast.configure();




const data1 = [];
const skillSet = [];

const SowDetail = () => {
  const [value, setValue] = React.useState(new Date("01/01/1000"));
  const [flag, setFlag] = useState(false);
  var navigate = useNavigate();

  useEffect(() => {
    axios.get('http://192.168.1.251:8000/sow/associate')
      .then(response => {
        console.log(response.data.data)
        if (data1.length == 0) {  //if
          for (var i = 0; i < response.data.data.length; i++) {
            data1.push({
              value: i + 1,
              label: response.data.data[i].associateEmail
            })
            skillSet.push({
              value: i + 1,
              label: response.data.data[i].skillset
            })
          }
        }//if
        console.log("data1")
        console.log(data1)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const classes = useStyles();
  let data = new FormData();
  const dt = new Date();
  const [emp, setEmp] = useState([]);

  const date = dateForm(dt);
  const [selectedEmployee, setselectedEmployee] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [customerDetails, setCustDetails] = useState("");
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [file, setFile] = useState("");
  const [sowPdf, setSowPdf] = useState(null);
  const [username, setUsername] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  function dateForm(dt) {
    return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
  }

  const handleChange = (e) => {
    console.log("event" + e)
    setselectedEmployee(Array.isArray(e) ? e.map(x => x.label) : []);
    console.log(selectedEmployee)
  }

  const handleChangeSkill = (e) => {
    console.log("event" + e)
    setSelectedSkill(Array.isArray(e) ? e.map(x => x.label) : []);
    console.log(selectedSkill)
  }

  //file upload
  const handlePdf = ({ target: { files } }) => {
    setFile(files[0].name)
    console.log(files[0])
    setSowPdf(files[0]);

  }

  function minDateFun(item) {
    console.log(item.selection.startDate)
    setState([item.selection])
    setValue(item.selection.startDate)
    setFlag(true)
  }

  function clearDates() {
    setValue(new Date("01/01/1000"))
    setState([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]);
  }
  const show = (e) => {

    var msg = "";
    console.log(emp);

    console.log("dateOfCreation : " + date)
    console.log("username : " + username)
    console.log("project : " + projectName)
    console.log("customer Details : " + customerDetails)
    console.log("startDate : " + dateForm(state[0].startDate))
    console.log("endDate : " + dateForm(state[0].endDate))
    // console.log(dt + " " + startDate)
    console.log(file)
    selectedEmployee.map(val => { console.log(val) })
    selectedSkill.map(val => { console.log(val) })

    if (customerDetails != "" && selectedEmployee != null && sowPdf != null && selectedSkill != null && projectName != "" && username != "") {
      data.append('customerDetails', customerDetails);
      data.append('employees', selectedEmployee.toString());
      data.append('endDate', dateForm(state[0].endDate));
      data.append('skillset', selectedSkill.toString());
      data.append('startDate', dateForm(state[0].startDate));
      data.append('projectName', projectName);
      data.append('username', username);
      data.append('sowpdf', sowPdf);

      axios.post('http://192.168.1.251:8000/sow/', data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response)
          msg = response.data.message;
          toast.info(response.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
        })
        .catch(error => {
          console.log("Error: " + error)
          toast.error("error", { position: toast.POSITION.BOTTOM_RIGHT })

        })

      //  if(msg=='Project Name already Exists'){

      setUsername("");
      setCustDetails("");
      setFile("");
      setProjectName("");
      setselectedEmployee([]);
      setSelectedSkill([]);
      setFile("");
      setSowPdf(null);
      // setState([{
      //   startDate: new Date(),
      //   endDate: new Date(),
      //   key: 'selection'
      // }]);
      clearDates()
      setFlag(false);
    }
    // if }
    else {
      toast.error("All fields are required", { position: toast.POSITION.BOTTOM_RIGHT })
    }
  }
  return (
    <div style={{ backgroundColor: "white" }}>
    
      <Container maxWidth='md' >

        <Paper className={classes.outerPaper}>

          <Typography variant="h5" style={{ textAlign: "center" }} >Add SoW</Typography>

          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="stretch" spacing={3} >
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} >

                      <TextField
                        name="creator"
                        variant="outlined"
                        label="Creator"
                        fullWidth
                        value={username}
                        size="small"
                        onChange={(e) => setUsername(e.target.value)} />
                      <TextField
                        name="Customer"
                        variant="outlined"
                        label="Customer"
                        fullWidth
                        value={customerDetails}
                        size="small"
                        onChange={(e) => setCustDetails(e.target.value)}

                      />
                      <TextField
                        name="project"
                        variant="outlined"
                        label="Project"
                        fullWidth
                        value={projectName}
                        size="small"
                        onChange={(e) => setProjectName(e.target.value)} />
                     
                      <div className={classes.selectInput}>
                        <Select
                          options={data1} // set list of the data
                          className="dropdown"
                          placeholder="Select Employees"
                          value={data1.filter(obj => selectedEmployee.includes(obj.label))} // set selected values
                          onChange={handleChange} // assign onChange funct
                          isMulti
                          isClearable

                          theme={theme => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: "#0275d8",

                            }
                          })}
                        />
                      </div>
                      <div className={classes.selectInput}>
                        <Select
                          name="tags"
                          variant="outlined"
                          label="Tags"
                          fullWidth
                          options={skillSet} // set list of the data
                          className="dropdown"
                          placeholder="Select Skills"
                          value={skillSet.filter(obj => selectedSkill.includes(obj.label))} // set selected values
                          onChange={handleChangeSkill} // assign onChange function
                          isMulti
                          isClearable
                          theme={theme => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: "#0275d8",

                            }
                          })}
                        />
                      </div>
                      <Button style={{ marginTop: "15px", marginBottom: "15px", backgroundColor: "#1d8fbd", color: "white", height: "2.1rem" }}
                        variant="contained"
                        component="label">
                      Select File
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handlePdf(e)}
                        />
                      </Button> <input style={{ height: "2.2rem", width: "73%", marginTop: "15px" }}
                        name="project"
                        variant="outlined"
                        value={file}/>
                    </form>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper} style={{ textAlign: "center"  }} >
                    <label style={{ marginRight: "20%" }}> StartDate </label>
                    <label>EndDate </label>
                    <br />
                    <div  >
                      <DateRange
                        editableDateInputs={true}
                        onChange={item => minDateFun(item)}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        minDate={value}
                      />
                    </div>
                    {flag ?
                      <Button  className={classes.buttonSubmit} variant="contained" color="primary" onClick={clearDates} size="small" >Clear</Button>
                    : null}
                  </Paper>

                  <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large"
                    onClick={() => { navigate('/Landing') }} size="small" type="submit" style={{ marginLeft: "13rem", marginRight: "1rem" }}>Back</Button>

                  <Button className={classes.buttonSubmit} variant="contained" color="primary" onClick={show}
                    size="small" type="submit" >Submit</Button>

                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Paper >
      </Container>
    </div>
  )
}
export default SowDetail;
