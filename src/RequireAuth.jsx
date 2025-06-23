/* eslint-disable react/prop-types */
// components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "./stores/use-auth-store";
 // ajusta la ruta

const RequireAuth = ({ children }) => {
    const user = useAuthStore(state => state.userLooged);
    const location = useLocation();

    if (!user) {
        // Redirige a login si no está autenticado
        return <Navigate to="/iniciar-sesion" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
