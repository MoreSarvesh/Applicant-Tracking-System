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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Hero />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
