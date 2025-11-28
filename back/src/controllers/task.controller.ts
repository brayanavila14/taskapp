import { Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middleware/auth";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { title, description, date, completed } = req.body;

    const task = new Task({
      title,
      description,
      date,
      completed,
      user: userId,
    });
    await task.save();

    res.status(201).json({
      id: task._id,
      title: task.title,
      description: task.description,
      date: task.date,
      completed: task.completed,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Error creando tarea" });
  }
};

export const listTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.find({ user: req.userId });
    const taskId = task.map((t) => ({
      id: t._id,
      title: t.title,
      description: t.description,
      date: t.date,
      completed: t.completed,
    }));
    res.json(taskId);
  } catch (err: any) {
    res.status(500).json({ error: "Error listando tareas" });
  }
};

export const completedTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    if (task.user.toString() !== req.userId)
      return res.status(403).json({ error: "Acceso denegado" });

    if ("completed" in req.body && typeof req.body.completed === "boolean") {
      task.completed = req.body.completed;
    }

    await task.save();

    res.json({
      id: task._id,
      title: task.title,
      description: task.description,
      date: task.date,
      completed: task.completed,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Error actualizando tarea" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    if (task.user.toString() !== req.userId)
      return res.status(403).json({ error: "Acceso denegado" });

    await task.deleteOne();
    res.json({
      id: task._id,
      message: "Tarea eliminada",
    });
  } catch (err: any) {
    res.status(500).json({ error: "Error eliminando tarea" });
  }
};
