const styles = {
    primary:
        "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-500/20",
    secondary:
        "bg-gray-700 hover:bg-gray-600 text-gray-100 shadow-md hover:shadow-gray-500/20",
    success:
        "bg-green-600 hover:bg-green-500 text-white shadow-md hover:shadow-green-500/20",
    error:
        "bg-red-600 hover:bg-red-500 text-white shadow-md hover:shadow-red-500/20",
    warning:
        "bg-yellow-500 hover:bg-yellow-400 text-black shadow-md hover:shadow-yellow-400/20",
};

export default function Button({
    children,
    variant = "primary",
    type = "button",
    onClick,
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full rounded-lg py-2.5 font-semibold transition ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
