import { X } from "lucide-react";

export default function Modal({ open, onClose, title = "", children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                className={`
                    relative w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-6
                    animate-modal-in
                `}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                >
                    <X className="size-5" />
                </button>

                {title && (
                    <h2 className="text-lg font-semibold text-white mb-4">
                        {title}
                    </h2>
                )}

                {children}
            </div>
        </div>
    );
}
