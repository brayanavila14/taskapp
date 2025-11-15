import { Link } from "react-router-dom";

export default function MenuItem({ icon, text, active = false, to }) {
    const baseStyles = `
        flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition font-medium text-sm
    `;

    const activeStyles = active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
        : "text-gray-300 hover:bg-gray-700 hover:text-white";

    return (
        <Link to={to} className={`${baseStyles} ${activeStyles}`}>
            {icon}
            <span>{text}</span>
        </Link>
    );

}
