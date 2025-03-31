import React, { useState, useEffect } from 'react';
import finalExamQuestions from '../utils/testData';

function FinalExam({ onPass, onFail }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let correct = 0;
    finalExamQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) correct++;
    });
    const score = (correct / finalExamQuestions.length) * 100;
    setSubmitted(true);
    if (score >= 70) {
      alert('Parabéns! Você passou na prova final com ' + score + '%');
      onPass();
    } else {
      alert('Você não atingiu 70%. Sua nota foi ' + score + '%. Tente novamente.');
      onFail();
    }
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      alert('Você saiu da prova final! A prova será reiniciada.');
      onFail();
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="final-exam">
      <h3>Prova Final</h3>
      {finalExamQuestions.map((q, index) => (
        <div key={index} className="question">
          <p>{q.question}</p>
          {q.options.map((option, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={'final-question-' + index}
                value={option}
                onChange={() => handleOptionChange(index, option)}
                disabled={submitted}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      {!submitted && <button onClick={handleSubmit}>Enviar Respostas</button>}
    </div>
  );
}

export default FinalExam;
