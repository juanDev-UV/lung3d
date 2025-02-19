import { Outlet, useLocation } from "react-router";
import "./Lung.css";

const Lung = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  return (
    <div>
      <h1>Enfermedades del Pulmon</h1>
      <p>{userData?.displayName}</p>
      <Outlet />
    </div>
  );
};

export default Lung;
