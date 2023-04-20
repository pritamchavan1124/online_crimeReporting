import React from "react";
import Chart from 'react-apexcharts'
import {useState, useEffect} from "react"
import axios from "axios";
import config from "../config";
function PieChart(){

const [caseTypes,setCaseTypes]=useState([])
const [noOfComplaints,setNoOfComplaints]=useState([])

const getComplaintStat=async()=>{
const ct=[]
const noc=[]
  await axios.get(config.serverURL+'/api/user/complaintstat',{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
    }).then((response)=>{
        const result=response.data
      //  console.log(result)
        for(let i=0; i<result.length; i++){
            ct.push(result[i].caseType);  
            noc.push(result[i].noOfComplaints);
        }
        setCaseTypes(ct);
        setNoOfComplaints(noc);
    }).catch((err)=>{
        console.log(err)
    })
}
useEffect(()=>{
    getComplaintStat();
},[])

    return(
        <React.Fragment>
            <Chart
            type="pie"
            width={1000}
            height={550}
            series={noOfComplaints}

            options={{
                title:{text:"Case Type Statistics"},
                noData:{text:"No data available"},
             labels:caseTypes
            }}
            >

            </Chart>
        </React.Fragment>
    )
}
export default PieChart