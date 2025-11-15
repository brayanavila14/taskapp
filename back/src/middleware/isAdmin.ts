import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import User from "../models/User";

export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!user.isadmin) {
      return res
        .status(403)
        .json({ error: "Acceso solo para administradores" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Error verificando permisos" });
  }
};
