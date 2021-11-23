import React from 'react'

function Footer() {
    return (
        <div style={{backgroundColor:'#fffefa' ,textAlign: 'center'}}>
            &copy; Candent Technologies Pvt. Ltd. <br/>
            {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
        </div>
    )
}

export default Footer