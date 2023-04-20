import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";

import axios from "axios";
import Sidebar from "../Navbar/SideBar";

const UpdatePoliceStation = () => {
  const navigate = useNavigate();
  //const history = useHistory();
  const { id } = useParams();

  //Following function is used for auto-Adjustable height of div-container
  const [menuHeight, setMenuHeight] = useState(null);
  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addressLine, setaddressLine] = useState("");
  const [role, setrole] = useState("ROLE_POLICE_STATION");
  const [raddress, setaddress] = useState();
  const [secq, setsecq] = useState();
  const [rdivision, setdivision] = useState();

  let division = { id: secq };

  const [addressId, setAddressId] = useState("");
  const [securityQuestionId, setSecurityQuestionId] = useState("");
  const [answer, setAnswer] = useState("");
  const [divisionId, setDivisionId] = useState("");

  const [addressList, setAddressList] = useState([]);
  const [secQuestionList, setSecQuestionList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);

  const [addressName, setAddressName] = useState("Select Address");
  const [securityQuestionName, setSecurityQuestionName] = useState(
    "Select Security Question"
  );
  const [divisionnName, setDivisionnName] = useState("Select Address");

  let addressID = 0;
  let regionName = "";
  let pinCodeVal = 0;
  let address = { id: addressId };
  const handleAddressDropdown = (id, region1, pinCode1) => {
    console.log("this is what i getting", id, region1);
    addressID = id;
    setAddressId(addressID);
    const newRegName = region1 + "";
    regionName = newRegName;
    pinCodeVal = pinCode1;
    address = { id: addressID };
    console.log("Address Id Selected=", addressID);
    console.log("Address region =", regionName);
    console.log("Address pincode =", pinCodeVal);
    setAddressName(regionName + " " + pinCodeVal);
  };

  let divID = 0;
  let divName = "";
  const handleDivisionDropdown = (id, div) => {
    console.log("this is what i getting", id, div);
    divID = id;
    setDivisionId(divID);
    const newDivName = div + "";
    divName = newDivName;
    console.log(" Division Id Selected=", divID);
    console.log(" Division Selected= ", divName);
    setDivisionnName(divName);
  };

  let secQID = 0;
  let sqName = "";
  let securityQuestion = { id: securityQuestionId };
  const handleSecurityQuestionDropdown = (id, secQuestion) => {
    console.log("this is what i getting", id, secQuestion);
    secQID = id;
    setSecurityQuestionId(secQID);
    const newSQName = secQuestion + "";
    sqName = newSQName;
    console.log("Security Question Id Selected=", secQID);
    console.log("Security Question Selected= ", sqName);
    setSecurityQuestionName(sqName);
  };

  const getAddressList = () => {
    const url = config.serverURL + `/api/home/addresses`;
    axios
      .get(url)
      .then((response) => {
        const result = response["data"];
        console.log(result);
        setAddressList(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const getSecurityQuestionList = () => {
    const url = config.serverURL + `/api/home/securityquestions`;
    axios
      .get(url)
      .then((response) => {
        const result = response["data"];
        console.log(result);
        setSecQuestionList(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const getDivisionList = () => {
    const url = config.serverURL + `/api/admin/division`;
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + sessionStorage["token"] },
      })
      .then((response) => {
        const result = response["data"];
        console.log(result);
        setDivisionList(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const loadPolicestation = () => {
    console.log(id);
    if (id) {
      axios
        .get(config.serverURL + `/api/admin/policestation/${id}`, {
          headers: { Authorization: "Bearer " + sessionStorage["token"] },
        })
        .then((response) => {
          console.log(response.data);

          setName(response.data.name);
          setMobileNo(response.data.mobileNo);
          setEmail(response.data.email);
          setAnswer(response.data.answer);
          setaddressLine(response.data.addressLine);
          setAddressId(response.data.address.id);
          setPassword(response.data.password);
          setDivisionId(response.data.division.id);
          setrole(response.data.role);
          setSecurityQuestionId(response.data.securityQuestion.id);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };

  useEffect(() => {
    getAddressList();
    getSecurityQuestionList();
    getDivisionList();
    loadPolicestation();
  }, []);

  const savePoliceStation = (e) => {
    e.preventDefault();
    // check if user has really entered any value
    if (name.length == 0) {
      toast.error("please provide police station name ");
    } else if (mobileNo.length === 0) {
      toast.error("please provide mobile number");
    } else if (email.length === 0) {
      toast.error("please provide email");
    } else if (password.length <= 5) {
      toast.error("please provide password at least 6 characters");
    } else if (addressLine.length === 0) {
      toast.error("please provide Address Line");
    } else if (answer.length === 0) {
      toast.error("please provide answer ");
    } else {
      axios
        .put(
          config.serverURL + "/api/admin/policestation/update",
          {
            name,
            mobileNo,
            email,
            password,
            addressLine,
            answer,
            addressId,
            id,
            divisionId,
            role,
            securityQuestionId,
          },
          {
            headers: { Authorization: "Bearer " + sessionStorage["token"] },
          }
        )
        .then((response) => {
          // get the data returned by server
          const result = response.data;
          //navigate("/api/admin/policestation/getall");
          console.log(result);
          // check if user's authentication is successfull
          if (response["status"] == "error") {
            toast.error("Failed to add police station");
          } else {
            toast.success("successfully updated a police station");

            // navigate to the all case types
            navigate("/api/admin/policestation/getall");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };
  //   useEffect(() => {
  //     console.log(id);

  //   }, []);
  return (
    <>
      <Sidebar />
      <div style={{ marginTop: 100 }}>
        <div style={styles.container}>
          <div className="container">
            <h3 className="text-center">Update PoliceStation</h3>

            <hr />
            <form>
              <div className="form-group" style={{ padding: 20 }}>
                <label for="name">Police Station Name: </label>
                <input
                  type="text"
                  className="form-control col-4"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  disabled
                />
              </div>
              <div className="form-group" style={{ padding: 20 }}>
                <label for="mobileNo">Mobile Number: </label>
                <input
                  type="text"
                  className="form-control col-4"
                  id="mobileNo"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  placeholder="Enter mobile no"
                />
              </div>

              <div className="form-group" style={{ padding: 20 }}>
                <label for="email">Email ID: </label>
                <input
                  type="text"
                  className="form-control col-4"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  disabled
                />
              </div>

              <div className="form-group" style={{ padding: 20 }}>
                <label for="addressLine">Address Line: </label>
                <input
                  type="text"
                  className="form-control col-4"
                  id="addressLine"
                  value={addressLine}
                  onChange={(e) => setaddressLine(e.target.value)}
                  placeholder="Enter addressLine"
                  disabled
                />
              </div>

              <div>
                <button
                  onClick={(e) => savePoliceStation(e)}
                  style={styles.addButton}
                >
                  Update
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
    borderColor: "#795da3",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    backgroundColor: "#F5F1FF",
  },
  addButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#795da3",
    color: "white",
    borderRadius: 5,
    border: "none",
    margin: 5,
    // marginLeft: 610,
  },
};

export default UpdatePoliceStation;
