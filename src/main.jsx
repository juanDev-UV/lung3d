import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home.jsx";
import Quiz from "./pages/quiz/Quiz.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";
import Lung from "./pages/lung/Lung.jsx";
import Asthma from "./pages/lung/asthma/Asthma.jsx";
import Bronchitis from "./pages/lung/bronchitis/Bronchitis.jsx";
import Pneumonia from "./pages/lung/pneumonia/Pneumonia.jsx";
import PulmonaryFibrosis from "./pages/lung/pulmonary-fribrosis/PulmonaryFibrosis.jsx";
import "./index.css";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login.jsx";
import Diseases from "./pages/diseases/Diseases.jsx";
import AboutUs from "./pages/about-us/AboutUs.jsx";

// import App from "./App";

createRoot(document.getElementById("root")).render(
  // <App />
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="*" element={<NotFound />} />
        <Route path="iniciar-sesion" element={<Login />} />
        <Route path="enfermedades" element={<Diseases/>}/>
        <Route path="acerca-de-nosotros" element={<AboutUs />} />
        <Route path="pulmon" element={<Lung />}>
          <Route path="asma" element={<Asthma />} />
          <Route path="bronquitis" element={<Bronchitis />} />
          <Route path="neumonia" element={<Pneumonia />} />
          <Route path="fibrosis-pulmonar" element={<PulmonaryFibrosis />} />
        </Route>
      </Routes>
    </Layout>
  </BrowserRouter>
);
