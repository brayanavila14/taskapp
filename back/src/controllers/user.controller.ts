import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    if (req.userId !== req.params.id) {
      return res
        .status(403)
        .json({ error: "No puedes modificar otro usuario" });
    }

    const { name, username, originPass, newPass } = req.body;
    console.log("contrraseña:", originPass);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no existe" });
    console.log("contrraseña:", originPass);
    const valid = await user.comparePassword(originPass);
    console.log("compare result:", valid);
    if (!valid) {
      return res.status(400).json({ error: "Contraseña actual incorrecta" });
    }

    if (name) user.name = name;
    if (username) user.username = username;
    if (newPass) user.password = newPass;

    await user.save();

    res.json({
      id: user._id,
      username: user.username,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(403).json({ error: "No puedes eliminar otro usuario" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
