import React from "react";
import "./analytics.css"

import axios from "axios";

export default function SOWComTable({Company}) {

  const [data, setData] = React.useState([])
  console.log(data)

   React.useEffect(()=>{},[Company])

  
  return (
    <table>
      <tr>
        <th> Project Name </th>
        <th> Customer Name </th>
        <th> Creator </th>
        <th> Assigned Employees </th>
        <th> Skills  </th>
        <th> Start Date </th>
        <th> End Date </th>
        <th> Remaining Days </th>
      </tr>

      { Company && Company.map((company) => (
        
      <tr>
        <td> {company.projectName} </td>
        <td> {company.customerDetails} </td>
        <td> {company.username} </td>
        <td> {company.employees} </td>
        <td> {company.skillset} </td>
        <td> {company.startDate} </td>
        <td> {company.endDate} </td>
        <td> {company.expireDays} </td>
      </tr>
      ))}
    </table>
  );
}