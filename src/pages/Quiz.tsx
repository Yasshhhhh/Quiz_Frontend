import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Quiz: React.FC<{ topic?: string }> = () => {
  const location = useLocation();
  const [quizData, setQuizData] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  // Load quiz data on component mount
  useEffect(() => {
    if (location.state && location.state.mcq) {
      setQuizData(location.state.mcq);
    }
  }, [location.state]);
  
  console.log(quizData);
  const handleAnswerSelection = (questionIndex: number, selectedOptionIndex: number) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[questionIndex] = quizData[questionIndex].options[selectedOptionIndex];
    setUserAnswers(updatedUserAnswers);
  };

  const calculateScore = () => {
    let currentScore = 0;
    quizData.forEach((question: any, index: number) => {
      if (userAnswers[index] === question.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  return (
    <div>
      {quizData ? (
        <>
          {quizData.map((question: any, index: number) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h2>{question.question}</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {question.options.map((option: string, optionIndex: number) => (
                  <li key={optionIndex} style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name={`question${index}`}
                        value={option}
                        onChange={() => handleAnswerSelection(index, optionIndex)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>                                                                          
              {score !== null && (
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontWeight: 'bold' }}>Correct Answer: {question.answer}</p>
                  <p style={{ fontStyle: 'italic' }}>Explanation: {question.explanation}</p>
                </div>
              )}
            </div>
          ))}
          <button onClick={calculateScore} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit Answers</button>
          {score !== null && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Your score: {score}</p>}
        </>
      ) : (
        <p>Loading quiz data...</p>
      )}
    </div>
  );
};

export default Quiz;
