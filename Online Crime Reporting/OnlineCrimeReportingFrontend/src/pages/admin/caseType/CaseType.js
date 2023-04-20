import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";
import axios from "axios";
import Sidebar from "../Navbar/SideBar";

const CaseType = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  //get all CaseType
  useEffect(() => {
    loadCaseType();
  }, []);

  const loadCaseType = async () => {
    axios
      .get("http://localhost:9090/api/admin/casetype", {
        headers: { Authorization: "Bearer " + sessionStorage["token"] },
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
    //   "http://localhost:9090/api/admin/casetype"
    // );
    // console.log(response.data);
    // setList(response.data);
  };

  const addCaseType = () => {
    navigate("/api/admin/casetype/add");
  };

  const handleDelete = (id) => {
    //navigate("/CaseType/:pId");
    console.log("Printing id", id);
    axios
      .delete(`http://localhost:9090/api/admin/casetype/` + id, {
        headers: { Authorization: "Bearer " + sessionStorage["token"] },
      })
      .then((response) => {
        console.log("case type deleted successfully", response.data);
        loadCaseType();
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
            <h3 className="text-center">List of Case Types</h3>
            <hr></hr>
            <table className="table table-striped table-hover text-center">
              <thead className="thead-dark">
                <tr className="text-center font-weight-bold">
                  <th>Types</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((CaseType) => {
                  return (
                    <tr key={CaseType.id} className="text-center">
                      {/* <td>{CaseType.id}</td> */}
                      <td>{CaseType.caseType}</td>
                      {/* <td>
                      <ol>
                        <li>{CaseType.deatils}</li>
                      </ol>
                    </td> */}
                      <td>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            handleDelete(CaseType.id);
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
            <button onClick={addCaseType} style={styles.addButton}>
              Add CaseType
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
    width: 700,
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
    flex: "1 1 auto",
    position: "relative",
    width: "20%",
    height: 40,
    backgroundColor: "#AD89FC",
    color: "white",
    borderRadius: 5,
    border: "none",
    margin: 5,
    marginLeft: 10,
    // flex: "1 1 auto",
    // margin: 5,
    // padding: 10,
    // textAlign: "center",
    // //textTransform: "uppercase",
    // transition: "0.5s",
    // backGroundsize: "100% auto",
    // color: "white",
    // /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
    // boxshadow: "1px 1px 20px 5px #eee",
    // borderRadius: 10,
    // backgroundimage:
    //   "linear-gradient(toRight, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%)",
    //background: "linear-gradient(#a6c1ee, #9198e5)",
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
export default CaseType;
