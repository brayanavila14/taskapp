import { useUserStore } from "../store/useUser";
import { Home, Users, Settings, LogOut } from "lucide-react";
import MenuItem from "./MenuItem";
import Button from "./Button";

export default function Sidebar() {
    const { user } = useUserStore();

    return (
        <aside className="relative flex flex-col justify-between h-screen w-64 bg-gray-800 border-r border-gray-700 p-5 text-gray-200 overflow-hidden">
            <div>
                <h1 className="text-2xl font-bold text-indigo-400 tracking-wide mb-10 select-none">
                    Task<span className="text-white">App</span>
                </h1>

                <nav className="space-y-2">
                    <MenuItem icon={<Home size={18} />} text="Inicio" active to="/dashboard" />
                    {user.isadmin && <MenuItem icon={<Users size={18} />} text="Usuarios" to="/users" />}
                    <MenuItem icon={<Settings size={18} />} text="Configuración" to="/setting" />
                </nav>
            </div>

            {/* --- Bottom section: Perfil y Logout --- */}
            <div className="relative z-10 border-t border-gray-700 pt-4">
                <div className="flex items-center gap-3">
                    <img
                        src="https://ui-avatars.com/api/?name=Bray+Dev&background=4f46e5&color=fff"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-600"
                    />
                    <div>
                        <p className="text-sm font-semibold text-white">Bray Dev</p>
                        <p className="text-xs text-gray-400">Administrador</p>
                    </div>
                </div>

                <Button
                    variant="secondary"
                    className="mt-4 flex items-center gap-2 justify-center w-full text-sm py-2"
                >
                    <LogOut size={16} />
                    Cerrar sesión
                </Button>
            </div>

            <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-600 select-none opacity-10 tracking-wide pointer-events-none">
                by BrayDev 2025
            </p>
        </aside>
    );
}
