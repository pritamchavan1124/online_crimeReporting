import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/input";
import config from "../../config";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [securityQuestionId, setSecurityQuestionId] = useState();
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestionName, setSecurityQuestionName] = useState(
    "Select Security Question"
  );
  const [secQuestionList, setSecQuestionList] = useState([]);
  const navigate = useNavigate();

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

  const resetPassword = () => {
    if (email.length === 0) {
      toast.error("please enter your email");
    } else if (securityQuestionName === "Select Security Question") {
      toast.error("please select your security question");
    } else if (answer.length === 0) {
      toast.error("please enter your answer");
    } else if (password.length === 0 || password.length < 4) {
      toast.error("please ensure password length must be atleast 4");
    } else if (confirmPassword.length === 0) {
      toast.error("please Confirm Password");
    } else if (password !== confirmPassword) {
      toast.error("password does not match ");
    } else {
      axios
        .put(config.serverURL + "/api/home/resetpassword", {
          email,
          securityQuestionId,
          answer,
          password,
        })
        .then((response) => {
          const result = response.data;
          toast.success("Password Reset Successfull");
          navigate("/home/signin");
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getSecurityQuestionList();
  }, []);

  return (
    <div style={{ marginTop: 40 }}>
      <div style={styles.container}>
        <h3 style={{ textAlign: "center", margin: 10 }}> Reset Password</h3>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          title="Enter your registered email"
        />

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

        <Input
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          title="Enter your answer"
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          title="Enter your New Password"
          type="password"
        />

        <Input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          title="Confirm Password"
          type="password"
        />

        <Button onClick={resetPassword} title="Submit" />
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
};

export default ResetPassword;
