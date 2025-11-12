import { Request, Response } from "express";
import User from "../models/User.js";

export const listarUsuarios = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err: any) {
    console.error("Error al listar usuarios:", err);
    res.status(500).json({ error: "Error al listar usuarios" });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const update = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no existe" });

    Object.assign(user, update);
    await user.save();

    res.json({ id: user._id, username: user.username, name: user.name });
  } catch (err: any) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err: any) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
