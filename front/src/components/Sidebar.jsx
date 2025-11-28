import { useUserStore } from "../store/useUser";
import { Home, Settings, LogOut } from "lucide-react";
import MenuItem from "./MenuItem";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
    const { user, logout } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const name = user?.name || "usuario desconocido";
    const username = user?.username || "default";
    const parts = name.split(" ") || [];
    const firstTwoWords = parts.slice(0, 2).join("+");
    const avatarSrc = `https://ui-avatars.com/api/?name=${firstTwoWords}&background=4f46e5&color=fff`;

    return (
        <aside className="relative flex flex-col justify-between h-screen w-64 bg-gray-800 border-r border-gray-700 p-5 text-gray-200 overflow-hidden">
            <div>
                <h1 className="text-2xl font-bold text-indigo-400 tracking-wide mb-10 select-none">
                    Task<span className="text-white">App</span>
                </h1>

                <nav className="space-y-2">
                    <MenuItem
                        icon={<Home size={18} />}
                        text="Inicio"
                        to="/dashboard"
                        active={location.pathname === "/dashboard"}
                    />
                    <MenuItem
                        icon={<Settings size={18} />}
                        text="Configuración"
                        to="/settings"
                        active={location.pathname === "/settings"}
                    />
                </nav>
            </div>

            <div className="relative z-10 border-t border-gray-700 pt-4">
                <div className="flex items-center gap-3">
                    <img
                        src={avatarSrc}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-600"
                    />
                    <div>
                        <p className="text-sm font-semibold text-white">{name}</p>
                        <p className="text-xs text-gray-400">@{username}</p>
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
