import React from "react";
import { Pie,Bar } from "react-chartjs-2";
// import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto'

// Chart.register(CategoryScale)

// Table
import Table from "./SOWComTable";

// API
// import { CustomerDataSet } from "./CustomerDataSet";
import axios from "axios"; 

//refresh time
const secs = 1000;
const refresh_time = 15 * secs; // refresh the data in milliseconds

function Pychart() {
  const [selectedGraphElement, setGraphElement] = React.useState("");
  const [elementsSelected, setElementsSelected] = React.useState("");
  const [selectedDataSets, setSelectedDataSets] = React.useState("");

  const [ActiveZone, setActiveZone] = React.useState({ length: 0 });
  const [WarningZone, setWarningZone] = React.useState({ length: 0 });
  const [DangerZone, setDangerZone] = React.useState({ length: 0 });

  const [companyData, setCompanyData] = React.useState(null);
  const [customer, setCustomer] = React.useState("");

  const [ChartType,setChartType] = React.useState(true);

  React.useEffect(() => {
    axios.get("http://192.168.1.251:8000/sow/sowAnalytics").then((res) => {
      console.log(res.data)
      setCompanyData(res.data);
      setActiveZone(res.data.data3);
      setWarningZone(res.data.data2);
      setDangerZone(res.data.data1);
    });
  }, []);

  const passData = [ActiveZone, WarningZone, DangerZone];

  const data = {
    labels: ["More than a month", "Less than a month", "Less than 15 days"],
    datasets: [
      {
        label: "SOW tracker",
        data: [ActiveZone.length, WarningZone.length, DangerZone.length],
        backgroundColor: [
          "rgb(10,132,10,0.5)",
          "rgb(255,165,0,0.5)",
          "rgb(255,0,0,0.8)",
        ],
        borderColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      maintainAspectRatio: true,
    },
  };

  React.useEffect(() => {
    setCustomer(passData[selectedGraphElement.index]);
  }, [selectedGraphElement]);

  const getElementAtEvent = (element) => {
    if (!element.length) return;
    setGraphElement(element[0]);
    console.log(element[0])
  };

  const getDatasetAtEvent = (datasets) => {
    if (!datasets.length) return;
    const datasetIndex = datasets[0].datasetIndex;
    setSelectedDataSets(data.datasets[datasetIndex].label);
  };

  const getElementsAtEvent = (elements) => {
    if (!elements.length) return;
    setElementsSelected(elements.length);
  };

  return (
    <>
      <div style={{ alignSelf: "center" }}>

        
      </div>
      <div className="analyticsContainer">
        <div>
          <div className="analyticsCard" style={{ textAlign: "center" }}>
            <Pie
              data={data}
              options={options}
              getElementAtEvent={getElementAtEvent}
              getDatasetAtEvent={getDatasetAtEvent}
              getElementsAtEvent={getElementsAtEvent}
              width={400}
              height={400}
            />
                        <Bar
              data={data}
              options={options}
              getElementAtEvent={getElementAtEvent}
              getDatasetAtEvent={getDatasetAtEvent}
              getElementsAtEvent={getElementsAtEvent}
              width={400}
              height={400}
            />

            Click on chart to see SOW in detail
          </div>
        </div>

        <div>
        <div className="analyticsCard" style={{ textAlign: "center" }}>
          <Table Company={customer} />
          </div>
          {/* {selectedGraphElement && (
            <div className="analyticsCard" style={{ textAlign: "center" }}>
              { {customer &&
              `${customer.length} SOW${customer.length == 0 ? "s" : ""} here`}
              <br/>
              <br/> }
              <Table Company={customer} />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default Pychart;

