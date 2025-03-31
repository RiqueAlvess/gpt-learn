import React, { useState, useEffect } from 'react';

function Test({ questions, onComplete, onInactivity }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) correct++;
    });
    const score = (correct / questions.length) * 100;
    setSubmitted(true);
    onComplete(score);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      alert("Você saiu da prova! O módulo será reiniciado.");
      onInactivity();
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="test">
      <h3>Prova</h3>
      {questions.map((q, index) => (
        <div key={index} className="question">
          <p>{q.question}</p>
          {q.options.map((option, idx) => (
            <label key={idx}>
              <input 
                type="radio" 
                name={\`question-\${index}\`} 
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

export default Test;
