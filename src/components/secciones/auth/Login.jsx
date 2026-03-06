import {useState} from "react";
import {useNavigate} from "react-router-dom"; // Importamos para redirigir
import "./Login.css";

const Login = () => {
    const navigate = useNavigate(); // Hook para la navegación
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const API_URL = "http://localhost:5000/api/users";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegister ? "/register" : "/login";

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // 1. Guardar la sesión en el navegador
                // Guardamos el objeto del usuario (id, nombre, email) para usarlo en la Navbar
                localStorage.setItem("user", JSON.stringify(data));

                alert(isRegister ? "Usuario registrado correctamente" : "¡Bienvenido de nuevo!");

                // 2. Redirigir al Inicio (Home) tras el éxito
                navigate("/");
            } else {
                alert(`Error: ${data.message || "Credenciales incorrectas"}`);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor. Verifica que el backend esté encendido.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="text-white text-2xl font-bold mb-4">{isRegister ? "Registro" : "Iniciar Sesión"}</h2>

                {isRegister ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre Completo"
                            className="input-field" // Asegúrate de tener estilos para esto
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            className="input-field"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </>
                ) : (
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        className="input-field"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="btn-primary">
                    {isRegister ? "Registrarse" : "Entrar"}
                </button>

                <p className="toggle-text mt-4 text-gray-300">
                    {isRegister ? "¿Ya tienes cuenta?" : "¿Es tu primera vez?"}
                    <span
                        onClick={() => setIsRegister(!isRegister)}
                        style={{cursor: "pointer", color: "#ff0000", fontWeight: "bold", marginLeft: "5px"}}
                    >
                        {isRegister ? "Inicia sesión" : "Regístrate"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
