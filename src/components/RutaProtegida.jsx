import { Navigate , useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaProtegida({rol, permitirAdminSiempre = true, children}){
    const {sesion} = useAuth();
    const location = useLocation();

    if(!sesion){
        return <Navigate to="/login" replace state={{from: location.pathname}}/>;
    }

    const tienePermiso = sesion.rol === rol || (permitirAdminSiempre && sesion.rol === 'administrador');

    if (!tienePermiso){
        return <Navigate to= "/" replace/>;
    }
    return children;
}

export default RutaProtegida;