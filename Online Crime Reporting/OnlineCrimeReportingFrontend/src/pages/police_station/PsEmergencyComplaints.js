import { useEffect, useState } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config"
import axios from "axios";


const PsEmergencyComplaint = () => {
  const [list, setList] = useState([]);
  const [psId,setPsId]=useState()

  const navigate = useNavigate();
  const location=useLocation()
  const { id } = useParams();

  const [menuHeight, setMenuHeight]= useState(null) 
    function calcHeight(el){
        const height=el.offsetHeight;
         setMenuHeight(height);
    }


  //get all PoliceStation
  useEffect(() => {
    const {userId}=location.state
    console.log(userId)
    setPsId(userId)
    console.log(psId)
    loadEmergencyComplaint(userId);
  }, []);

  const loadEmergencyComplaint = async (ide) => {
    console.log('inside load',ide)
    axios
      .get(
        config.serverURL+"/api/policestation/emergencycomplaintForPoliceStation/" + ide,{
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] }
  })
      .then((response) => {
        const result = response.data;
        console.log(result);
        setList(result);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error(error);
      });
    // const response = await axios.get(
    //   "http://localhost:9090/api/admin/PoliceStation"
    // );
    // console.log(response.data);
    // setList(response.data);
  };

  const handleDelete = (id) => {
    //navigate("/PoliceStation/:pId");
    console.log("Printing id", id);
    axios
      .delete(config.serverURL+`/api/policestation/emergencycomplaint/` + id,{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] }
      })
      .then((response) => {
        console.log("Emergency complaint deleted successfully", response.data);
        loadEmergencyComplaint(psId);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };
  // const handleDetails = (ide) => {
  //   navigate(`/api/admin/emergencycomplaint/details/${ide}`);
  // };

  return (
    <>
    
    <div >
      <hr></hr>
      <h3 className="text-center">List of Emergency Complaints</h3>

      <div style={{ marginTop: 10, padding: 15,height:menuHeight }}>
        <div style={styles.container}>
          <table className="table">
            <thead className="thead-dark">
              <tr className="text-center font-weight-bold">
                <th>Name</th>
                <th>Contact No.</th>
                <th>Location</th>
                <th>Time</th>
                <th>Case Type</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((EmergencyComplaint) => {
                return (
                  <tr key={EmergencyComplaint.id} className="text-center">
                    <td>{EmergencyComplaint.ecName}</td>
                    <td>{EmergencyComplaint.ecMobile}</td>
                    <td>{EmergencyComplaint.ecLocation}</td>
                    <td>{EmergencyComplaint.ecTime}</td>
                    <td>{EmergencyComplaint.ecType.ecType}</td>
                    <td>{EmergencyComplaint.description}</td>
                    <td>
                      {/* <button
                        className="btn btn-primary ml-2"
                        onClick={() => {
                          handleDetails(EmergencyComplaint.id);
                        }}
                      >
                        Details
                      </button>
                    */}
                      <button style={{marginLeft:0}}
                        className="btn btn-danger ml-2"
                        onClick={() => {
                          handleDelete(EmergencyComplaint.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

const styles = {
  container: {
    width: 'auto',
  
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
  deleteButton: {
    position: "relative",
    width: "20%",
    height: 40,
    backgroundColor: "#AD89FC",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};
export default PsEmergencyComplaint;
