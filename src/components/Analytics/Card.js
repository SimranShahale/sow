import React from "react";
import axios from "axios";
import "./analytics.css";
//refresh
const secs = 1000;
const mins = 60 * secs;
const refresh_time = 15 * mins;
function InfoCards() {
  const [data,setData] = React.useState('')
  React.useEffect(()=>{
      axios.get('http://192.168.1.251:8000/sow/sowAnalytics').then((res) =>{
          setData(res.data)
          console.log(res.data)
      })
  },[]);
  return (
    <>
    { data ? <div className="InfoCards">
      <button className="InfoCard Active">
        <span className="InfoCardTitle">All Ok!</span>
        <span className="InfoCardInfo">{data.data3.length}</span>
        {/* <span className="InfoCardIcon"> <ArrowDownward/> </span> */}
      </button>
      <div className="InfoCard Warning">  
        <span className="InfoCardTitle">Supervision Needed</span>
        <span className="InfoCardInfo">{data.data2.length}</span>
      {/* <span className="InfoCardIcon"><ArrowDownward/></span> */}
      </div>
      <div className="InfoCard Danger">  
        <span className="InfoCardTitle">Expiring Soon</span>
        <span className="InfoCardInfo">{data.data1.length}</span>
        {/* <span className="InfoCardIcon Danger"><Arro wDownward/></span> */}
      </div>
      </div> : 'Loading...'}
      </>
  );
}
export default InfoCards;