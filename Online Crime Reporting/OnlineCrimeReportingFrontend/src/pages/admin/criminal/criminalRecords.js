import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";
import Sidebar from "../Navbar/SideBar";

const AdminCriminalRecords = () => {
  const [criminalRecords, setCriminalRecords] = useState([]);

  const [menuHeight, setMenuHeight]= useState(null) 
  function calcHeight(el){
      const height=el.offsetHeight;
       setMenuHeight(height);
  }

  const navigate = useNavigate();

  useEffect(() => {
    getAllCriminal();
  }, []);

  const getAllCriminal = () => {
    axios
      .get(config.serverURL + "/api/admin/criminal/getcriminals", {
        headers: { Authorization: "Bearer " + sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        setCriminalRecords(result);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error(error);
      });
  
  };

  

  //delete criminal by its id

  const deleteCriminal = (id) => {
    axios
      .delete(config.serverURL + "/api/admin/criminal/" + id, {
        headers: { Authorization: "Bearer " + sessionStorage["token"] },
      })
      .then((response) => {
        const result = response.data;
        console.log("Criminal deleted successfully", response.data);
          // reload the screen
          getAllCriminal();
        
      })
      .catch(error=>{
        toast.error('Criminal deletion failed!!!')
        console.log('Something went wrong', error);
        toast.error(error)
      });
  };

  return (
    <>
      <Sidebar />
      <div>
        <div style={styles.container}>
          <h3 className="text-center"> Criminal Records </h3>
          <div>
            {/* <button onClick={addCriminal} style={styles.addButton}>
            Add Criminal
          </button> */}
          </div>
          <table className="table table-striped table-hover text-center ">
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th>Criminal Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {criminalRecords.map((criminalRecord) => {
                return (
                  <tr key={criminalRecord.id} className="text-center">
                    {/* <td>{criminalRecord.id}</td> */}
                    <td>{criminalRecord.crName}</td>
                    <td>{criminalRecord.crAge}</td>
                    <td>{criminalRecord.crGender}</td>

                    <td>
                      <button
                        onClick={() => deleteCriminal(criminalRecord.id)}
                        style={styles.button}
                        className="btn btn-sm btn-danger"
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
    </>
  );
};

const styles = {
  container: {
    width: 800,
    height: "auto",
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginLeft: "250px",
    marginRight: "auto",
    marginBottom: "15px",
    borderColor: "#795da3",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
  },
  addButton: {
    position: "relative",
    width: "20%",
    height: 40,
    backgroundColor: "#795da3",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 20,
  },
};
export default AdminCriminalRecords;
