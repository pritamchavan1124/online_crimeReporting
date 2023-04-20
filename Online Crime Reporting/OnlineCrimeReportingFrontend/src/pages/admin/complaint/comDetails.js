import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";
import Button from "../../../components/button";
import loading from "../../../imagesForTitle/loading.gif";
import Sidebar from "../Navbar/SideBar";

const ComDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const loadingGif = loading;

  const [id, setId] = useState();
  const [isLoading, setLoading] = useState(true);
  //console.log(id)
  const [entireComplaint, setEntireComplaint] = useState();

  //Following function is used for auto-Adjustable height of div-container
  const [menuHeight, setMenuHeight] = useState(null);
  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const getFurtherDetails = (complaintId) => {
    axios
      .get(config.serverURL + "/api/admin/complaint/details/" + complaintId, {
        headers: { Authorization: "Bearer " + sessionStorage["token"] },
      })
      .then((response) => {
        const result = response["data"];
        console.log(result);
        setEntireComplaint(result);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    const { complaintId } = location.state;
    console.log(complaintId);

    getFurtherDetails(complaintId);
  }, []);

  const navigateBack = (id) => {
    navigate("/api/admin/complaints/getall", { state: { userId: id } });
  };

  if (isLoading) {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={loadingGif} alt="loading img"></img>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="container" style={{ height: menuHeight }}>
        <div style={styles.container}>
          <h3 style={{ textAlign: "center", margin: 20, color: "#795da3" }}>
            COMPLAINT DETAILS
          </h3>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Complaint Id:</td>
                <td>{entireComplaint.regComplaint["id"]}</td>
                <td>Reporting Date:</td>
                <td>{entireComplaint.regComplaint.reportingDate}</td>
              </tr>
              <tr>
                <td>Case Type:</td>
                <td>
                  {entireComplaint.regComplaint.caseTypeSelected.caseType}
                </td>
                <td>Location:</td>
                <td>{entireComplaint.regComplaint.location}</td>
              </tr>
            </tbody>
          </table>
          {entireComplaint.regComplaint.caseTypeSelected.caseType ===
            "MISSING_CHILD_OR_PERSON" && (
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Name of Missing Person:</td>
                  <td>{entireComplaint.name}</td>
                  <td>Age:</td>
                  <td>{entireComplaint.age}</td>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>{entireComplaint.gender}</td>
                  <td>Height:</td>
                  <td>{entireComplaint.height}</td>
                </tr>
              </tbody>
            </table>
          )}
          {entireComplaint.regComplaint.caseTypeSelected.caseType ===
            "MISSING_OR_STOLEN_MOBILE_PHONES" && (
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>IMEI No. of Missing Mobile Phone:</td>
                  <td>{entireComplaint.imei}</td>
                  <td>Company:</td>
                  <td>{entireComplaint.company}</td>
                </tr>
                <tr>
                  <td>Model:</td>
                  <td>{entireComplaint.model}</td>
                  <td>Sim Card Company Name:</td>
                  <td>{entireComplaint.simCardCompanyName}</td>
                </tr>
                <tr>
                  <td colSpan={2}>Mobile No. of Sim lost with Mobile Phone:</td>
                  <td colSpan={2}>{entireComplaint.mobileNoInMissingMobile}</td>
                </tr>
              </tbody>
            </table>
          )}
          {entireComplaint.regComplaint.caseTypeSelected.caseType ===
            "MOTOR_VEHICLE_THEFT" && (
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Registration No. of Missing Vehicle:</td>
                  <td>{entireComplaint.regNo}</td>
                  <td>Company:</td>
                  <td>{entireComplaint.companyName}</td>
                </tr>
                <tr>
                  <td>Chassis No.:</td>
                  <td>{entireComplaint.chassisNo}</td>
                  <td>Model:</td>
                  <td>{entireComplaint.modelName}</td>
                </tr>
                <tr>
                  <td colSpan={2}>Type of Vehicle:</td>
                  <td colSpan={2}>{entireComplaint.vehicleType}</td>
                </tr>
              </tbody>
            </table>
          )}
          <Button
            onClick={() =>
              navigateBack(entireComplaint.regComplaint.policeStation.id)
            }
            title="Back"
          />
        </div>
      </div>
    </>
  );
};
const styles = {
  container: {
    width: 800,
    padding: 20,
    position: "relative",
    top: 50,
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
export default ComDetails;
