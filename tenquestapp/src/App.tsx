import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import AllQuizzes from "./pages/AllQuizzes";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/customquiz">
          <button>Create A Quiz</button>
        </Link>
        <Link to="/allquizzes">
          <button>All Quizzes</button>
        </Link>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customquiz" element={<CreateQuiz />} />
          <Route path="/allquizzes" element={<AllQuizzes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
