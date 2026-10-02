const { createContext, useContext } = require("react");

const CLAVE_SESION = "sonidoVivoSesion";
const CLAVE_USUARIO = "sonidoVivoUsuario";

function leerJSON(clave, porDefecto){
    try{
        const valor = localStorage.getItem(clave)
        return valor ? JSON.parse(valor): porDefecto
    } catch{
        return porDefecto
    }
}

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [sesion, setSesion] = useSate(() => leerJSON(CLAVE_SESION, null));

    function login(email,password){
        if(!email.trim() || !password){
            return{ok: false, error: "Complete correo y contraseña"};
        }

        const usuarios = leerJSON(CLAVE_USUARIO, []);
        const usuario = usuarios.find(
            u => u.email.toLowerCase()== email.trim().toLowerCase() && u.password === password
        );

        if(!usuario){
            return {ok: false, error: "Correo o contraseña incorrect@"};
        }

        if(usuario.activo === false){
            return {ok: false, error: "Tu cuenta ha sido desactivada"};
        }

        const nuevaSesion = {email : usuario.email, nombre: usuario.nombre, rol: usuario.rol || "cliente"};

        localStorage.setItem(CLAVE_SESION, JSON.stringify(nuevaSesion));
        setSesion(nuevaSesion);

        return {ok: true, sesion: nuevaSesion};
    }

    function registrar({nombre, email, password, confirmPassword}){
        if(!nombre.trim() || !email.trim() || !password || !confirmPassword){
            return {ok: false, error: "Complete todos los campos"}
        }

        if(password.length<6){
            return {ok: false, error: "La contraseña debe tener al menos 6 caracteres."};
        }

        if(!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)){
            return {ok: false, error: "La contraseña debe tener Mayusculas, minusculas y numero."};
        }

        if(password !== confirmPassword){
            return {ok: false, error: "Las contraseñas no coiciden."};
        }

        const usuarios = leerJSON(CLAVE_USUARIO, []);
        const yaExiste = usuarios.some(u=> u.email.toLowerCase() == email.trim().toLowerCase());

        if(yaExiste){
            return {ok: false, error: "Ya existe una cuenta registrada con ese correo"}
        }

        let rol = "cliente";
        if(email.endsWith("@admin.com")) rol = "administrador";
        else if (email.endsWith("@vendedor.com")) rol = "vendedor";

        usuarios.push({nombre: nombre.trim(), email: email.trim(), password, rol});

        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuarios))

        return {ok:true}
    }

    function logout(){
        localStorage.removeItem(CLAVE_SESION);
        setSesion(null);
    }


    const  value = {
        sesion,
        login,
        registrar,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext);
}