import DropdownItem from "@restart/ui/esm/DropdownItem";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//import CreateCorousel from "../components/corousel";
import axios from "axios";
import config from "../../config";
import "./signin.css";
import police_car from "../../assets/video/police_car.mp4";

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("enter your email");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signinUser = () => {
    console.log("email" + email + "   password" + password);
    const body = {
      email,
      password,
    };

    const url = config.serverURL + "/api/home/signin";
    axios
      .post(url, body)
      .then((resp) => {
        console.log(resp);
        const result = resp.data;
        //sessionStorage['token'] = result['jwt']
        //sessionStorage['role'] = result['role']
        //sessionStorage['id'] = result['id']

        dispatch(signin(result));
        if (result.message === "Authentication successfull!") {
          toast.success(result.message);

          if (result.role === "ROLE_COMPLAINANT") {
            //navigate('/user/complaint/add', {state : {userId:id}})
            navigate("/user/myhome", { state: { userId: result.id } });
            //navigate('/user/myprofile',{state : {userId:result.id}})
          }
          if (result.role === "ROLE_POLICE_STATION") {
            navigate("/policestation", { state: { userId: result.id } });
          }
          if (result.role === "ROLE_ADMIN") {
            navigate("/api/admin/home", { state: { userId: result.id } });
          }
        } else {
          toast.error("Invalid Credentials");
          navigate("/home/signin");
        }
       
      })
      .catch((error) => {
        toast.error("Invalid Credentials");
        console.log(error);
      });
  };
  // import React from "react";
  // import videoBg from "../assets/videoBg.mp4";

  // const Main = () => {
  //   return (
  //     <div className='main'>
  //         <div className="overlay"></div>
  //         <video src={videoBg} autoPlay loop muted />
  //         <div className="content">
  //             <h1>Welcome</h1>
  //             <p>To my site.</p>
  //         </div>
  //     </div>
  //   )
  // }

  // export default Main
  return (
    <>
      <div className="main">
        <div className="overlay"></div>
        <video src={police_car} autoPlay loop muted />
        <div>
          <div>
            <div style={styles.container}>
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
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="form-control"
                />
              </div>
              {/* <div className="mb-3">
                <label>Role</label>
                <select value={role} onChange={(e)=>{setRole(e.target.value)}}>
                    <option value="ROLE_COMPLAINANT">COMPLAINANT</option>
                    <option value="ROLE_POLICE_STATION">POLICE STATION</option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                </select>
                </div>  */}
              <div className="mb-3" style={{ marginTop: 5 }}>
                <div>
                  Did you forget your password?{" "}
                  <Link to="/home/resetpassword">Reset Password</Link>
                </div>

                <div>
                  Don't have an account?{" "}
                  <Link to="/home/signup">Signup here</Link>
                </div>

                <button onClick={signinUser} style={styles.signinButton}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   font-family: Impact, Haettenschweiler, "Arial Narrow", sans-serif;
//   border-radius: "10px";
//   border-width: "1px";
//   border-style: "solid";
//   background-color: rgba(0, 0, 0, 0.4);
//   box-shadow: "1px 1px 20px 5px #C9C9C9";

const styles = {
  container: {
    marginTop: 100,
    width: 400,
    height: 330,
    padding: 20,
    position: "absolute",
    top: 180,
    left: 30,
    right: 0,
    bottom: 0,
    //display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
    borderColor: "#795da3",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    color: "white",
    alignitems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  signinButton: {
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

export default Signin;
