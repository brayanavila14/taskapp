import Sidebar from "../components/Sidebar";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useState } from "react";
import api from "../api/api";
import { useUserStore } from "../store/useUser";
import Toast from "../components/Toast";
import Modal from "../components/Modal";

export default function Settings() {
    const user = useUserStore((state) => state.user);
    const updateUser = useUserStore((state) => state.updateUser);

    const [username, setUsername] = useState(user?.username || "");
    const [name, setName] = useState(user?.name || "");
    const [originPass, setOriginPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [toast, setToast] = useState({
        open: false,
        type: "error",
        message: "",
        autoClose: 0,
    });

    const [confirmModal, setConfirmModal] = useState(false);

    const showToast = (type, message, time = 1000) => {
        setToast({ open: true, type, message, autoClose: time });
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/users/${user?.id}`);
            showToast("success", "Cuenta eliminada.", 300);
            setConfirmModal(false);
        } catch (err) {
            const msg = err.response?.data?.error || "Error al eliminar cuenta";
            showToast("error", msg);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Payload enviado:", { name, username, originPass, newPass });
        if (!username || !name || !originPass || !newPass || !confirmPass) return showToast("error", "Faltan campos por rellenar");
        if (newPass !== confirmPass) return showToast("error", "Las contraseñas no coinciden");

        try {
            const { data } = await api.put(`/users/${user?.id}`, {
                name, username, originPass, newPass
            });
            updateUser(data.user);
            showToast("success", "Perfil actualizado 🎉");
        } catch (err) {
            const msg = err.response?.data?.error || "Error al actualizar";
            showToast("error", msg);
        }
    };

    return (
        <>
            <Toast
                open={toast.open}
                onClose={() => setToast({ ...toast, open: false })}
                type={toast.type}
                message={toast.message}
                autoClose={toast.autoClose}
            />
            <Modal
                open={confirmModal}
                onClose={() => setConfirmModal(false)}
                title="Confirmar eliminación"
            >
                <p className="text-gray-300 mb-4">
                    ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={() => setConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="error" onClick={handleDelete}>
                        Sí, eliminar
                    </Button>
                </div>
            </Modal>

            <div className="flex h-screen bg-gray-900 text-white">
                <Sidebar />
                <main className="flex-1 p-8 mx-auto animate-page">
                    <h2 className="text-3xl text-center font-bold mb-6">Configuración</h2>
                    <form className="space-y-5 max-w-md mx-auto" onSubmit={handleUpdate}>
                        <InputField id="username" label="Usuario" value={username} onChange={setUsername} />
                        <InputField id="name" label="Nombre" value={name} onChange={setName} />
                        <InputField id="originPass" label="Ingrese su contraseña" type="password" value={originPass} onChange={setOriginPass} />
                        <InputField id="newPass" label="Nueva contraseña" type="password" value={newPass} onChange={setNewPass} />
                        <InputField id="confirmPass" label="Confirmar contraseña" type="password" value={confirmPass} onChange={setConfirmPass} />

                        <Button type="submit" variant="primary">Guardar cambios</Button>
                        <Button variant="error" onClick={() => setConfirmModal(true)}>Eliminar Cuenta</Button>
                    </form>
                </main>
                <footer className="absolute bottom-1 right-3 text-center text-xs text-gray-600 select-none opacity-90 tracking-wide pointer-events-none">
                    © 2025 BrayDev. Todos los derechos reservados.
                </footer>
            </div>
        </>
    );
}
