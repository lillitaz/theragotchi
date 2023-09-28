import { getAllQuestions } from '../api/apiQuestions';
import QuestionsList from '../components/questionsList/QuestionsList';
import { useState, useEffect } from 'react';


export default function UserListPage() {
    const [questions, setQuestions] = useState([]);
    
  useEffect(() => {
    async function fetchData() {
        console.log("hy!")
      const response = await getAllQuestions();
      console.log(response);
      if (response.ok) {
        setQuestions(response.data);
      } else {
        console.error('Error fetching users:', response.status);
      }
    }
    fetchData();
  }, []);
   
  const updateQuestionsList = (updatedQuestions) => {
    setQuestions(updatedQuestions);
  };

  return (
    <main>
      <h1>Questions List:</h1>
      <QuestionsList questions={questions} updateQuestionsList={updateQuestionsList} />
    </main>
  );
}