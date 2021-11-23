import React from 'react';
import axios from 'axios';
import '../pages/ListofSow.css';

function ListofSow() {

    const [sows, setSOWs] = React.useState([])

    React.useEffect(() => {
        axios.get('http://192.168.1.251:8000/sow').then(res => setSOWs(res.data.data))
    }, [])

    return (
        <div className='reports'>
            <h1 style={{ textalign: 'center' }}>Lists of Sows </h1>

            {/* {sows && sows.map((sows)=>(<p>{sows.startDate}</p>))} */}

            {sows && <SOWTable sows={sows} />}

        </div>
    );
}

export default ListofSow;

function SOWTable({ sows }) {
    return (
        <table>
            <tr>
                <th> Creator </th>
                <th> Creation Date </th>
                <th> Project Name </th>
                <th> Associate Name </th>
                <th> Customer Name </th>
                <th> Start Date </th>
                <th> End Date </th>
                <th> Status </th>
            </tr>

            {sows && sows.map((sow) => (
                <tr>
                    <td> {sow.username} </td>
                    <td> {sow.timestamp.slice(0, 10)} </td>
                    <td> {sow.projectName} </td>
                    <td> {sow.employees} </td>
                    <td> {sow.customerDetails} </td>
                    <td> {sow.startDate} </td>
                    <td> {sow.endDate} </td>
                    <td> {sow.expireDays > 0 ? 'Active' : 'Inactive'} </td>
                </tr>
            ))}
        </table>
    );
}