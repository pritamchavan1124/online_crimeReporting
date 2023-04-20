import { Link } from "react-router-dom";
import HomeCarousel from "../../components/corousel";
import Policestation from "../police_station/policestation";

const Home = () => {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <br />
      <HomeCarousel />

      {/* <Link to="/policestation">police station</Link>
      <br />
      <Link to="/api/admin/home">Admin Home</Link> */}
    </div>
  );
};
export default Home;
