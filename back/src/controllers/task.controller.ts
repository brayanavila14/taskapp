import { Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middleware/auth";

export const crearTarea = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { description, date, completed } = req.body;

    const tarea = new Task({ description, date, completed, user: userId });
    await tarea.save();

    res.status(201).json({
      id: tarea._id,
      description: tarea.description,
      date: tarea.date,
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

    if ("completed" in req.body && typeof req.body.completed === "boolean") {
      tarea.completed = req.body.completed;
    }

    await tarea.save();

    res.json({
      id: tarea._id,
      description: tarea.description,
      date: tarea.date,
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
