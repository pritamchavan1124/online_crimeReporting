
import { useState, useEffect } from "react"
import TextArea from "../../components/textArea"
//import Dropdown from "../../components/dropdown"
import {DropdownButton, Dropdown} from "react-bootstrap"
//import PSDropDownElement from "../../components/policeStationList"
import CTDropDownElement from "../../components/EcaseTypeList "
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
//import VTDropDownElement from "../../components/vehicleTypeList"
import Input from "../../components/input"
import config from "../../config"

const UserEc=()=>{

    const navigate=useNavigate()

    const[ecName,setEcName]=useState()
    const[ecMobile,setEcMobile]=useState()
    const[ecLocation,setEcLocation]=useState()
    const[ecTime,setEcTime]=useState()
    const[description,setDescription]=useState('')
    const [addressId, setAddressId] = useState("");
  
    const [addressList, setAddressList] = useState([]);
 const [addressName, setAddressName] = useState("Select Address");

 const [policeStationName,setPoliceStationName]=useState("Select Police Station Name")
    const [policeStationId,setPoliceStationId]=useState(0)
    //to get policeStation List from server
    const [psList,setPsList] = useState([])

    const [caseTypeName,setCaseTypeName] = useState("Select Complaint Type")
    //to get case type List from server
    const [ctList,setCtList] = useState([]);
    const [ecTypeId,setCaseTypeSelected]=useState(0)


    //Following function is used for auto-Adjustable height of div-container
    const [menuHeight, setMenuHeight]= useState(null) 
    function calcHeight(el){
        const height=el.offsetHeight;
         setMenuHeight(height);
    }



    let addressID = 0;
  let regionName = "";
  let pinCodeVal = 0;
  let address = { id: addressId };
  const handleAddressDropdown = (id, region1, pinCode1) => {
    console.log("this is what i getting", id, region1);
    addressID = id;
    setAddressId(addressID);
    const newRegName = region1 + "";
    regionName = newRegName;
    pinCodeVal = pinCode1;
    address = { id: addressID };
    console.log("Address Id Selected=", addressID);
    console.log("Address region =", regionName);
    console.log("Address pincode =", pinCodeVal);
    setAddressName(regionName + " " + pinCodeVal);
  };


  let policeStationID =0;
  let policeStnName ="";

  const handlePoliceStationDropdown=(id, psName)=>{
    console.log("this is what i getting",id, psName)
        policeStationID=id;
        setPoliceStationId(policeStationID);
        const newPSName=psName+"";
       policeStnName=newPSName;
      
   console.log("Police stn Id =",policeStationID)
   console.log("Police Stn Name =",policeStnName)
    setPoliceStationName(newPSName);
    console.log("PS NAME",policeStationName)
    console.log("Police Station ID selected:"+policeStationID);
  //  console.log("CaseType ID selected:"+caseTypeId);
   }

   const handleCaseTypeDropdown=(id, caseType)=>{
    setCaseTypeSelected(id);
    setCaseTypeName(caseType);
    // console.log("CaseType ID selected:");
    }
   
   const getPSListFromServer=()=>{
    const url=config.serverURL+`/api/home/policestation/getpolicestations`
     axios.get(url)
     .then((response)=>{
        const result=response['data']
        console.log(result)
       // if(result['status']==='success')
        setPsList(result)        
     }).catch((error)=>{
        toast.error(error)

     })
    }

    const getAddressList = () => {
        const url = config.serverURL + `/api/home/addresses`;
        axios
          .get(url)
          .then((response) => {
            const result = response["data"];
            console.log(result);
            setAddressList(result);
          })
          .catch((error) => {
            toast.error(error);
          });
      };

      const getcaseTypeListFromServer=()=>{
        const url=config.serverURL+`/api/home/ecasetype/getecasetypes`
         axios.get(url).then((response)=>{
            const result=response['data']
            console.log(result)
            //if(result['status']==='success')
            setCtList(result)        
         }).catch((error)=>{
            toast.error(error)
    
         })
        }

const saveEc=()=>{
    const url=config.serverURL+`/api/home/emergencycomplaint/add`
    console.log(ecName,ecMobile,ecLocation,ecTime,description,addressId,ecTypeId,policeStationId)
    const body={
        ecName,ecMobile,ecLocation,ecTime,description,addressId,ecTypeId,policeStationId   
}
    axios.post(url,body)
.then((response) => {
    toast.success("Emergency complaint registered successfully");
    navigate('/')
    
  })
  .catch((error) => {
    console.log("Something went wrong", error);
    toast.error("Emergency complaint registration failed")
  });
}

  useEffect(() => {
    getAddressList();
    getPSListFromServer();
    getcaseTypeListFromServer();
  }, []);



    return(
        <div style={{ marginTop: 40,height:menuHeight }}>
      <div style={styles.container}>
        <h3 style={{ textAlign: "center", margin: 10 }}>Lodge Emergency Complaint </h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            onChange={(event) => {
              setEcName(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            onChange={(event) => {
              setEcMobile(event.target.value);
            }}
            className="form-control"
            type="number"
          />
        </div>

        <div className="mb-3" style={{display:'flex'}}>
       <div className="btn-group">
         <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
            Police Station Name
        </button>
        <ul className="dropdown-menu dropdown-menu-lg-end">
            {psList.map((ps)=>{
                return (
                <li><button className="dropdown-item" type="button" onClick={()=>handlePoliceStationDropdown(ps.id,ps.name)}>{ps.name}</button></li>
                )
            })}
         </ul>
     </div>
     <div style={{marginLeft:10, width:'100%'}}><input value={policeStationName} className="form-control" disabled/></div>
     </div>

        <div className="mb-3">
                <label>Location</label>
                <input onChange={(event) => {setEcLocation(event.target.value) }}
                className = 'form-control' type='text'  />
          </div> 

          <Input onChange={(e)=>{setEcTime(e.target.value)}} title='Approx/ Rough time of Crime' type='time' />
        
          <div className="mb-3">
        <label>Type of Complaint</label>
        <DropdownButton title={caseTypeName} variant='success'>
        {ctList.map((ct)=>{
            return(
                <CTDropDownElement ct={ct} handleCaseTypeDropdown={handleCaseTypeDropdown} />
            )
        })
        }
       </DropdownButton>
       </div>

        <div className="mb-3" style={{ display: "flex" }}>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              Select Address
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              {addressList.map((ad) => {
                return (
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() =>
                        handleAddressDropdown(ad.id, ad.region, ad.pinCode)
                      }
                    >
                      {ad.region + " " + ad.pinCode}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div style={{ marginLeft: 10, width: "100%" }}>
            <input value={addressName} className="form-control" disabled />
          </div>
        </div>
        <TextArea onChange={(e)=>{setDescription(e.target.value)}} title='Description of Crime' lines='5' />



        <div className="mb-3">
          
          <button onClick={saveEc} style={styles.signupButton}>
            {" "}
            Register {" "}
          </button>
        </div>
      </div>
    </div>
  );
};


  

const styles = {
    container: {
      width: 800,
      padding: 20,
      position: "relative",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: "auto",
      borderColor: "#795da3",
      borderRadius: 10,
      broderWidth: 1,
      borderStyle: "solid",
      boxShadow: "1px 1px 20px 5px #C9C9C9",
    },
    signupButton: {
      position: "relative",
      width: "100%",
      height: 40,
      backgroundColor: "#795da3",
      color: "white",
      borderRadius: 5,
      border: "none",
      marginTop: 10,
    },
  };
export default UserEc