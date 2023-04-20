import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import Button from "../../components/button";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";

const PsComplaintList=()=>{
    const [id,setId]=useState(null)
    const [complaints, setComplaints]=useState([])
    const location=useLocation()
    const navigate=useNavigate()

    const [menuHeight, setMenuHeight]= useState(null) 
    function calcHeight(el){
        const height=el.offsetHeight;
         setMenuHeight(height);
    }

  
    const getMyComplaints=(id)=>{
      
      axios.get(config.serverURL+'/api/policestation/complaintListForPS/'+id,{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
      }).then((response)=>{
        const result=response['data']
        setComplaints(result)
      }).catch((error)=>{
        toast.error(error)
      })
    }
    const furtherDetails=(id)=>{
      navigate('/policestation/complaint/details', {state : {complaintId:id}})
    }
    const inprocessComplaint=(ide)=>{
      window.alert('Do you wish to update status? If yes click on OK button otherwise press esc')
      const body={id:ide,complaintStatus:'INPROCESS'}
      
      axios.put(config.serverURL+'/api/policestation/complaint/updatestatus',body,{
        headers:{'Authorization': 'Bearer '+sessionStorage['token']}
      }).then((response)=>{
        toast.success(response)
        getMyComplaints(id);
      }).catch((error)=>{
        toast.error(error)
      })
    }

    const resolvedComplaint=(ide)=>{
      window.alert('Do you wish to update status? If yes click on OK button otherwise press esc')
      const body={id:ide,complaintStatus:'RESOLVED'}
      
      axios.put(config.serverURL+'/api/policestation/complaint/updatestatus',body,{
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
      <>
      
      <div>

        {/* List of Complaints */}
        
        <div className="container">
        <h3 style={{textAlign:'center',margin:20,height:menuHeight}}>Complaint List</h3>
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
                    <td>{complaint.caseTypeSelected.caseType==='MOTOR_VEHICLE_THEFT'  &&
                    <Button onClick={()=>furtherDetails(complaint.id)} title='Details' />} 
                    {complaint.caseTypeSelected.caseType==='MISSING_OR_STOLEN_MOBILE_PHONES'  &&
                    <Button onClick={()=>furtherDetails(complaint.id)} title='Details' />}
                    {complaint.caseTypeSelected.caseType==='MISSING_CHILD_OR_PERSON' &&
                    <Button onClick={()=>furtherDetails(complaint.id)} title='Details' />}
                    </td>
                    <td>
                      {complaint.complaintStatus==='PENDING'&& 
                      <Button onClick={()=>inprocessComplaint(complaint.id)} title='Update To INPROCESS' />
                      }
                       {complaint.complaintStatus==='INPROCESS'&& 
                      <Button onClick={()=>resolvedComplaint(complaint.id)} title='Update To RESOLVED' />
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
         </div>

      </div>
      </>
    )


}
export default PsComplaintList