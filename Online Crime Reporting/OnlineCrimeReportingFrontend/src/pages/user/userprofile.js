import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import Button from "../../components/button";
import axios from "axios";
import config from "../../config";
// import {Tooltip, ChartArcOptions, ChartLegendItem, ChartTitleOptions, ChartJs} from "chart.js"
// import {ChartJs, Tooltip, Title,ArcElement, Legend} from "chart.js"
import { toast } from "react-toastify";
import PieChart from "../../components/piechart";

// import { Doughnut } from "react-chartjs-2";
// ChartJs.register(
//   Tooltip, Title,ArcElement, Legend
// );


const UserProfile=()=>{
  // const data = {
  //   datasets: [{
  //       data: [10, 20, 30]
  //   }],
  
  //   // These labels appear in the legend and in the tooltips when hovering different arcs
  //   labels: [
  //       'Red',
  //       'Yellow',
  //       'Blue'
  //   ]
  // };
  
  
  
    const [id,setId]=useState(null)
    const [complaints, setComplaints]=useState([])
    const location=useLocation()
    const navigate=useNavigate()

    const navigateToAddComplaint=()=>{
        navigate('/user/complaint/add', {state : {userId:id}})
    }
    const navigateToMyProfile=()=>{
      navigate('/user/myprofile', {state: {userId:id}})
    }
    const getMyComplaints=(id)=>{
      
      axios.get(config.serverURL+'/api/user/complaint/'+id,{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
      }).then((response)=>{
        const result=response['data']
        setComplaints(result)
      }).catch((error)=>{
        toast.error(error)
      })
    }
    const furtherDetails=(id)=>{
      navigate('/user/complaint/details', {state : {complaintId:id}})
    }
    const deleteComplaint=(ide)=>{
      axios.delete(config.serverURL+'/api/user/complaint/'+ide,{
        headers:{'Authorization': 'Bearer '+sessionStorage['token']}
      }).then((response)=>{
        toast.success(response)
        getMyComplaints(id);
      }).catch((error)=>{
        toast.error(error)
      })
    }
    useEffect(()=>{
        const { userId }=location.state;
        console.log(userId);
        setId(userId);
        getMyComplaints(userId);
     },[location])

    return(
      <div  style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
         {/* Start of Sidebar */}
        <div style={{marginTop:20}}>
      <button className="btn btn-primary" style={{backgroundColor:'#795da3'}} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
     Open the Index
      </button>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
       <div className="offcanvas-header">
           <h5 className="offcanvas-title" id="offcanvasExampleLabel">Index</h5>
         <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
       </div>
       <div className="offcanvas-body">
          
         <Button onClick={navigateToAddComplaint} title='Lodge a Complaint' /> 
          <Button onClick={navigateToMyProfile} title='My Profile' />
          </div>
          </div>
      </div>
        {/* end of Sidebar */}
        {/* List of Complaints */}
        
      <div className="container">
        <h3 style={{textAlign:'center',margin:20}}>My Registered Complaints</h3>
        <hr/>
        {//conditional rendering if 1st condition is true then have to go to execute the 2nd statement(condition)
            complaints.length === 0 && 
            <h4 style={{textAlign:'center', margin:20}}>
            No Complaints Are Registered Yet!
            </h4>
            } 
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Case Type</th>
                <th>Reporting Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Serving Police Station</th>
                <th>Look Into Further Details If Any</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint)=>{
                return(
                  <tr key={complaint.id}>
                    <td>{complaint.id}</td>
                    <td>{complaint.caseTypeSelected.caseType}</td>
                    <td>{complaint.reportingDate}</td>
                    <td>{complaint.location}</td>
                    <td>{complaint.complaintStatus}</td>
                    <td>{complaint.policeStation.name}</td>
                    <td>{complaint.caseTypeSelected.caseType==='MOTOR_VEHICLE_THEFT'  &&
                    <Button onClick={()=>furtherDetails(complaint.id)} title='Details' />} 
                    {complaint.caseTypeSelected.caseType==='MISSING_OR_STOLEN_MOBILE_PHONES'  &&
                    <Button onClick={()=>furtherDetails(complaint.id)} title='Details' />}
                    {complaint.caseTypeSelected.caseType==='MISSING_CHILD_OR_PERSON' &&
                    <Button onClick={()=>furtherDetails(complaint.id)} title='Details' />}
                    </td>
                    <td>
                      {complaint.complaintStatus==='PENDING'&&
                      <Button onClick={()=>deleteComplaint(complaint.id)} title='Withraw' />
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <h4 style={{textAlign:'center', margin:20, color:'red'}}>NOTE: You Might Withdraw the Complaint only uptill it's Status is PENDING</h4>
        </div>
          <br/><hr/><br/>
          <div>
            
            <div style={{position:'absolute',left:'25%'}}>

            <PieChart></PieChart>
            </div>
         
          </div>

      </div>
    )


}
export default UserProfile