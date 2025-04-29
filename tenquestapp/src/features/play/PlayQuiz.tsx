import { useGetQuizQuery } from "../api/quizSlice_Api"


export default function PlayQuiz(){
    var n = "";
    var {data} = useGetQuizQuery(n);
    
    return (
        
        <> </>

    )
}