import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Task from "./pages/Task";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Task />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
