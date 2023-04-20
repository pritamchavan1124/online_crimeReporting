import Complaint from "./pages/user/complaint";
import Police from "./pages/police_station/police";
import Home from "./pages/user/home";
import Policestation from "./pages/police_station/policestation";
import AddPolice from "./pages/police_station/addpolice";

import PsCriminalRecords from "./pages/police_station/criminalList";
import Signin from "./pages/user/signin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Title from "./components/title";
import Signup from "./pages/user/signup";
import AddCriminal from "./pages/criminal/addCriminal";
import CriminalRecords from "./pages/criminal/criminalRecords";

import AdminHome from "./pages/admin/AdminHome";
import CaseType from "./pages/admin/caseType/CaseType";
import AddCaseType from "./pages/admin/caseType/AddCaseType";
import EmergrncyComplaintCaseType from "./pages/admin/EmergencyComplaintType/EcType";
import AddEmergrncyComplaintCaseType from "./pages/admin/EmergencyComplaintType/AddEmergrncyComplaintCaseType";
import PoliceStation from "./pages/admin/PoliceStation/APolicStation";
import AddPoliceStation from "./pages/admin/PoliceStation/AddPoliceStation";
import MyProfile from "./pages/user/profile";

import EmergencyComplaint from "./pages/admin/EmergencyComplaint/EmergencyComplaints";
import EcDetails from "./pages/admin/EmergencyComplaint/EcDetails";
import AdminCriminalRecords from "./pages/admin/criminal/criminalRecords";

import AboutUs from "./pages/AboutUs";

import UserProfile from "./pages/user/userprofile";
import ComplaintDetails from "./pages/user/complaintDetails";
import MyUserProfile from "./pages/user/myprofile";
import ResetPassword from "./pages/user/resetPassword";

import PsAddCriminal from "./pages/police_station/addCriminal";
import PsComplaintList from "./pages/police_station/complaintlist";


import UpdatePolice from "./pages/police_station/update";
import PsComplaintDetails from "./pages/police_station/pscomplaintdetails";
import PsEmergencyComplaint from "./pages/police_station/PsEmergencyComplaints";
import UserEc from "./pages/user/addEc";
import UpdatePoliceStation from "./pages/admin/PoliceStation/updatePoliceStation";
import Sidebar from "./pages/admin/Navbar/SideBar";
import ComplaintList from "./pages/admin/complaint/Complaints";
import ComDetails from "./pages/admin/complaint/comDetails";

import ContactUs from "./pages/contactUs";
import Faq from "./pages/faq";


import ErrorPage from './error';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Title />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/complaint/add" element={<Complaint />} />
          <Route path="/user/myhome" element={<UserProfile />} />
          <Route path="/user/myprofile" element={<MyUserProfile />} />
          <Route
            path="/user/complaint/details"
            element={<ComplaintDetails />}
          />
          <Route path="/policestation" element={<Policestation />} />
          <Route path="/police/getallpolice/" element={<Police />} />

          <Route
            path="/api/policestation/police/update/:id"
            element={<UpdatePolice />}
          />
          <Route path="/police/addpolice" element={<AddPolice />} />
          
          {/* <Route path="/policestation/complaintListForPS/:psId" element={<PsComplaintDetails/>} /> */}

          <Route path="/emergencycomplaintForPoliceStation/:psId"element={<PsEmergencyComplaint />} />
          <Route path="/criminal/getcriminals" element={<PsCriminalRecords />}/>
          <Route path="/policestation/complaintListForPS" element={<PsComplaintList />}/>
          
          <Route path="/policestation/complaint/details" element={<PsComplaintDetails />}/>
          
          <Route path="/contactUs" element={<ContactUs />}/>
          <Route path="/feedback" element={<Faq />}/>


          <Route path="/home/signin" element={<Signin />} />
          <Route path="/home/signup" element={<Signup />} />
          <Route path="/home/resetpassword" element={<ResetPassword />} />
          <Route path="/user/myprofile" element={<MyProfile />} />
          <Route path="/home/emergencycomplaint" element={<UserEc />} />

          <Route
            path="/criminal/criminalRecords"
            element={<CriminalRecords />}
          />
          <Route path="/criminal/addCriminal" element={<AddCriminal />} />

          <Route path="/api/admin/home" element={<AdminHome />} />
          <Route path="/api/admin/casetype/casetypes" element={<CaseType />} />
          <Route path="/api/admin/caseType/add" element={<AddCaseType />} />
          <Route path="/api/admin/caseType/:id" element={<AddCaseType />} />
          <Route
            path="/api/admin/emergencycomplaint/getemergencycomplaints"
            element={<EmergrncyComplaintCaseType />}
          />
          <Route
            path="api/admin/emergrncyComplaint/add"
            element={<AddEmergrncyComplaintCaseType />}
          />
          <Route
            path="/api/admin/policestation/getall"
            element={<PoliceStation />}
          />

          <Route
            path="/api/admin/policestation/add"
            element={<AddPoliceStation />}
          />
          <Route
            path="/api/admin/policestation/update/:id"
            element={<UpdatePoliceStation />}
          />
          <Route
            path="/api/admin/emergrncycomplaint/getall"
            element={<EmergencyComplaint />}
          />
          <Route
            path="/api/admin/emergencycomplaint/details/:id"
            element={<EcDetails />}
          />
          <Route
            path="/api/admin/criminal/getall"
            element={<AdminCriminalRecords />}
          />

          <Route
            path="/api/policestation/criminal/add"
            element={<PsAddCriminal />}
          />
          <Route
            path="/api/policestation/criminal/update/:id"
            element={<PsAddCriminal />}
          />
          <Route path="/home/about" element={<AboutUs />} />
          <Route
            path="/api/admin/complaints/getall"
            element={<ComplaintList />}
          />
          <Route
            path="/api/admin/complaints/details"
            element={<ComDetails />}
          />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>

        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
