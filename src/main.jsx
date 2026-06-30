import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Layout from "./layout/Layout";
import RequireAuth from "./RequireAuth.jsx";
import { initAuthObserver } from "./stores/use-auth-store";

// Carga diferida (code-splitting): cada página y, sobre todo, cada escena 3D
// se descarga solo cuando se navega a ella. Reduce mucho el bundle inicial.
const Home = lazy(() => import("./pages/home/Home.jsx"));
const Quiz = lazy(() => import("./pages/quiz/Quiz.jsx"));
const NotFound = lazy(() => import("./pages/not-found/NotFound.jsx"));
const Lung = lazy(() => import("./pages/lung/Lung.jsx"));
const Asthma = lazy(() => import("./pages/lung/asthma/Asthma.jsx"));
const Bronchitis = lazy(() => import("./pages/lung/bronchitis/Bronchitis.jsx"));
const Pneumonia = lazy(() => import("./pages/lung/pneumonia/Pneumonia.jsx"));
const PulmonaryFibrosis = lazy(() =>
  import("./pages/lung/pulmonary-fribrosis/PulmonaryFibrosis.jsx")
);
const Login = lazy(() => import("./pages/login/Login.jsx"));
const Diseases = lazy(() => import("./pages/diseases/Diseases.jsx"));
const AboutUs = lazy(() => import("./pages/about-us/AboutUs.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const SiteMap = lazy(() => import("./pages/site-map/SiteMap.jsx"));

// Inicia el observador de sesión una sola vez (antes era un side-effect al importar).
initAuthObserver();

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__spinner" />
      <span>Cargando…</span>
    </div>
  );
}

// Nota: NO usamos <StrictMode>. En desarrollo, StrictMode monta/desmonta dos
// veces cada componente, lo que DUPLICA los contextos WebGL de los múltiples
// <Canvas> de cada escena 3D y agota el límite del navegador (Context Lost).
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="quiz" element={<RequireAuth><Quiz /></RequireAuth>} />
          <Route path="mapa-del-sitio" element={<SiteMap />} />
          <Route path="iniciar-sesion" element={<Login />} />
          <Route path="enfermedades" element={<Diseases />} />
          <Route path="acerca-de-nosotros" element={<AboutUs />} />
          <Route path="pulmon" element={<Lung />}>
            <Route path="asma" element={<Asthma />} />
            <Route path="bronquitis" element={<Bronchitis />} />
            <Route path="neumonia" element={<Pneumonia />} />
            <Route path="fibrosis-pulmonar" element={<PulmonaryFibrosis />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);
