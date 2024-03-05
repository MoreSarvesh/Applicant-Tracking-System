import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./components/Register.component.jsx";
import HomeLayout from "./layouts/HomeLayout.layout.jsx";
import RootLayout from "./layouts/RootLayout.layout.jsx";
import Hero from "./components/Hero.component.jsx";
import Login from "./components/Login.component.jsx";
import Jobs from "./pages/Jobs.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Hero />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="ats" element={<RootLayout />}>
        <Route index element={<div>Dashboard</div>} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="assessment" element={<div>assessment</div>} />
        <Route path="emails" element={<div>emails</div>} />
        <Route path="talentpool" element={<div>talentpool</div>} />
        <Route path="settings" element={<div>settings</div>} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
