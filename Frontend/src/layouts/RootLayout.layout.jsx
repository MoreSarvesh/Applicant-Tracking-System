import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.component.jsx";

const RootLayout = () => {
  return (
    <div className="jb-container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
