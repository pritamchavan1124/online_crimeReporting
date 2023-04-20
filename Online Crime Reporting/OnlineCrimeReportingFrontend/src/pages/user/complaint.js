import Input from "../../components/input";
import Button from "../../components/button";
import { useState, useEffect } from "react";
import TextArea from "../../components/textArea";
//import Dropdown from "../../components/dropdown"
import { DropdownButton, Dropdown } from "react-bootstrap";
//import PSDropDownElement from "../../components/policeStationList"
import CTDropDownElement from "../../components/caseTypeList";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
//import VTDropDownElement from "../../components/vehicleTypeList"
import config from "../../config";

const Complaint = () => {
  //Following function is used for auto-Adjustable height of div-container
  const [menuHeight, setMenuHeight] = useState(null);
  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  //Following Date is used for setting Reporting Date.
  var currentDate = new Date();
  var reportingDate = currentDate.toISOString().slice(0, 10);
  // if((currentDate.getMonth()+1)<10){
  //     reportingDate=currentDate.getFullYear()+'-0'+(currentDate.getMonth()+1)+'-'+currentDate.getDate()
  // }else{
  //     reportingDate=currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate()
  // }

  //Fields of Complaint
  const [description, setDescription] = useState("");
  const [crimeDate, setCrimeDate] = useState();
  const [crimeTime, setCrimeTime] = useState("");
  const [location, setLocation] = useState("");
  const [victimName, setVictimName] = useState("");
  const [suspect, setSuspect] = useState("");
  const [mobileNo, setmobileNo] = useState();
  const [complainantId, setComplainantId] = useState(0);

  //MCP:name, age, gender, height--------------------------------------------------------------
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState();

  //MSP:imei,company,model,simCardCompanyName,mobileNo--------------------------------------------------------------
  const [imei, setImei] = useState();
  const [company, setCompany] = useState("");
  const [model, setModel] = useState("");
  const [simCardCompanyName, setSimCardCompanyName] = useState("");
  const [mobileNoInMissingMobile, setMobileNoInMissingMobile] = useState();

  //MSV:regNo, companyName chassisNo modelName vehicleType--------------------------------------------------------------
  const [regNo, setRegNo] = useState();
  const [companyName, setCompanyName] = useState("");
  const [chassisNo, setChassisNo] = useState();
  const [modelName, setModelName] = useState("");

  const [vehicleTypeName, setVehicleTypeName] = useState(); //Will go for Static dropdown
  const typeOfVehicleList = [
    "AMBULANCE",
    "BUS",
    "CAR",
    "EARTH_MOVER",
    "EXCAVATOR",
    "JEEP",
    "LORRY",
    "METADOR",
    "ROAD_ROLLER",
    "STATION_WAGON",
    "VAN",
    "TAXI",
    "TEMPO",
    "THREE_WHEELER",
    "TRACTOR",
    "TRAILOR",
    "TRUCK",
    "TWO_WHEELER",
    "UNKNOWN",
  ];

  const [relationWithVictim, setRelationWithVictim] = useState(
    "Select Relation with victim"
  ); //Will go for Static dropdown
  const relWithVictimList = [
    "SELF",
    "PARENT",
    "FRIEND",
    "NEIGHBOUR",
    "FAMILY_MEMBER",
    "GUARDIAN",
    "OTHER",
  ];
  //Following relates to dropdown--------------------------------------------------------------

  const [policeStationName, setPoliceStationName] = useState(
    "Select Police Station Name"
  );
  const [policeStationId, setPoliceStationId] = useState(0);
  //to get policeStation List from server
  const [psList, setPsList] = useState([]);

  const [caseTypeName, setCaseTypeName] = useState("Select Complaint Type");
  //to get policeStation List from server
  const [ctList, setCtList] = useState([]);
  const [caseTypeSelected, setCaseTypeSelected] = useState(0);
  //--------------------------------------------------------------

  let policeStationID = 0;
  let policeStnName = "";

  let vehicleTypeSel = "";
  let relWVName = "";

  const navigate = useNavigate();
  const locationn = useLocation();

  //let policeStation={id:policeStationId}
  // let complainant={id:userId}
  // let caseTypeSelected={
  //     id:caseTypeId,
  //     caseType:caseTypeName
  // }

  let stolenVehicle = {
    regNo: regNo,
    companyName: companyName,
    chassisNo: chassisNo,
    modelName: modelName,
    vehicleType: vehicleTypeName,
  };

  let missingBeing = {
    name: name,
    age: age,
    gender: gender,
    height: height,
  };

  let missingMobile = {
    imei: imei,
    company: company,
    model: model,
    simCardCompanyName: simCardCompanyName,
    mobileNoInMissingMobile: mobileNoInMissingMobile,
  };

  const handlePoliceStationDropdown = (id, psName) => {
    console.log("this is what i getting", id, psName);
    policeStationID = id;
    setPoliceStationId(policeStationID);
    const newPSName = psName + "";
    policeStnName = newPSName;

    console.log("Police stn Id =", policeStationID);
    console.log("Police Stn Name =", policeStnName);
    setPoliceStationName(newPSName);
    console.log("PS NAME", policeStationName);
    console.log("Police Station ID selected:" + policeStationID);
    //  console.log("CaseType ID selected:"+caseTypeId);
  };
  const handleCaseTypeDropdown = (id, caseType) => {
    setCaseTypeSelected(id);
    setCaseTypeName(caseType);
    // console.log("CaseType ID selected:");
  };

  const handleVehicleTypeDropdown = (vehiclet) => {
    console.log("selected Vehicle TYPE", vehiclet);
    const newVtype = vehiclet + "";
    vehicleTypeSel = newVtype;
    setVehicleTypeName(newVtype);
    console.log("Selected Vehicle TypeAFTER: " + vehicleTypeSel);
    console.log("selected Vehicle TYPE Name", vehicleTypeName);
  };

  const handleRelationWIthVictimDropdown = (relWithVict) => {
    console.log("selected Rel with victim", relWithVict);
    const newrelationWithVictim = relWithVict + "";
    relWVName = newrelationWithVictim;
    setRelationWithVictim(relWVName);

    console.log("Selected Rel with victim: " + relationWithVictim);
    console.log("Selected Rel with victim: " + relWVName);
  };

    //Following calls are given to get the PS, CT list
    const getPSListFromServer=()=>{
    const url=config.serverURL+`/api/user/policestation/getpolicestations`
     axios.get(url,{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
      }).then((response)=>{
        const result=response['data']
        console.log(result)
       // if(result['status']==='success')
        setPsList(result)        
     }).catch((error)=>{
        toast.error(error)

     })
    }
    const getcaseTypeListFromServer=()=>{
    const url=config.serverURL+`/api/user/casetype/getcasetypes`
     axios.get(url,{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
      }).then((response)=>{
        const result=response['data']
        console.log(result)
        //if(result['status']==='success')
        setCtList(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  useEffect(() => {
    getPSListFromServer();
    getcaseTypeListFromServer();
    const { userId } = locationn.state;
    setComplainantId(userId);
    console.log(userId);
  }, []);

  //let complainant={id:complainantId}

  const addComplaint = () => {
    console.log(relWVName);
    const body = {
      reportingDate,
      description,
      crimeDate,
      crimeTime,
      location,
      victimName,
      suspect,
      mobileNo,
      relationWithVictim,
      policeStationId,
      stolenVehicle,
      missingBeing,
      missingMobile,
      caseTypeSelected,
      complainantId,
    };
    console.log(body);
    if (
      policeStationName === "Select Police Station Name" &&
      policeStationId == 0
    ) {
      toast.error("Select the Police Station");
    } else if (complainantId == 0) {
      toast.error("Invalid Complainant");
    } else if (
      caseTypeName === "Select Complaint Type" &&
      caseTypeSelected == 0
    ) {
      toast.error("Select the Type of Complaint");
    } else if (crimeDate === "" || crimeDate > reportingDate) {
      toast.error("Crime Date must be before Reporting date");
    } else if (location.length === 0) {
      toast.error("Enter the Crime Location");
    } else if (victimName.length === 0) {
      toast.error("Enter the Victime name");
    } else if(mobileNo.length===0 || mobileNo.length!==10){
      toast.error('Please re-enter your new Mobile No. & ensure its of 10 digit only')
    } else {
      axios
        .post(config.serverURL + "/api/user/complaint/add", body, {
          headers: { Authorization: "Bearer " + sessionStorage["token"] },
        })
        .then((response) => {
          const result = response.data;
          console.log(result);
          toast.success("Complaint registered Succesfully");
          navigate("/user/myhome", { state: { userId: complainantId } });
        })
        .catch((error) => {
          toast.error(error);
          navigate("/user/myhome", { state: { userId: complainantId } });
        });
    }
  };
  return (
    <div style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}>
      <div className="container">
        <h3 style={{ textAlign: "center", margin: 20, color: "#795da3" }}>
          COMPLAINT LODGING
        </h3>
        <h4 style={{ textAlign: "center", margin: 20, color: "red" }}>
          NOTE: REPORTING FAKE COMPLAINT IS SERIOUS POLICE OFFENCE.
        </h4>

        <div style={styles.container}>
          <div className="mb-3">
            <label>Date of Complaint</label>
            <input
              value={reportingDate}
              className="form-control"
              readOnly
              disabled
            />
          </div>
          {/*Police Station NAme & Type of Complaint drop down to be provided*/}
          {/*<Dropdown title='Select Police Station Name' options={list} /> */}
          {/* <div className="mb-3"> */}
          {/* <label>Police Station Name</label> */}
          {/* <DropdownButton title={policeStationName} >
        {psList.map((ps)=>{
            return(
                <PSDropDownElement ps={ps} handlePoliceStationDropdown={handlePoliceStationDropdown} />
            )
        })
        }
       </DropdownButton> */}
          <div className="mb-3" style={{ display: "flex" }}>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                Police Station Name
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                {psList.map((ps) => {
                  return (
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() =>
                          handlePoliceStationDropdown(ps.id, ps.name)
                        }
                      >
                        {ps.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div style={{ marginLeft: 10, width: "100%" }}>
              <input
                value={policeStationName}
                className="form-control"
                disabled
              />
            </div>
          </div>
          {/* </div> */}
          <div className="mb-3">
            <label>Type of Complaint</label>
            <DropdownButton title={caseTypeName} variant="success">
              {ctList.map((ct) => {
                return (
                  <CTDropDownElement
                    ct={ct}
                    handleCaseTypeDropdown={handleCaseTypeDropdown}
                  />
                );
              })}
            </DropdownButton>
            {/* Need of Conditional Rendering of for rendering the 3 prominent subCase Types*/}
            {caseTypeName === "MISSING_CHILD_OR_PERSON" && (
              <div>
                <Input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  title="Name of missing person*"
                />
                <Input
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  title="Age of missing person*"
                  type="number"
                />
                <div className="mb-3">
                  <label>Select Gender*</label>
                  <div>
                    <input
                      className="mr-2"
                      type="radio"
                      id="gender"
                      checked={gender === "Male"}
                      value="Male"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span style={{ marginLeft: 5 }}>Male</span>
                    <input
                      className="mr-2"
                      type="radio"
                      //className="form-control col-4"
                      id="gender"
                      checked={gender === "Female"}
                      value="Female"
                      style={{ marginLeft: 20 }}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span style={{ marginLeft: 5 }}>Female</span>
                    <input
                      className="mr-2"
                      type="radio"
                      //className="form-control col-4"
                      id="gender"
                      checked={gender === "Other"}
                      value="Other"
                      style={{ marginLeft: 20 }}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span style={{ marginLeft: 5 }}>Other</span>
                  </div>
                </div>
                {/* <Input onChange={(e)=>{setGender(e.target.value)}} title='Gender of missing person*' /> */}
                <Input
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                  title="Height of missing person*"
                  type="number"
                />
              </div>
            )}
            {caseTypeName === "MISSING_OR_STOLEN_MOBILE_PHONES" && (
              <div>
                <Input
                  onChange={(e) => {
                    setImei(e.target.value);
                  }}
                  title="IMEI No. of missing mobile*"
                  type="number"
                />
                <Input
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                  title="Company name of missing mobile*"
                />
                <Input
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                  title="Model name of missing mobile*"
                />
                <Input
                  onChange={(e) => {
                    setSimCardCompanyName(e.target.value);
                  }}
                  title="SimCard Vendor name of missing mobile*"
                />
                <Input
                  onChange={(e) => {
                    setMobileNoInMissingMobile(e.target.value);
                  }}
                  title="Mobile No. of missing mobile*"
                  type="number"
                />
              </div>
            )}
            {caseTypeName === "MOTOR_VEHICLE_THEFT" && (
              <div>
                <Input
                  onChange={(e) => {
                    setRegNo(e.target.value);
                  }}
                  title="Reg No. of Stolen Vehicle*"
                />
                <Input
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  title="Company name of Stolen Vehicle*"
                />
                <Input
                  onChange={(e) => {
                    setModelName(e.target.value);
                  }}
                  title="Model name of Stolen Vehicle*"
                />
                <Input
                  onChange={(e) => {
                    setChassisNo(e.target.value);
                  }}
                  title="Chassis No. of Stolen Vehicle*"
                />
                <div className="mb-3" style={{ display: "flex" }}>
                  {/* <label>Type of Stolen Vehicle</label> */}
                  {/* <DropdownButton title={vehicleType} >
                {typeOfVehicleList.map((vt)=>{
                return(
                    <VTDropDownElement vt={vt} handleVehicleTypeDropdown={handleVehicleTypeDropdown} />
                )
                })}
                </DropdownButton> */}
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-secondary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      data-bs-display="static"
                      aria-expanded="false"
                    >
                      Type of Stolen Vehicle
                    </button>
                    <ul className="dropdown-menu dropdown-menu-lg-end">
                      {typeOfVehicleList.map((vt) => {
                        return (
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => handleVehicleTypeDropdown(vt)}
                            >
                              {vt}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div style={{ marginLeft: 10, width: "100%" }}>
                    <input
                      value={vehicleTypeName}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <TextArea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            title="Description of Crime"
            lines="5"
          />
          <Input
            onChange={(e) => {
              setCrimeDate(e.target.value);
            }}
            title="Date of Crime*"
            type="date"
          />
          <Input
            onChange={(e) => {
              setCrimeTime(e.target.value);
            }}
            title="Approx/ Rough time of Crime"
            type="time"
          />
          <Input
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            title="Location of Crime*"
          />
          <Input
            onChange={(e) => {
              setVictimName(e.target.value);
            }}
            title="Victim Name*"
          />
          <Input
            onChange={(e) => {
              setSuspect(e.target.value);
            }}
            title="Name of accused Person (if known)"
          />
          {/*Relation with victim drop down to be provided*/}
          <div className="mb-3" style={{ display: "flex" }}>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
                style={{ backgroundColor: "#198754" }}
              >
                Relation with Victim
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                {relWithVictimList.map((rwv) => {
                  return (
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleRelationWIthVictimDropdown(rwv)}
                      >
                        {rwv}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div style={{ marginLeft: 10, width: "100%" }}>
              <input
                value={relationWithVictim}
                className="form-control"
                disabled
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Contact number* (must be 10 digit only)</label>
            <input
              type="tel"
              pattern="[0-9]{10}"
              onChange={(e) => {
                setmobileNo(e.target.value);
              }}
              className="form-control"
            />
          </div>

          {/* <div className="mb-3">
        <label for="formFile" className="form-label">Evidence if any (File type:img/video/other)</label>
        <input className="form-control" type="file" id="formFile" />
        </div> */}

          <div>
            <Button onClick={addComplaint} title="Submit" />
          </div>
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
};
export default Complaint;
