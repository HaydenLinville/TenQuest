
import { ReactNode, useEffect, useState } from 'react'
import  Quizzes, { Quiz} from './components/Quiz';
import './App.css'
import { get } from './util/http';
import { Questions } from './components/Questions';
import Form from './components/Form';

type RawQuizData = {
  id: number;
  catagory: number;
  title: string;
  questions?: Questions[];
}

function App() {
  const [fetchedQuizzes, setFetchedQuizzes] = useState<Quiz[]>();
  
  
  useEffect(() => {
    async function fetchQuizzes() {
     const data = await get('http://localhost:5114/Quiz/GetQuizzes') as RawQuizData[];

     const quizzes: Quiz[] = data.map(rawData =>{
      return {
        id: rawData.id,
        catagory: rawData.catagory,
        title: rawData.title,
        questions: rawData.questions

      }
     });

     setFetchedQuizzes(quizzes);
    }

    fetchQuizzes();
  }, []);

  let content: ReactNode;
  if(fetchedQuizzes){
    content = <Quizzes quizzes={fetchedQuizzes}></Quizzes>
  }

  return (
   <div>
    {content}
    <Form></Form>
   </div>
  )
}

export default App
