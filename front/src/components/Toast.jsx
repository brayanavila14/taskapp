import { useEffect, useState } from "react";

export default function Toast({
    open,
    onClose,
    type = "info",
    message = "",
    autoClose = 2000,
}) {
    const [visible, setVisible] = useState(false);

    const colors = {
        error: "bg-red-500",
        success: "bg-green-500",
        info: "bg-blue-500",
    };

    useEffect(() => {
        if (open) {
            setVisible(true);

            if (autoClose) {
                const timer = setTimeout(() => {
                    setVisible(false);
                    setTimeout(onClose, 300);
                }, autoClose);
                return () => clearTimeout(timer);
            }
        }
    }, [open, autoClose, onClose]);

    if (!open) return null;

    return (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 w-96 opacity-70">
            <div
                className={`
                flex items-center justify-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white
                ${colors[type]}
                ${visible ? "animate-toast-in" : "animate-toast-out"}
            `}
            >
                <span className="font-semibold">{message}</span>
            </div>

        </div>
    );
}
