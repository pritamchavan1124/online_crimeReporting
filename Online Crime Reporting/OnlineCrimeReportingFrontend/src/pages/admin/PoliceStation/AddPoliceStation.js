import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config";

import axios from "axios";
import Sidebar from "../Navbar/SideBar";

const AddPoliceStation = () => {
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
  const [divisionnName, setDivisionnName] = useState("Select Division");

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
    setDivisionId(id);
    setDivisionnName(div);

    // divID = id;
    // setDivisionId(divID);
    // const newDivName = div + "";
    // divName = newDivName;
    // console.log(" Division Id Selected=", divID);
    // console.log(" Division Selected= ", divName);
    // setDivisionnName(divName);
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

  useEffect(() => {
    getAddressList();
    getSecurityQuestionList();
    getDivisionList();
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
    } else if (addressId.length === 0 || addressId == "") {
      toast.error("please select address from  dropdown ");
    } else if (divisionId.length === 0) {
      toast.error("please select division from  dropdown  ");
    } else if (securityQuestionId.length === 0) {
      toast.error("please select security question from dropdown  ");
    } else if (answer.length === 0) {
      toast.error("please provide answer ");
    } else {
      axios
        .post(
          config.serverURL + "/api/admin/policestation/add",
          {
            name,
            mobileNo,
            email,
            password,
            addressLine,
            answer,
            addressId,
            // id,
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
            toast.success("successfully registered a police station");

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
            <h3 className="text-center">Add PoliceStation</h3>

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
                />
              </div>
              <div className="form-group" style={{ padding: 20 }}>
                <label for="password">Password: </label>
                <input
                  type="Password"
                  className="form-control col-4"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
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
                />
              </div>

              <div className="mb-3" style={{ display: "flex" }}>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    Select Address
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    {addressList.map((ad) => {
                      return (
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() =>
                              handleAddressDropdown(
                                ad.id,
                                ad.region,
                                ad.pinCode
                              )
                            }
                          >
                            {ad.region + " " + ad.pinCode}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div style={{ marginLeft: 10, width: "100%" }}>
                  <input
                    value={addressName}
                    className="form-control"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-3" style={{ display: "flex" }}>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    Select Division
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    {divisionList.map((div) => {
                      return (
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() =>
                              handleDivisionDropdown(div.id, div.divisionName)
                            }
                          >
                            {div.divisionName}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div style={{ marginLeft: 10, width: "100%" }}>
                  <input
                    value={divisionnName}
                    className="form-control"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-3" style={{ display: "flex" }}>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    Select Security Question
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    {secQuestionList.map((sq) => {
                      return (
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() =>
                              handleSecurityQuestionDropdown(
                                sq.id,
                                sq.securityQuestion
                              )
                            }
                          >
                            {sq.securityQuestion}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div style={{ marginLeft: 10, width: "100%" }}>
                  <input
                    value={securityQuestionName}
                    className="form-control"
                    disabled
                  />
                </div>
              </div>
              <div className="mb-3">
                <label>Answer to Selected Security Question</label>
                <input
                  onChange={(event) => {
                    setAnswer(event.target.value);
                  }}
                  className="form-control"
                  type="text"
                />
              </div>

              <div>
                <button
                  onClick={(e) => savePoliceStation(e)}
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

export default AddPoliceStation;
