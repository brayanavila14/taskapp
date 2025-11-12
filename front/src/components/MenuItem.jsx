export default function MenuItem({ icon, text, active = false, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition font-medium text-sm
        ${active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
        >
            {icon}
            <span>{text}</span>
        </button>
    );
}
