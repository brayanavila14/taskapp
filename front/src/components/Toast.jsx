import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Toast({
    open,
    onClose,
    type = "info",
    message = "",
    autoClose = 1800,
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
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50 px-4 w-96 opacity-70">
            <div
                className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white
                    transition-all duration-300
                    ${colors[type]}
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
                `}
            >
                <span className="font-semibold">{message}</span>

                {!autoClose && (
                    <button
                        onClick={() => {
                            setVisible(false);
                            setTimeout(onClose, 200);
                        }}
                        className="text-white/80 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
