import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import TodoPage from "./Components/TodoPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center">Todo Application</h1>
        
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<TodoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
