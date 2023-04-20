import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
// import img3 from "../assets/corosole3.jpg"
import img1 from "../assets/corousel/img1.jpeg";
import img2 from "../assets/corousel/img2.jpg";
import img3 from "../assets/corousel/img3.jpg";
import img4 from "../assets/corousel/img4.jpg";
import img5 from "../assets/corousel/img5.jpg";
import img8 from "../assets/corousel/img8.jpg";

import Container from "react-bootstrap/Container";

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid>
      <div style={styles.divStyle}>
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item interval={1500}>
            <img
              style={styles.imgStyle}
              //className="mv-100 mw-100"
              src={img8}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              style={styles.imgStyle}
              //className="w-100 vh-100"
              //className="d-block w-100 h-100"
              src={img2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              style={styles.imgStyle}
              // className="w-100 vh-100"
              //className="d-block w-100 h-100"
              src={img3}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              style={styles.imgStyle}
              //className="w-100 vh-100"
              //className="d-block w-100 h-100"
              src={img4}
              alt="Fourth slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              style={styles.imgStyle}
              // className="w-100 vh-100"
              //className="d-block w-100 h-100"
              src={img1}
              alt="Fifth slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              style={styles.imgStyle}
              //className="w-100 vh-100"
              //className="d-block w-100 h-100"
              src={img5}
              alt="sixth slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </Container>
  );
}

const styles = {
  imgStyle: {
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: "20px",
    borderWidth: "5px",
    height: "400px",
    width: "900px",
    position: "relative",

    boxShadow: "1px 1px 20px 5px #C9C9C9",
    backgroundColor: "#F5F1FF",
  },
  divStyle: {
    height: "400px",
    width: "900px",
    position: "relative",

    boxShadow: "1px 1px 20px 5px #C9C9C9",
    backgroundColor: "#F5F1FF",
    margin: "auto",
  },
};

export default HomeCarousel;

// render(<ControlledCarousel />);

// ****************************************************************************

// import { useState } from "react";
// import { Carousel } from "react-bootstrap";

// const CreateCorousel=()=> {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <div
//       id="carouselExampleIndicators"
//       class="carousel slide"
//       data-bs-ride="true"
//     >
//       <div className="carousel-indicators">
//         <button
//           type="button"
//           data-bs-target="#carouselExampleIndicators"
//           data-bs-slide-to="0"
//           class="active"
//           aria-current="true"
//           aria-label="Slide 1"
//         ></button>
//         <button
//           type="button"
//           data-bs-target="#carouselExampleIndicators"
//           data-bs-slide-to="1"
//           aria-label="Slide 2"
//         ></button>
//         <button
//           type="button"
//           data-bs-target="#carouselExampleIndicators"
//           data-bs-slide-to="2"
//           aria-label="Slide 3"
//         ></button>
//       </div>
//       <div className="carousel-inner">
//         <div className="carousel-item active">
//           <img
//             style={{
//               borderStyle: "solid",
//               borderColor: "black",
//               borderRadius: "20px",
//               borderWidth: "5px",
//               height: "160px",
//               width: "220px",
//             }}
//             src="..."
//             class="d-block w-100"
//             alt="..."
//           />
//         </div>
//         <div className="carousel-item">
//           <img
//             style={{
//               borderStyle: "solid",
//               borderColor: "black",
//               borderRadius: "20px",
//               borderWidth: "5px",
//               height: "160px",
//               width: "220px",
//             }}
//             src="..."
//             class="d-block w-100"
//             alt="..."
//           />
//         </div>
//         <div className="carousel-item">
//           <img
//             style={{
//               borderStyle: "solid",
//               borderColor: "black",
//               borderRadius: "20px",
//               borderWidth: "5px",
//               height: "160px",
//               width: "220px",
//             }}
//             src="..."
//             class="d-block w-100"
//             alt="..."
//           />
//         </div>
//       </div>
//       <button
//         className="carousel-control-prev"
//         type="button"
//         data-bs-target="#carouselExampleIndicators"
//         data-bs-slide="prev"
//       >
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button
//         className="carousel-control-next"
//         type="button"
//         data-bs-target="#carouselExampleIndicators"
//         data-bs-slide="next"
//       >
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>
//   );
// }

// export default CreateCorousel;
