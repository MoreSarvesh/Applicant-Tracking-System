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
import Settings from "./pages/Settings.jsx";
import Assessment from "./pages/Assessment.jsx";
import Mails from "./pages/Mails.jsx";
import Talentpool from "./pages/Talentpool.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import AssesmentDetails from "./pages/AssesmentDetails.jsx";
import CandidateAssessment from "./public pages/CandidateAssessment.jsx";

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
        <Route path="assessments" element={<Assessment />} />
        <Route path="emails" element={<Mails />} />
        <Route path="talentpool" element={<Talentpool />} />
        <Route path="settings" element={<Settings />} />
        <Route path="jobs/:job" element={<JobDetails title={"Job 1"} />} />
        <Route path="assessments/:assessment" element={<AssesmentDetails />} />
      </Route>
      <Route
        path="candidate/assessment/:id"
        element={<CandidateAssessment />}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
