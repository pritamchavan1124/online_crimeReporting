import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config"


import axios from "axios";
import Sidebar from "../Navbar/SideBar";

const AddCaseType = () => {
  const navigate = useNavigate();
  //const history = useHistory();
  const { id } = useParams();

  const [caseType, setCaseType] = useState("");
  const saveCaseType = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(config.serverURL+"/api/admin/casetype/update", {
          caseType,
        },
        {
          headers: { Authorization: "Bearer " + sessionStorage["token"] },
        })
        .then((response) => {
          console.log("case data updated successfully", response.data);
          navigate("/api/admin/casetype/casetypes");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      // check if user has really entered any value
      if (caseType.length == 0) {
        toast.error("please provide case type");
      } else {
        axios
          .post(config.serverURL+"/api/admin/casetype/add", {
            caseType,
          },
          {
            headers: { Authorization: "Bearer " + sessionStorage["token"] },
          })
          .then((response) => {
            // get the data returned by server
            const result = response.data;
            navigate("/api/admin/casetype/casetypes");
            console.log(result);
            // check if user's authentication is successfull
            if (response["status"] == "error") {
              toast.error("Failed to add case type");
            } else {
              toast.success("successfully registered a case type");

              // navigate to the all case types
              navigate("/api/admin/casetype/casetypes");
            }
          })
          .catch((error) => {
            console.log("error");
            console.log(error);
          });
      }
    }
  };
  useEffect(() => {
    console.log(id);
    if (id) {
      axios
        .get(config.serverURL+`/api/admin/casetype/${id}`)
        .then((response) => {
          setCaseType(response.data.caseType);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);
  return (
    <>
      <Sidebar />
      <div style={{ marginTop: 100 }}>
        <div style={styles.container}>
          <div className="container">
            <h3 className="text-center">Add Case Type</h3>
            <hr />
            <form>
              <div className="form-group" style={{ padding: 20 }}>
                <input
                  type="text"
                  className="form-control col-4"
                  id="caseType"
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  //placeholder="Enter Case Type"
                />
              </div>

              <div>
                <button
                  onClick={(e) => saveCaseType(e)}
                  style={styles.addButton}
                >
                  Save
                </button>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};
const styles = {
  container: {
    width: 800,
    height: 200,
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
    marginLeft: 610,
  },
};

export default AddCaseType;
