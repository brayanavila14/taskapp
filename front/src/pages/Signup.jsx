import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowBigLeftIcon } from "lucide-react";
import api from "../api/api";
import { useUserStore } from "../store/useUser";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Toast from "../components/toast";

export default function Login() {
    const navigate = useNavigate();
    const login = useUserStore((state) => state.login);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [modal, setModal] = useState({
        open: false,
        type: "error",
        message: "",
        autoClose: 0,
    });

    const showModal = (type, message, time = 2000) => {
        setModal({
            open: true,
            type,
            message,
            autoClose: time,
        });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !name || !password) return showModal("error", "Faltan campos por rellenar")
        try {
            const { data } = await api.post("/auth/register", { username, name, password });

            login(data.user);

            showModal("success", "Bienvenido 🎉", 1000);

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (err) {
            const msg = err.response?.data?.error || "Error en registrar";
            showModal("error", msg, 2000);
        }
    };

    return (
        <>
            <Toast
                open={modal.open}
                onClose={() => setModal({ ...modal, open: false })}
                type={modal.type}
                message={modal.message}
                autoClose={modal.autoClose}
            />


            <div className="flex items-center justify-center min-h-screen px-4 animate-page">
                <Link to="/">
                    <ArrowBigLeftIcon
                        className="absolute top-5 left-5 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-700 cursor-pointer"
                    />
                </Link>
                <div className="w-full max-w-sm bg-gray-800/80 border border-gray-700 rounded-3xl p-8 shadow-xl">
                    <h1 className="text-5xl text-center font-bold text-indigo-400 tracking-wide mb-6 select-none">
                        Task<span className="text-white">App</span>
                    </h1>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <InputField
                            id="username"
                            label="Usuario"
                            placeholder="Tu usuario"
                            value={username}
                            onChange={setUsername}
                        />
                        <InputField
                            id="name"
                            label="Nombre usuario"
                            placeholder="ej. Andrés Goméz"
                            value={name}
                            onChange={setName}
                        />

                        <InputField
                            id="password"
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={setPassword}
                        />

                        <Button type="submit" variant="primary">
                            Registrar
                        </Button>
                    </form>
                </div>
            </div>
            <footer className="absolute bottom-1 right-3 text-center text-xs text-gray-600 select-none opacity-90 tracking-wide pointer-events-none">
                © 2025 BrayDev. Todos los derechos reservados.
            </footer>
        </>
    );
}
