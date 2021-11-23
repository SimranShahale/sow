import React from 'react'
import Pychart from './Pychart'
import Header from './Header'
import Footer from './Footer'
import Card from './Card'

function Analytics() {
    return (
        <div>
              <a href="/Landing" style={{ textDecoration: "none", float: "left" }}><h1>&larr;</h1></a>

<div style={{ textAlign: "center" }}>
  <h1> SOW Analytics </h1>
</div>
        <Card/>

            <Pychart/>

        </div>
    )
}

export default Analytics
