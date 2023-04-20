import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import {DropdownButton, Dropdown} from "react-bootstrap"
import CTDropDownElement from "../../components/caseTypeList"
import { toast } from "react-toastify";
import config from "../../config";


const AddCriminal = () => {
  //get all criminal inputs
  const [crName, setCrName] = useState("");
  const [crAge, setCrAge] = useState("");
  const [crGender, setCrGender] = useState("");
  const [caseType, setCaseType] = useState("");
  const[addressId, setAddressId] = useState();
 
  const navigate = useNavigate();
  const location=useLocation()

  //Following function is used for auto-Adjustable height of div-container
  const [menuHeight, setMenuHeight]= useState(null) 
  function calcHeight(el){
      const height=el.offsetHeight;
       setMenuHeight(height);
  }

  const [caseTypeName,setCaseTypeName] = useState("Select Complaint Type")
  //to get policeStation List from server
  const [ctList,setCtList] = useState([]);
  const [caseTypeSelected,setCaseTypeSelected]=useState(0)

  const handleCaseTypeDropdown=(id, caseType)=>{
    setCaseTypeSelected(id)
    setCaseTypeName(caseType);
    // console.log("CaseType ID selected:");
    }


  const [addressName,setAddressName]=useState("Select Address")
  const[addressList,setAddressList]=useState([])
  const[cd,setcd]=useState(0)

  let addressID=0;
  let regionName ="";
  let pinCodeVal =0;
  let address={addressId} 
  const handleAddressDropdown=(id, region1, pinCode1)=>{
      console.log("this is what i getting",id, region1)
         addressID=id;
        setAddressId(addressID);
          const newRegName=region1+"";
        regionName=newRegName;
        pinCodeVal=pinCode1;
        address={id:addressID}
     console.log("Address Id Selected=",addressID)
     console.log("Address region =",regionName)
     console.log("Address pincode =",pinCodeVal)
     setAddressName(regionName+" "+pinCodeVal);
     }

  const addCriminal = (e) => {
    e.preventDefault();
    if (crName.length === 0) {
      toast.error("please enter name");
    } else if (crAge.length === 0) {
      toast.error("please enter age");
    } else if (crGender.length === 0) {
      toast.error("please enter gender");
    } else if (crGender.length === 0) {
      toast.error("please enter case type");
    } else if (address.length === 0) {
      toast.error("please enter address");
    } else {
      axios
        .post(config.serverURL + "/api/policestation/criminal/add", {
          crName,
          crAge,
          crGender,
          caseType,
          addressId,
        },{
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] }
        })
        .then((response) => {
          const result = response.data;
          console.log("Criminal added  successfully", response.data);

          if (result["status"] === "error") {
            toast.error("failed to add criminal");
          } else {
            toast.success("Criminal added successfully");

            navigate("/criminal/getcriminals");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  const getAddressList=()=>{
    const url=config.serverURL+`/api/home/addresses`;
    axios.get(url).then((response)=>{
    const result=response['data']
    console.log(result)
    setAddressList(result) 
    }).catch((error)=>{
    toast.error(error)
    })
  }

  
  const getcaseTypeListFromServer=()=>{
    const url=config.serverURL+`/api/policestation/casetype/getcasetypes`
     axios.get(url,{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
      }).then((response)=>{
        const result=response['data']
        console.log(result)
        //if(result['status']==='success')
        setCtList(result)        
     }).catch((error)=>{
        toast.error(error)

     })
    }

  useEffect(() => {
    getcaseTypeListFromServer()
    getAddressList();
    }, []);



  return (

    <>
    
    <div style={{padding:20,height:menuHeight}}>
    <div style={styles.container}>
      <hr></hr>
      <div>
        <h3 className="text-center"> Add Criminal</h3>

        <div>
          <label> Name </label>
          <input
            onChange={(e) => {
              setCrName(e.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        <div>
          <label> Age </label>
          <input
            onChange={(e) => {
              setCrAge(e.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        <div style={{padding:20}}>
                    <input className="mr-2"
                        type="radio" 
                        // className="form-control col-4"
                        id="crGender"
                        checked={crGender==='Male'}
                        value="Male" style={{marginLeft:20}}
                        onChange={(e) => setCrGender(e.target.value)}

                        // placeholder="Enter gender"
                    /><span style={{marginLeft:5}}>Male</span>
                    <input className="mr-2"
                        type="radio" 
                        //className="form-control col-4"
                        id="crGender"
                        checked={crGender==='Female'}
                        value="Female" style={{marginLeft:20}}
                        onChange={(e) => setCrGender(e.target.value)}
                        
                    /><span style={{marginLeft:5}}>Female</span>
                    <input className="mr-2"
                        type="radio" 
                        //className="form-control col-4"
                        id="crGender"
                        checked={crGender==='Other'}
                        value="Other" style={{marginLeft:20}}
                        onChange={(e) => setCrGender(e.target.value)}
                        
                    /><span style={{marginLeft:5}}>Other</span>
                </div>

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

        <div className="mb-3" style={{display:'flex'}}>
          <div className="btn-group">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                Select Address 
            </button>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                {addressList.map((ad)=>{
                    return (
                        <li><button className="dropdown-item" type="button" onClick={()=>handleAddressDropdown(ad.id,ad.region,ad.pinCode)}>{ad.region+" "+ad.pinCode}</button></li>
                      )
                  })}
              </ul>
          </div>
          <div style={{marginLeft:10, width:'100%'}}><input value={addressName} className="form-control" disabled/></div>
        </div>

        <div style={{ marginTop: 40 }}>
          <div>
            <Link to="/criminal/criminalRecords">Back to Criminal Records</Link>
          </div>
          <button onClick={addCriminal} style={styles.saveButton}>
            {" "}
            Save{" "}
          </button>
        </div>
      </div>
    </div>
    </div>
    </>

  );
};

const styles = {
  container: {
    width: '60%',
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
  saveButton: {
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
export default AddCriminal;
