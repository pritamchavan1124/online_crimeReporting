import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config";
import {DropdownButton, Dropdown} from "react-bootstrap"

import CTDropDownElement from "../../components/caseTypeList"

const AdminAddCriminal = () => {
  //get all criminal inputs
  const [crName, setCrName] = useState("");
  const [crAge, setCrAge] = useState("");
  const [crGender, setCrGender] = useState("");
  const [caseType, setCaseType] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  //const location = useLocation();

  const [caseTypeName,setCaseTypeName] = useState("Select Complaint Type")
  const [ctList,setCtList] = useState([]);
  const [caseTypeSelected,setCaseTypeSelected]=useState(0)


  const handleCaseTypeDropdown=(id, caseType)=>{
    setCaseTypeSelected(id);
    setCaseTypeName(caseType);
    // console.log("CaseType ID selected:");
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

  useEffect(()=>{
    getcaseTypeListFromServer();
    //const { userId }=location.state;
    //console.log(userId);
  },[])

  const addCriminal = () => {
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
        .post(config.serverURL + "/criminal/addCriminal", {
          crName,
          crAge,
          crGender,
          caseType,
          address,
        },{
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
        })
        .then((response) => {
          const result = response.data;

          if (result["status"] === "error") {
            toast.error("failed to add criminal");
          } else {
            toast.success("Criminal added successfully");

            navigate("/criminalRecords");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  return (
    <div className="container" style={{ marginTop: 20 }}>
      <h3 style={{ textAlign: "center", marginBottom: 50 }}> Add Criminal</h3>

      <div className="mb-3">
        <label> Name </label>
        <input
          onChange={(e) => {
            setCrName(e.target.value);
          }}
          className="form-control"
          type="text"
        />
      </div>

      <div className="mb-3">
        <label> Age </label>
        <input
          onChange={(e) => {
            setCrAge(e.target.value);
          }}
          className="form-control"
          type="text"
        />
      </div>

      <div className="mb-3">
        <label> Gender </label>
        <input
          onChange={(e) => {
            setCrGender(e.target.value);
          }}
          className="form-control"
          type="text"
        />
      </div>

      <div className="mb-3">
        <label> Case Type </label>
        <input
          onChange={(e) => {
            setCaseType(e.target.value);
          }}
          className="form-control"
          type="text"
        />
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

      <div className="mb-3">
        <label> Address </label>
        <input
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          className="form-control"
          type="text"
        />
      </div>

      <div className="mb-3" style={{ marginTop: 40 }}>
        <div>
          <Link to="/criminal/getcriminals">Back to Criminal Records</Link>
        </div>
        <button onClick={addCriminal} style={styles.saveButton}>
          {" "}
          Save{" "}
        </button>
      </div>
    </div>
  );
};


const styles = {
  container: {
    width: 400,
    height: 300,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "#db0f62",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
  },
  saveButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#db0f62",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};
export default AdminAddCriminal
