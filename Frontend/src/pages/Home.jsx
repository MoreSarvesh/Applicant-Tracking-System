import Hero from "../components/Hero.component.jsx";
import Heroimg from "../components/Heroimg.component.jsx";
import Login from "../components/Login.component.jsx";
import Register from "../components/Register.component.jsx";

const Home = () => {
  return (
    <div className="container">
      {/* <Hero /> */}
      {/* <Login /> */}
      <Register />
      <Heroimg />
    </div>
  );
};

export default Home;
