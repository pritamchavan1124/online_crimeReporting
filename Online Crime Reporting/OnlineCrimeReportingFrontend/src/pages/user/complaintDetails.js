import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config";
import Button from "../../components/button"
import loading from "../../imagesForTitle/loading.gif"
const ComplaintDetails=()=>{
  const location=useLocation()
  const navigate=useNavigate()
 
  const loadingGif=loading;

 const [id,setId]=useState()
 const [isLoading, setLoading] = useState(true);
  //console.log(id)
  const [entireComplaint,setEntireComplaint]=useState()

 
    //Following function is used for auto-Adjustable height of div-container
    const [menuHeight, setMenuHeight]= useState(null) 
    function calcHeight(el){
        const height=el.offsetHeight;
         setMenuHeight(height);
    }

    
    const getFurtherDetails=(complaintId)=>{
      axios.get(config.serverURL+'/api/user/complaint/details/'+complaintId,{
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
        }).then((response)=>{
          const result =response['data']
          console.log(result)
          setEntireComplaint(result)
          setLoading(false)
        }).catch((error)=>{
          toast.error(error)
        })
   }
   
    useEffect(()=>{
      const { complaintId }=location.state;
     console.log(complaintId);
     setId(complaintId);
    getFurtherDetails(complaintId);
     },[])

     
     const navigateBack=(id)=>{
      navigate('/user/myhome', {state : {userId:id}}) 
     }

     if (isLoading) {
      return <div className="container" style={{display: 'flex',
        height: '100vh',
        width: '100vw', 
        alignItems: 'center',
        justifyContent: 'center',}}><img src={loadingGif} alt='loading img'></img></div>;
    }
  

     return (
        
        <div className="container" style={{ height:menuHeight}}>           
                <div style={styles.container}>
                <h3 style={{textAlign:'center', margin:20, color:'#795da3'}}>COMPLAINT DETAILS</h3>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><b>Complaint Id:</b></td>
                      <td>{entireComplaint.regComplaint['id']}</td>
                      <td><b>Reporting Date:</b></td>
                      <td>{entireComplaint.regComplaint.reportingDate}</td>
                    </tr>
                    <tr> 
                      <td><b>Case Type:</b></td>
                      <td>{entireComplaint.regComplaint.caseTypeSelected.caseType}</td>
                      <td><b>Location:</b></td>
                      <td>{entireComplaint.regComplaint.location}</td>
                    </tr>
                  </tbody>
                </table>
                {entireComplaint.regComplaint.caseTypeSelected.caseType==='MISSING_CHILD_OR_PERSON' && 
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><b>Name of Missing Person:</b></td>
                      <td>{entireComplaint.name}</td>
                      <td><b>Age:</b></td>
                      <td>{entireComplaint.age}</td>
                    </tr>
                    <tr>
                      <td><b>Gender:</b></td>
                      <td>{entireComplaint.gender}</td>
                      <td><b>Height:</b></td>
                      <td>{entireComplaint.height}</td>
                    </tr>
                  </tbody>
                </table>}
                {entireComplaint.regComplaint.caseTypeSelected.caseType==='MISSING_OR_STOLEN_MOBILE_PHONES' && 
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><b>IMEI No. of Missing Mobile Phone:</b></td>
                      <td>{entireComplaint.imei}</td>
                      <td><b>Company:</b></td>
                      <td>{entireComplaint.company}</td>
                    </tr>
                    <tr>
                      <td><b>Model:</b></td>
                      <td>{entireComplaint.model}</td>
                      <td><b>Sim Card Company Name:</b></td>
                      <td>{entireComplaint.simCardCompanyName}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}><b>Mobile No. of Sim lost with Mobile Phone:</b></td>
                      <td colSpan={2}>{entireComplaint.mobileNoInMissingMobile}</td>
                    </tr>
                  </tbody>
                </table>}
                {entireComplaint.regComplaint.caseTypeSelected.caseType==='MOTOR_VEHICLE_THEFT' && 
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td><b>Registration No. of Missing Vehicle:</b></td>
                      <td>{entireComplaint.regNo}</td>
                      <td><b>Company:</b></td>
                      <td>{entireComplaint.companyName}</td>
                    </tr>
                    <tr>
                      <td><b>Chassis No.:</b></td>
                      <td>{entireComplaint.chassisNo}</td>
                      <td><b>Model:</b></td>
                      <td>{entireComplaint.modelName}</td>
                    </tr>
                    <tr>
                      <td><b>Type of Vehicle:</b></td>
                      <td>{entireComplaint.vehicleType}</td>
                      <td></td><td></td>
                    </tr>
                  </tbody>
                </table>}
                <Button onClick={()=>navigateBack(entireComplaint.regComplaint.complainant.id)} title='Back'/>
                </div>
        </div>
     )
}
const styles={
    
    container: {
        width: 800,
        padding: 20,
        position: 'relative',
        top: 50,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        borderColor: '#795da3',
        borderRadius: 10,
        broderWidth: 1,
        borderStyle: 'solid',
        boxShadow: '1px 1px 20px 5px #C9C9C9',
      },
}
export default ComplaintDetails