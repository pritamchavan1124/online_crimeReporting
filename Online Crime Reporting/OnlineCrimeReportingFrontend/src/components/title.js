const bharatiyaFlag = require("../imagesForTitle/indianFlag.png");
const nationalEmblem = require("../imagesForTitle/nationalEmblem.jpg");
const pplogo = require("../imagesForTitle/punePoliceLogo.jpg");

const Title = () => {
  return (
    <div className="row" style={{ display: "flex", marginTop: "1rem" }}>
      {/* <div className="col-1">
        {" "}
        <img
          src={pplogo}
          alt="Pune Police Logo"
          style={{ height: 120, width: "auto" }}
        />
      </div> */}

      <div className="col-10">
        <h3 style={{ fontWeight: "bold", color: "#795da3" }}>
               शहर ऑनलाइन अपराध रिपोर्टिंग सेवा
        </h3>
        <h1
          style={{
            fontWeight: "bolder",
            color: "#9a6700",
            alignItems: "center",
          }}
        >
         CITY ONLINE CRIME REPORTING
        </h1>
        {/* <div style={{ fontSize: 20, fontWeight: "bold" }}>
          <span style={{ color: "orange" }}>EMBOLDENING </span>
          <span style={{ color: "blue" }}> RIGHTS OF </span>
          <span style={{ color: "#4CAF50" }}> PEOPLE</span>
        </div> */}
      </div>
      <div
        className="col-1"
        style={{
          justifyContent: "flex-end",
          textAlign: "end",
          display: "flex",
        }}
      >
        <img
          src={bharatiyaFlag}
          alt="Bharatiya flag"
          style={{ height: 120, width: "auto", padding: 5 }}
        />
        <img
          src={nationalEmblem}
          alt="National Emblem"
          style={{ height: 120, width: "auto", padding: 5 }}
        />
      </div>
    </div>
  );
};
export default Title;
