import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import QuestionDisplay from './components/QuestionDisplay';
import FileUploader from './components/FileUploader';
import DifficultySelector from './components/DifficultySelector';
import NumberOfQuestionsInput from './components/NumberOfQuestionsInput';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    // Simulate file upload and question generation
    setLoading(true); // Show loading spinner

    setTimeout(() => {
      const mockQuestions = Array.from({ length: numberOfQuestions }, (_, i) => ({
        id: i + 1,
        text: `Sample question ${i + 1} - Difficulty: ${difficulty}`,
      }));

      setGeneratedQuestions(mockQuestions);
      navigate('/questions');
      setLoading(false); // Hide loading spinner
    }, 2000); // Simulated delay
  };

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <h1>Question Bank Generator</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex-container">
                <div className="flex-item">
                  <NumberOfQuestionsInput numberOfQuestions={numberOfQuestions} setNumberOfQuestions={setNumberOfQuestions} />
                </div>
                <div className="flex-item">
                  <div className="difficulty-container">
                    <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
                  </div>
                </div>
              </div>
              <div className="file-uploader">
                <FileUploader onFileUpload={handleFileUpload} />
              </div>
              {loading && <div>Loading...</div>} {/* Show loading text */}
            </>
          }
        />
        <Route path="/questions" element={<QuestionDisplay generatedQuestions={generatedQuestions} />} />
      </Routes>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;