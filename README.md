<div align="center">

  <h1>🚀 Full Stack Task Manager</h1>
  
  <p>
    <strong>Una aplicación robusta de gestión de tareas con Autenticación Segura y Arquitectura Monorepo.</strong>
  </p>

  <p>
    <a href="https://taskapp-bray.vercel.app">
      <img src="https://img.shields.io/badge/Demo-Live-success?style=for-the-badge&logo=vercel" alt="Demo Live" />
    </a>
    <a href="#tech-stack">
      <img src="https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge" alt="Stack" />
    </a>
  </p>

  <p>
    Built with 🛡️ & ⚛️ by <a href="https://github.com/brayanavila14">BrayDev</a>
  </p>
</div>

---

## 🧐 Sobre el Proyecto

Este proyecto es una solución completa (Full Stack) para la gestión de productividad. No es solo una lista de tareas; es una implementación segura y escalable que demuestra el manejo de **Autenticación (JWT vía Cookies)**, protección de rutas y conexión eficiente entre cliente y servidor.

El repositorio sigue una arquitectura **Monorepo**, alojando tanto el servidor (API) como el cliente en una estructura unificada.

### ✨ Características Clave

- **🔐 Autenticación Robusta:** Registro e Inicio de sesión seguros usando `JWT` (HttpOnly Cookies) y encriptación con `bcryptjs`.
- **🛡️ Seguridad:** Implementación de `Helmet`, `Rate Limiting` y Sanitización de datos en el Backend.
- **⚡ CRUD Completo:** Crear, Leer, Actualizar y Eliminar tareas en tiempo real.
- **🎨 UI Responsiva:** Interfaz moderna y adaptable construida con React y Tailwind.

---

## 🛠️ Tech Stack

| Área         | Tecnologías                                                                                                                                                                                                                                                                                                                                   |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/-Vite-black?style=flat-square&logo=vite) ![Tailwind](https://img.shields.io/badge/-Tailwind-black?style=flat-square&logo=tailwind-css) ![Axios](https://img.shields.io/badge/-Axios-black?style=flat-square&logo=axios) |
| **Backend**  | ![Node](https://img.shields.io/badge/-Node.js-black?style=flat-square&logo=node.js) ![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express) ![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)                                                                    |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb) ![Mongoose](https://img.shields.io/badge/-Mongoose-black?style=flat-square&logo=mongoose)                                                                                                                                                              |
| **DevOps**   | ![Vercel](https://img.shields.io/badge/-Vercel-black?style=flat-square&logo=vercel) ![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)                                                                                                                                                                       |

---

## 📂 Estructura del Monorepo

El proyecto está dividido en dos directorios principales:

````text
/task-app-monorepo
│
├── 📁 backend/         # API Rest (Node/Express + TS)
│   ├── src/
│   ├── package.json
│   └── vercel.json     # Configuración de despliegue Serverless
│
├── 📁 frontend/        # Cliente (React + Vite)
│   ├── src/
│   ├── package.json
│   └── vercel.json     # Configuración de rewrites
│
└── README.md

# 🚀 Proyecto Fullstack (Backend + Frontend)

Este proyecto está compuesto por un **backend** y un **frontend**, pensados para ejecutarse de manera independiente pero conectados entre sí.

---

## 🚀 Instalación y Uso Local

Para correr este proyecto, necesitarás **dos terminales abiertas**:
- una para el Backend
- otra para el Frontend

---

## 1️⃣ Backend (Servidor)

Instala las dependencias:

```bash
cd backend
npm install
````

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
PORT=3000
MONGO_URI=tu_mongodb_atlas_uri
JWT_SECRET=tu_secreto_super_seguro
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Inicia el servidor:

```bash
npm run dev
```

---

## 2️⃣ Frontend (Cliente)

Instala las dependencias:

```bash
cd frontend
npm install
```

Crea un archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Inicia el cliente:

```bash
npm run dev
```

---

## ☁️ Despliegue

Este proyecto está configurado para desplegarse en **Vercel**:

1. **Backend:** Serverless Functions
2. **Frontend:** Static Site (React + Vite)
3. **Variables de entorno:** enlazan ambos servicios en producción

---

<div align="center">
  <sub>Desarrollado con TypeScript y buenas prácticas por <strong>BrayDev</strong>.</sub>
</div>
