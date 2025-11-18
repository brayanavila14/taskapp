import { useUserStore } from "../store/useUser";
import { Home, Users, Settings, LogOut } from "lucide-react";
import MenuItem from "./MenuItem";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const { user, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="relative flex flex-col justify-between h-screen w-64 bg-gray-800 border-r border-gray-700 p-5 text-gray-200 overflow-hidden">
            <div>
                <h1 className="text-2xl font-bold text-indigo-400 tracking-wide mb-10 select-none">
                    Task<span className="text-white">App</span>
                </h1>

                <nav className="space-y-2">
                    <MenuItem icon={<Home size={18} />} text="Inicio" active to="/dashboard" />
                    {user?.isadmin && <MenuItem icon={<Users size={18} />} text="Usuarios" to="/users" />}
                    <MenuItem icon={<Settings size={18} />} text="Configuración" to="/setting" />
                </nav>
            </div>

            <div className="relative z-10 border-t border-gray-700 pt-4">
                <div className="flex items-center gap-3">
                    <img
                        src="https://ui-avatars.com/api/?name=Bray+Dev&background=4f46e5&color=fff"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-600"
                    />
                    <div>
                        <p className="text-sm font-semibold text-white">{user?.username}</p>
                        <p className="text-xs text-gray-400">{user?.name}</p>
                    </div>
                </div>

                <Button
                    variant="secondary"
                    className="mt-4 flex items-center gap-2 justify-center w-full text-sm py-2"
                    onClick={handleLogout}
                >
                    <LogOut size={16} />
                    Cerrar sesión
                </Button>
            </div>
        </aside>
    );
}
