import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-sm bg-gray-800/80 border border-gray-700 rounded-3xl p-8 shadow-xl">
                <h1 className="text-5xl text-center font-bold text-indigo-400 tracking-wide mb-6 select-none">
                    Task<span className="text-white">App</span>
                </h1>
                <form method="POST" className="space-y-5" onSubmit={handleLogin} >
                    <InputField id="username" label="Usuario" placeholder="Tu usuario" />
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Contraseña
                            </label>
                            <a
                                href="#"
                                className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        <InputField id="password" label="" type="password" placeholder="••••••••" />
                    </div>
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
    );
}
