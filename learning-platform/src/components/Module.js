import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Test from './Test';

function Module({ moduleData, moduleIndex, onComplete, onReset }) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [showTest, setShowTest] = useState(false);
  
  const handleVideoEnd = () => {
    if (videoIndex < moduleData.videos.length - 1) {
      setVideoIndex(videoIndex + 1);
    } else {
      setShowTest(true);
    }
  };

  const handleTestComplete = (score) => {
    if (score >= 70) {
      alert("Parabéns! Você passou no módulo.");
      onComplete();
    } else {
      alert("Você não atingiu 70%. O módulo será reiniciado.");
      setVideoIndex(0);
      setShowTest(false);
      onReset();
    }
  };

  return (
    <div className="module">
      <h2>{moduleData.title}</h2>
      {!showTest ? (
        <VideoPlayer 
          videoId={moduleData.videos[videoIndex]} 
          onEnd={handleVideoEnd} 
          onInactivity={onReset}
        />
      ) : (
        <Test 
          questions={moduleData.testQuestions}
          onComplete={handleTestComplete}
          onInactivity={onReset}
        />
      )}
    </div>
  );
}

export default Module;
