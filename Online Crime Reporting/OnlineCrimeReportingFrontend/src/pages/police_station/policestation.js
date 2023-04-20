import { useNavigate,useLocation } from "react-router-dom"
import Police from "./police"
import { Container } from "react-bootstrap"
import PieChart from "../../components/piechartPs";
//import "../../components/full.css"
import { useEffect } from 'react';
import { useState } from 'react';




const Policestation=()=>{
    const navigate=useNavigate()
    const [id,setId]=useState()
   

    const location=useLocation()
    const psId=location.state.userId.id

    const [menuHeight, setMenuHeight]= useState(null) 
    function calcHeight(el){
        const height=el.offsetHeight;
         setMenuHeight(height);
    }
    useEffect(()=>{
        
        const { userId }=location.state;
        setId(userId)
        console.log(userId);
     },[])
 

    const policeList=()=>{
        console.log("inside police list ")
        navigate('/police/getallpolice',{state : {userId:id}})
    }

    const viewComplaint=()=>{
        console.log("inside complaint  list")
        navigate('/policestation/complaintListForPS',{state : {userId:id}})
    }
    const viewEmergencyComplain=()=>{
        console.log("inside emergency complaint list")
        navigate('/emergencycomplaintForPoliceStation/'+id,{state : {userId:id}})
    }
    const criminalRecord=()=>{
        console.log("inside criminal list")
        navigate('/criminal/getcriminals',{state : {userId:id}})
    }
    const feedback=()=>{
        console.log("inside feedback")
        //navigate('/police/getallpolice')
    }


   

    return(
        <>
        
        <Container fluid style={{ height: menuHeight, width: "100%" }}>
            <div style={{marginTop:100}}>
            <div style={styles.container}>
                <button onClick={policeList} style={styles.policeStationButton}>Display Staff</button>
                <button  onClick={viewComplaint} style={styles.policeStationButton}>View Complaint</button>
                <button  onClick={viewEmergencyComplain} style={styles.policeStationButton}>View emergency Complaint</button>
                <button  onClick={criminalRecord} style={styles.policeStationButton}>Criminal Record</button>
            </div>

            <div>
            
            <div style={{position:'absolute',left:'25%'}}>

            <PieChart></PieChart>
            </div>
         
          </div>
        </div>
        </Container>
         </>
    )

}

const styles = {
    container: {
      width: 800,
      
      padding: 20,
      position: 'relative',
      top: 0,
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
    policeStationButton: {
      position: 'relative',
      width: '100%',
      height: 60,
      backgroundColor: '#795da3',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 20,
    }
}

export default Policestation