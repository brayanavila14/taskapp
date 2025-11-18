import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useUserStore } from "../store/useUser";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Toast from "../components/toast";

export default function Login() {
    const navigate = useNavigate();
    const login = useUserStore((state) => state.login);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [modal, setModal] = useState({
        open: false,
        type: "error",
        message: "",
        autoClose: true,
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

        try {
            const { data } = await api.post("/auth/login", { username, password });

            login(data.user);

            showModal("success", "Bienvenido 🎉", 2000);

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (err) {
            const msg = err.response?.data?.error || "Error en login";
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


            <div className="flex items-center justify-center min-h-screen px-4">
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
                            id="password"
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={setPassword}
                        />

                        <Button type="submit" variant="primary">
                            Entrar
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        ¿No tienes usuario?
                        <a
                            href="#"
                            className="text-indigo-400 hover:text-indigo-300 font-semibold ml-1 transition"
                        >
                            Crea uno aquí
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
