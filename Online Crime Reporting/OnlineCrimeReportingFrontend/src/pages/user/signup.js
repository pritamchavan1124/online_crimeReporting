import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config";
import DatePicker from "react-datepicker"
import addDays from 'date-fns/addDays'
import "react-datepicker/dist/react-datepicker.css";



const Signup = () => {
  //get user inputs


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("ROLE_COMPLAINANT");
  const [addressLine, setAddressLine] = useState("");
  const [addressId, setAddressId] = useState("");
  const [securityQuestionId, setSecurityQuestionId] = useState("");
  const [answer, setAnswer] = useState("");
  
  const [addressList, setAddressList] = useState([]);
  const [secQuestionList, setSecQuestionList] = useState([]);

  const [addressName, setAddressName] = useState("Select Address");
  const [securityQuestionName, setSecurityQuestionName] = useState(
    "Select Security Question"
  );
  const navigate = useNavigate();

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

  const disableDates=()=>{

    var today,dd,mm,yyyy;
    today=new Date();
    dd=today.getDate()+1;
    mm=today.getMonth()+1;
    yyyy=today.getFullYear();
    return yyyy+"-"+mm+"-"+dd;

  }

  useEffect(() => {
    getAddressList();
    getSecurityQuestionList();
  }, []);

  const signup = () => {
    console.log(addressId);
    console.log(securityQuestionId);
    if (name.length === 0) {
      toast.error("please enter your Name");
    } else if (email.length === 0 || !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || !email.endsWith(".com")) {
      toast.error("please enter valid email");
    } else if (password.length === 0 || password.length < 4) {
      toast.error("please ensure password length must be atleast 4");
    } else if (confirmPassword.length === 0) {
      toast.error("please confirm your password");
    } else if (password !== confirmPassword) {
      toast.error("password does not match ");
    } else if(mobileNo.length===0 || mobileNo.length!==10){
      toast.error('Please re-enter your new Mobile No. & ensure its of 10 digit only')
    } else if (dob.length === 0) {
      toast.error("please enter your date of birth");
    } else if (gender.length === 0) {
      toast.error("please enter your gender");
    } else if (role.length === 0) {
      toast.error("please enter your role");
    } else if (addressLine.length === 0) {
      toast.error("please enter your address");
    } else if (address.length === 0) {
      toast.error("please enter your address");
    } else if (securityQuestion.length === 0) {
      toast.error("please enter your security Question");
    } else if (answer.length === 0) {
      toast.error("please enter your answer");
    } else {
      axios
        .post(config.serverURL + "/api/home/signup", {
          name,
          email,
          password,
          confirmPassword,
          mobileNo,
          dob,
          gender,
          role,
          answer,
          addressLine,
          addressId,
          securityQuestionId,
        })
        .then((response) => {
          const result = response.data;
          toast.success("successfully registered new user");
          navigate("/home/signin");
          // if (result['status'] === 'error') {
          //     toast.error('failed to register user ')
          // } else {

          //     navigate('/user/signin')
          // }
        })
        .catch((error) => {
          toast.error(" ",error.response.data)
          console.log("error");
          console.log(error);
        });
    }
  };



  return (
    <div style={{ marginTop: 40 }}>
      <div style={styles.container}>
        <h3 style={{ textAlign: "center", margin: 10 }}> Sign Up</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="form-control"
            type="email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="form-control"
            type="password"
          />
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            className="form-control"
            type="password"
          />
        </div>

        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            onChange={(event) => {
              setMobileNo(event.target.value);
            }}
            className="form-control"
            type="number"
          />
        </div>

        {/* <div className="mb-3">
                <label>Date Of Birth</label>
                <input max={disableDates} onChange={(event) => {setDob(event.target.value) }}
                className = 'form-control' type='date'  />
          </div>  */}

          <div>
          <label>Date Of Birth</label>
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            
            maxDate={addDays(new Date(), 0)}
            placeholderText="Select a date before 5 days in the future"
            />
            {/* <DatePicker
              isValidDate={disableFutureDt}
            /> */}
          </div>

          


        <div className="mb-3">
          <label>Gender</label>
          <div style={{ padding: 20 }}>
            <input
              className="mr-2"
              type="radio"
              // className="form-control col-4"
              id="gender"
              checked={gender === "Male"}
              value="Male"
              onChange={(e) => setGender(e.target.value)}


              // placeholder="Enter gender"
            />
            <span style={{ marginLeft: 5 }}>Male</span>
            <input
              className="mr-2"
              type="radio"
              //className="form-control col-4"
              id="gender"
              checked={gender === "Female"}
              value="Female"
              style={{ marginLeft: 20 }}
              onChange={(e) => setGender(e.target.value)}
            />
            <span style={{ marginLeft: 5 }}>Female</span>
            <input
              className="mr-2"
              type="radio"
              //className="form-control col-4"
              id="gender"
              checked={gender === "Other"}
              value="Other"
              style={{ marginLeft: 20 }}
              onChange={(e) => setGender(e.target.value)}
            />
            <span style={{ marginLeft: 5 }}>Other</span>
          </div>

          {/* <input onChange={(event) => {setGender(event.target.value) }}
                className = 'form-control'   /> */}
        </div>

        {/* <div className="mb-3">
                <label>Role</label>
                <input value='ROLE_COMPLAINANT' 
                className = 'form-control' type='text'  id="role"/>
                <select value={role} onChange={(e)=>{setRole()}}>
                    <option value="ROLE_COMPLAINANT">COMPLAINANT</option>
                    <option value="ROLE_POLICE_STATION">POLICE STATION</option>
                </select>
                </div>  */}

        <div className="mb-3">
          <label>Address Line</label>
          <input
            onChange={(event) => {
              setAddressLine(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>

        {/* <div className="mb-3">
                <label>Address</label>
                <input onChange={(event) => {setAddress(event.target.value) }}
                className = 'form-control'  />
                </div>  */}

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
                        handleAddressDropdown(ad.id, ad.region, ad.pinCode)
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
            <input value={addressName} className="form-control" disabled />
          </div>
        </div>

        {/* <div className="mb-3">
                <label>Security Question</label>
                <input onChange={(event) => {setSecurityQuestion(event.target.value) }}
                className = 'form-control'  />
                </div>  */}
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

        <div className="mb-3">
          <div>
            Already have an account? <Link to="/home/signin">Signin here</Link>
          </div>
          <button onClick={signup} style={styles.signupButton}>
            {" "}
            Sign Up{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 800,
    padding: 20,
    position: "relative",
    top: 0,
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
  signupButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#795da3",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

export default Signup;
