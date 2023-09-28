import { useState } from 'react';
import PropTypes from 'prop-types';
import { addQuestion } from '../../api/apiQuestions'

function QuestionsForm() {
    const [formData, setFormData] = useState({
      description: "",
      categoryId: "",
    });
  
    const [message, setMessage] = useState("");
  
    const handleInputChange = (field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await addQuestion(formData);
      setMessage(response);     
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
        <div>
          <label>CategoryId:</label>
          <input
            type="text"
            value={formData.categoryId}
            onChange={(e) => handleInputChange('categoryId', e.target.value)}
          />
        </div>       
        {message && <div id="response-message">{message}</div>}
        <button type="submit">
          Add Question
        </button>
      </form>
    );
  }
  
  QuestionsForm.propTypes = {
    question: PropTypes.obj,
    onSubmit: PropTypes.func,
  };
  
  export default QuestionsForm;
  