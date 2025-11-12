import { Response } from "express";
import Task from "../models/Task.js";
import { AuthRequest } from "../middleware/auth.js";

export const crearTarea = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { nombre, fecha, completed } = req.body;

    const tarea = new Task({ nombre, fecha, completed, user: userId });
    await tarea.save();

    res.status(201).json({
      id: tarea._id,
      nombre: tarea.nombre,
      fecha: tarea.fecha,
      completed: tarea.completed,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Error creando tarea" });
  }
};

export const listarTareas = async (req: AuthRequest, res: Response) => {
  try {
    const tareas = await Task.find({ user: req.userId });
    res.json(tareas);
  } catch (err: any) {
    res.status(500).json({ error: "Error listando tareas" });
  }
};

export const actualizarTarea = async (req: AuthRequest, res: Response) => {
  try {
    const tarea = await Task.findById(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    if (tarea.user.toString() !== req.userId)
      return res.status(403).json({ error: "Acceso denegado" });

    Object.assign(tarea, req.body);
    await tarea.save();

    res.json({
      id: tarea._id,
      nombre: tarea.nombre,
      fecha: tarea.fecha,
      completed: tarea.completed,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Error actualizando tarea" });
  }
};

export const eliminarTarea = async (req: AuthRequest, res: Response) => {
  try {
    const tarea = await Task.findById(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    if (tarea.user.toString() !== req.userId)
      return res.status(403).json({ error: "Acceso denegado" });

    await tarea.deleteOne();
    res.json({ message: "Tarea eliminada" });
  } catch (err: any) {
    res.status(500).json({ error: "Error eliminando tarea" });
  }
};
