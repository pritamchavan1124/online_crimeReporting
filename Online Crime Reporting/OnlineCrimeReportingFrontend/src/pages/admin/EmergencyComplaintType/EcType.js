import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import Sidebar from "../Navbar/SideBar";

const EmergrncyComplaintCaseType = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  //get all EmergrncyComplaintCaseType
  useEffect(() => {
    loadEmergrncyComplaint();
  }, []);

  const loadEmergrncyComplaint = async () => {
    axios
      .get(
        config.serverURL+"/api/admin/emergencycomplainttype/getemergencycomplainttypes",
        {
          headers: { Authorization: "Bearer " + sessionStorage["token"] },
        }
      )
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
    //   "http://localhost:9090/api/admin/EmergrncyComplaintCaseType"
    // );
    // console.log(response.data);
    // setList(response.data);
  };

  const addEmergrncyComplaint = () => {
    navigate("/api/admin/emergrncyComplaint/add");
  };

  const handleDelete = (id) => {
    //navigate("/EmergrncyComplaintCaseType/:pId");
    console.log("Printing id", id);
    axios
      .delete(config.serverURL+`/api/admin/emergencycomplainttype/` + id,
      {
        headers: { Authorization: "Bearer " + sessionStorage["token"] },
      })
      .then((response) => {
        console.log("case type deleted successfully", response.data);
        loadEmergrncyComplaint();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  return (
    <>
      <Sidebar />
      <div>
        <div style={{ marginTop: 10, padding: 15 }}>
          <div style={styles.container}>
            <h3 className="text-center"> Emergency Complaint Types</h3>
            <hr></hr>
            <table className="table table-striped table-hover text-center">
              <thead className="thead-dark">
                <tr className="text-center font-weight-bold">
                  <th>Types</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((EmergrncyComplaint) => {
                  return (
                    <tr key={EmergrncyComplaint.id} className="text-center">
                      {/* <td>{EmergrncyComplaintCaseType.id}</td> */}
                      <td>{EmergrncyComplaint.ecType}</td>
                      {/* <td>
                      <ol>
                        <li>{EmergrncyComplaintCaseType.deatils}</li>
                      </ol>
                    </td> */}
                      <td>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            handleDelete(EmergrncyComplaint.id);
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
            <button onClick={addEmergrncyComplaint} style={styles.addButton}>
              Add Emergency Complaint
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
    width: 650,
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
    width: "auto",
    height: 40,
    backgroundColor: "#AD89FC",
    color: "white",
    borderRadius: 5,
    border: "none",
    margin: 5,
    marginLeft: 10,
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
export default EmergrncyComplaintCaseType;
