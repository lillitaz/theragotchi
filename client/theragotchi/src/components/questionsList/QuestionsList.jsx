import { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteQuestion } from '../../api/apiQuestions';
import { Link } from 'react-router-dom';

const QuestionsList = ({ questions, updateQuestionsList }) => {
  const [messages, setMessages] = useState({});

  const handleDelete = async (questionId) => {
    try {
        const success = await deleteQuestion(questionId);
        if (success) {
          setMessages(prevMessages => ({
            ...prevMessages,
            [questionId]: 'Question deleted successfully'
          }));
          setTimeout(() => {
            setMessages(prevMessages => ({
              ...prevMessages,
              [questionId]: ''
            }));
            updateQuestionsList(questions.filter(question => question.questionId !== questionId));
          }, 2000);
        } else {
          setMessages(prevMessages => ({
            ...prevMessages,
            [questionId]: 'Question deletion failed'
          }));
        }
    } catch (error) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [questionId]: 'An error occurred: ' + error
      }));
    }
  };

  return (
    <div>
        <button>
            <Link to={{ pathname: "/addQuestion" }}> 
            Add Question</Link>
        </button>
      <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.questionId}>
              <td>{question.questionId}</td>
              <td>{question.description}</td>
              <td>{question.categoryId}</td>
              <td>
                  <button onClick={() => handleDelete(question.questionId)}>Delete</button>
              </td>
              <td>
                {messages[question.questionId] && (
                  <span>{messages[question.questionId]}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

QuestionsList.propTypes = {
    questions: PropTypes.array,
    updateQuestionsList: PropTypes.func
};

export default QuestionsList;
