import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const signToken = (id: string): string => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn: string | number = process.env.JWT_EXPIRES_IN || "1h";
  return jwt.sign({ id }, secret, { expiresIn } as jwt.SignOptions);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, name, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: "Usuario ya existe" });

    const user = new User({ username, name, password });
    await user.save();

    const token = signToken((user._id as unknown as string).toString());

    res.status(201).json({
      user: { id: user._id, username: user.username, name: user.name },
      token,
    });
    console.log("SECRET:", process.env.JWT_SECRET);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Error en registro" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const match = await user.comparePassword(password);
    if (!match)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const token = signToken((user._id as unknown as string).toString());

    res.json({
      user: { id: user._id, username: user.username, name: user.name },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Error en login" });
  }
};
