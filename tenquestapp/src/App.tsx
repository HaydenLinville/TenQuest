import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import AllQuizzes from "./pages/AllQuizzes";
import Layout from "./components/Layout";

function App() {
  const editQuiz = {
    id: 0,
    title: "",
    category: 0,
    questions: Array.from({ length: 10 }, () => ({
      id: 0,
      text: "",
      answers: [{ answer: "" }, { answer: "" }, { answer: "" }, { answer: "" }],
      correctAnswerIndex: 0,
      hasBeenAsked: false,
    })),
  };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<AllQuizzes />} />

        <Route path="quizzes">
          <Route index element={<CreateQuiz editQuiz={editQuiz} />} />
          <Route path="edit/:postId" element={<EditQuizForm />} />
        </Route>

      </Route>
    </Routes>

    // <BrowserRouter>
    //   <nav className="p-4 bg-gray-100 flex gap-4">
    //     <Link to="/">
    //       <button>Home</button>
    //     </Link>
    //     <Link to="/customquiz">
    //       <button>Create A Quiz</button>
    //     </Link>
    //     <Link to="/allquizzes">
    //       <button>All Quizzes</button>
    //     </Link>
    //   </nav>

    //   <div className="p-4">
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route
    //         path="/customquiz"
    //         element={<CreateQuiz editQuiz={editQuiz} />}
    //       />
    //       <Route path="/allquizzes" element={<AllQuizzes />} />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
