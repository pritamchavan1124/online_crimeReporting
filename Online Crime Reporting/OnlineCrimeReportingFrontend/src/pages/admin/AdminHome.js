import { useNavigate } from "react-router-dom";
import Sidebar from "./Navbar/SideBar";
import PieChartAdmin from './../../components/piechartAdmin';

const AdminHome = () => {
  const navigate = useNavigate();

  const caseTypeList = () => {
    console.log("inside caseTypeList ");
    navigate("/api/admin/casetype/casetypes");
  };

  const EcaseTypeList = () => {
    console.log("inside Em_caseTypeList ");
    navigate("/api/admin/emergencycomplaint/getemergencycomplaints");
  };

  const PSList = () => {
    console.log("inside police station List ");
    navigate("/api/admin/policestation/getall");
  };

  const ECList = () => {
    console.log("inside emergency complaint List ");
    navigate("/api/admin/emergrncycomplaint/getall");
  };

  const CRList = () => {
    console.log("inside criminal List ");
    navigate("/api/admin/criminal/getall");
  };
  const ComList = () => {
    console.log("inside criminal List ");
    navigate("/api/admin/complaints/getall");
  };
  return (
    <>
      <Sidebar />
      <div style={{ marginTop: 100 }}>
        <div style={styles.container}>
          <button onClick={PSList} style={styles.AdminHomeButton}>
            Police station
          </button>
          <button onClick={ComList} style={styles.AdminHomeButton}>
            Complaints
          </button>
          <button onClick={ECList} style={styles.AdminHomeButton}>
            Emergency Complaints
          </button>
          <button onClick={CRList} style={styles.AdminHomeButton}>
            Criminal Records
          </button>
          <button onClick={EcaseTypeList} style={styles.AdminHomeButton}>
            Emergency Complaint Type
          </button>
          <button onClick={caseTypeList} style={styles.AdminHomeButton}>
            Case Type
          </button>

          {/* <button onClick={PSList} style={styles.AdminHomeButton}>
          Articles
        </button> */}
        </div>
        <div style={{position:'absolute',left:'25%'}}>

            <PieChartAdmin></PieChartAdmin>
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
    marginTop: 0,
    marginLeft: "250px",
    marginRight: "auto",
    marginBottom: "15px",
    borderColor: "#795da3",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    backgroundColor: "#F5F1FF",
  },
  AdminHomeButton: {
    position: "relative",
    width: "100%",
    height: 60,
    backgroundColor: "#795da3",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 20,
  },
};

export default AdminHome;
