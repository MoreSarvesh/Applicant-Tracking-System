import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Pageheader = ({ title }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    /*     const response = await fetch("http://localhost:5000/users/logout", {
      credentials: "include",
    });
    if (!response.ok) {
      return toast("Something went wrong!");
    }
    const data = await response.json();
    console.log(data);
    toast(data.message);
    return navigate("/login"); */
    toast.promise(
      fetch("http://localhost:5000/users/logout", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => navigate("/login")),
      {
        pending: "Logging out",
        success: "Loged Out",
        error: "error",
      }
    );
  };
  return (
    <header className="jb-header">
      <h3>{title}</h3>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Pageheader;
