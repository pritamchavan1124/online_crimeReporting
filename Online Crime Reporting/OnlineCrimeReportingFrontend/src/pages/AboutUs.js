import React, { useState } from "react";
// import pratik from "../assets/team/pratik.jpeg";
// import onkar from "../assets/team/onkar.jpg";
// import vikrant from "../assets/team/vikrant.jpg";
// import rushikesh from "../assets/team/rushikesh.jpeg";
import pravin from "../assets/team/Pravin Desai.jpg";
import pratik from "../assets/team/Pratik Pathak.JPG";
const AboutUs = () => {
  return (
    <div>
      <div className="about-section">
        <h1>Devlopers</h1>
        <p>
          We are students of IACSD,Akurdi
        </p>
        <p>
          Our Team made this Portal to provide Service to register online
          complaint.
        </p>
      </div>
      <div className="divs">
        <div>
          <center>
            <h2>Our Team</h2>
            <br></br>
            <h2>-----P*P=P^2-----</h2>
          </center>
        </div>
        <br />
        <br />
        <div className="about-section">
          <div
            className="card shadow p-3 mb-5 bg-body rounded"
            style={styles.imgStyle}
          >
            <div>
              <center>
                <img
                  // className="bd-placeholder-img rounded-circle img-flex"
                  width="200px"
                  height="200px"
                  padding="0px"
                  // src={pratik}
                  className="rounded-circle z-depth-2"
                  alt="100x100"
                  //src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png"
                  src={pravin}
                  data-holder-rendered="true"
                />
              </center>
              <div className="container ">
                <h2>Pravin Desai</h2>
                <p className="title">Student of IACSD,Akurdi</p>
                <p>
                  This is a web based portal if you have any query please Email
                  us.
                </p>
                <p>desaipravincdac@gmail.com</p>
              </div>
            </div>
          </div>
          <br />
          <br />
                    <br />
          <br />
          <div className="column">
            <div
              className="card shadow p-3 mb-5 bg-body rounded"
              style={styles.imgStyle}
            >
              <center>
                <img
                  className="bd-placeholder-img rounded-circle border-dark"
                  width="200"
                  height="200"
                  //src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png"
                  src={pratik}
                ></img>
              </center>
              <div className="container">
                <h2>Pratik Pathak</h2>
                <p className="title">Student of IACSD,Akurdi</p>
                <p>
                  Explore our portal service which are helful for you .Thankyou!
                </p>
                <p>pathakpratik999@gmail.com</p>
              </div>
            </div>
          </div>
          <br />
          <br />
          
        </div>
      </div>
    </div>
  );
};

const styles = {
  imgStyle: {
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: "20px",
    borderWidth: "3px",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    backgroundColor: "#F5F1FF",
  },
};
export default AboutUs;
