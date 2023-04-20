import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import EmergencyComplaint from "./EmergencyComplaints";

const EcDetails = () => {
  const navigate = useNavigate();
  //const history = useHistory();

  const [menuHeight, setMenuHeight]= useState(null) 
  function calcHeight(el){
      const height=el.offsetHeight;
       setMenuHeight(height);
  }


  const { id } = useParams();
  const [ecName, setecName] = useState("");
  const [ecMobile, setecMobile] = useState("");
  const [ecLocation, setecLocation] = useState("");
  const [ecTime, setecTime] = useState("");
  const [description, setdescription] = useState("");
  const [rpoliceStation, setpoliceStation] = useState();
  const [raddress, setaddress] = useState();
  const [recType, setecType] = useState();
  let address = { id: raddress };
  let ecType = { id: recType };
  let policeStation = { id: rpoliceStation };

 

  const goback = () => {
    navigate("/api/admin/emergrncycomplaint/getall");
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      axios
        .get(config.serverURL+`/api/policestation/emergencycomplaint/${id}`,{
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] }
        })
        .then((response) => {
          
          console.log(response.data);

          setecName(response.data.ecName);
          setecMobile(response.data.ecMobile);
          setecLocation(response.data.ecLocation);
          setecTime(response.data.ecTime);
          setaddress(response.data.address.id);
          setdescription(response.data.description);
          setecType(response.data.ecType.id);
          setpoliceStation(response.data.policeStation.id);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);
  return (
    <div style={{ marginTop: 100 , height:menuHeight}}>
      <div style={styles.container}>
        <div className="container">
          <h3 className="text-center">Emergency Complaint Details</h3>
          <hr />
          <div>
            <button onClick={(e) => goback(e)} style={styles.addButton}>
              Go Back
            </button>
          </div>
          <form>
            <div className="form-group" style={{ padding: 20 }}>
              <input
                type="text"
                className="form-control col-4"
                id="ecName"
                value={ecName}
                onChange={(e) => setecName(e.target.value)}
                //placeholder="Enter name"
              />
            </div>
            <div className="form-group" style={{ padding: 20 }}>
              <input
                type="text"
                className="form-control col-4"
                id="ecMobile"
                value={ecMobile}
                onChange={(e) => setecMobile(e.target.value)}
                //placeholder="Enter mobile no"
              />
            </div>

            <div className="form-group" style={{ padding: 20 }}>
              <input
                type="text"
                className="form-control col-4"
                id="ecLocation"
                value={ecLocation}
                onChange={(e) => ecLocation(e.target.value)}
                //placeholder="Enter Email"
              />
            </div>
            <div className="form-group" style={{ padding: 20 }}>
              <input
                type="text"
                className="form-control col-4"
                id="ecTime"
                value={ecTime}
                onChange={(e) => setecTime(e.target.value)}
                //placeholder="Enter password"
              />
            </div>
            <div className="form-group" style={{ padding: 20 }}>
              <input
                type="text"
                className="form-control col-4"
                id="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                // placeholder="Enter addressLine"
              />
            </div>
            <div className="form-group" style={{ padding: 20 }}>
              <input
                type="text"
                className="form-control col-4"
                id="address"
                value={raddress}
                onChange={(e) => setaddress(e.target.value)}
                // placeholder="Enter address id"
              />
            </div>
            <div className="form-group" style={{ padding: 20 }}>
              <input
                type="text"
                className="form-control col-4"
                id="ecType"
                value={recType}
                onChange={(e) => setecType(e.target.value)}
                //placeholder="Enter division id"
              />
            </div>
            <div className="form-group" style={{ padding: 20 }}>
              <input
                type="text"
                className="form-control col-4"
                id="policeStation"
                value={rpoliceStation}
                onChange={(e) => setpoliceStation(e.target.value)}
                //placeholder="Enter  role"
              />
            </div>
          </form>
          <hr />
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
    bottom: 20,
    padding: 0,
    margin: "auto",
    borderColor: "#BAF6FF",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    backgroundColor: "#F5F1FF",
  },
  addButton: {
    position: "relative",
    width: "20%",
    height: 40,
    backgroundColor: "#AD89FC",
    color: "white",
    borderRadius: 5,
    border: "none",
    margin: 5,
    marginLeft: 610,
  },
};

export default EcDetails;
