import { Outlet } from "react-router-dom";
import Heroimg from "../components/Heroimg.component.jsx";
const HomeLayout = () => {
  return (
    <div className="container">
      <Outlet />
      <Heroimg />
    </div>
  );
};

export default HomeLayout;
