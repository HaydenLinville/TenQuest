import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
//import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import AllQuizzes from "./pages/AllQuizzes";
import Layout from "./components/Layout";
import AddQuizForm from "./features/quizzes/AddQuizForm";
import EditQuizForm from "./features/quizzes/EditQuizForm";
import PlayQuiz from "./features/play/PlayQuiz";
import { ReactNode, useState } from "react";
import { Quiz } from "./features/api/quizSlice_Api";

function App() {
  const [quiz, setQuiz] = useState<Quiz>()
  
  function handleSetQuiz(hSQuiz: Quiz){
    setQuiz(hSQuiz);
  }
  let playQuiz: ReactNode;
  if(quiz != undefined)
  {
    playQuiz = <PlayQuiz quiz={quiz} />
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<AllQuizzes />} />

        <Route path="quizzes">
          <Route index element={<AddQuizForm  />} />
          <Route path="edit/:quizId" element={<EditQuizForm />} />
          <Route path="play/:quizId" element={playQuiz} />
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