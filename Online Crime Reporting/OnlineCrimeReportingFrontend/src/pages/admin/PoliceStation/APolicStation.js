import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import Sidebar from "../Navbar/SideBar";

const PoliceStation = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  //get all PoliceStation
  useEffect(() => {
    loadPoliceStation();
  }, []);

  const loadPoliceStation = async () => {
    axios
      .get(config.serverURL+"/api/admin/policestation/getpolicestations",{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
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

  const addPoliceStation = () => {
    navigate("/api/admin/policestation/add");
  };

  const handleDelete = (id) => {
    //navigate("/PoliceStation/:pId");
    console.log("Printing id", id);
    axios
      .delete(config.serverURL+`/api/admin/policestation/` + id,{
        headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
      })
      .then((response) => {
        console.log("Police station deleted successfully", response.data);
        loadPoliceStation();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };
  const handleUpdate = (id) => {
    navigate(`/api/admin/policestation/update/${id}`);
  };

  return (
    <>
      <Sidebar />
      <div>
        <div style={{ marginTop: 10, padding: 15 }}>
          <div style={styles.container}>
            <h3 className="text-center">List of Police Stations</h3>
            <hr></hr>
            <table className="table table-striped table-hover text-center">
              <thead className="thead-dark">
                <tr className="text-center font-weight-bold">
                  <th>Name</th>
                  <th>Contact No.</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((PoliceStation) => {
                  return (
                    <tr key={PoliceStation.id} className="text-center">
                      <td>{PoliceStation.name}</td>
                      <td>{PoliceStation.mobileNo}</td>
                      <td>{PoliceStation.email}</td>
                      {/* <td>{PoliceStation.psName}</td> */}
                      <td>
                        <td>
                          <button
                            className="btn btn-primary mx-1"
                            onClick={() => {
                              // handleUpdate(PoliceStation.id);
                              navigate(
                                "/api/admin/policestation/update/" +
                                  PoliceStation.id
                              );
                            }}
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger mx-1"
                            onClick={() => {
                              handleDelete(PoliceStation.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={addPoliceStation} style={styles.addButton}>
              Add PoliceStation
            </button>
          </div>
          <div></div>
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
    bottom: 20,
    padding: 0,
    marginLeft: "250px",
    marginRight: "auto",
    marginBottom: "15px",
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
    //marginLeft: 610,
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
export default PoliceStation;
