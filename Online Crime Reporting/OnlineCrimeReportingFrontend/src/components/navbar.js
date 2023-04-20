import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();

  //let's get the curr. user signed in stts so that we we will make a change in navbar ..so that user could see signout after successfull signin
  const signinStatus = useSelector((state) => state.authSlice.status);
  //the complete state was given to u out of it we need authslice ka stts
  const dispatch = useDispatch();

  //   //for scrolling purpose
  //   // const [activeLink, setActiveLink] = useState("/"); //to manage link which we are on
  //   const [scrolled, setScrolled] = useState(false);

  //   useEffect(() => {
  //     const onScroll = () => {
  //       if (window.scrollY > 50) {
  //         setScrolled(true);
  //       } else {
  //         setScrolled(false);
  //       }
  //     };

  //     window.addEventListener("scroll", onScroll);

  //     return () => window.removeEventListener("scroll", onScroll);
  //   }, []);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="navbar  navbar-expand-lg"
      style={{ backgroundColor: "#795da3" }}
      // expand="lg"
      //className={scrolled ? "scrolled" : ""}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          OCRS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
                style={{ color: "white" }}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                //to="/aboutUs"
                style={{ color: "white" }}
                to="/home/about"
              >
                ABOUT DEV's
              </Link>
            </li>
            {!signinStatus ? (
              <li className="nav-item dropdown" style={{ color: "white" }}>
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "white" }}
                >
                  SERVICES
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/home/emergencycomplaint"
                    >
                      Emergency Complaint
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/home/signup">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li></li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/contactUs"
                style={{ color: "white" }}
              >
                CONTACT US
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/feedback"
                style={{ color: "white" }}
              >
                FAQ's
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/home/signin"
                style={{ color: "white" }}
              >
                SIGNIN
              </Link>
            </li>
            {sessionStorage.getItem('token')?
            <li className="nav-item">
            <button className="btn btn-danger ml-2" onClick={logout}>Logout</button>
            </li>:null
            } */}
          </ul>
          {/* since signin -out is on rhs hence made the another unordered list */}
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              {/* if user is not signed in then render signin link here if sgninstts is false make it explicitly true to render signin link */}
              {!signinStatus && (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home/signin"
                  style={{ color: "white" }}
                >
                  SIGN IN
                </Link>
              )}
              {/* if user is signed in then render signout link here since sgninstts is true direct render signout link */}
              {signinStatus && (
                //since signout needs to be btn make it btn instead of link
                <button
                  className="btn btn-link"
                  onClick={() => {
                    //go to signin page back
                    navigate("/home/signin");
                    //send the action to let the user signout
                    dispatch(signout());
                  }}
                  style={{ color: "white", textDecoration: "none" }}
                  aria-current="page"
                >
                  SIGN OUT
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
