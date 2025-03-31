import React, { useState, useEffect } from 'react';
import Module from './components/Module';
import FinalExam from './components/FinalExam';
import Certificate from './components/Certificate';
import modulesData from './utils/modulesData';

function App() {
  const [currentModule, setCurrentModule] = useState(null);
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'module', 'finalExam', 'certificate'
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : { completedModules: [] };
  });

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const handleModuleComplete = (moduleIndex) => {
    if (!progress.completedModules.includes(moduleIndex)) {
      setProgress({ ...progress, completedModules: [...progress.completedModules, moduleIndex] });
    }
    if (progress.completedModules.length + 1 === modulesData.length) {
      setCurrentView('finalExam');
    } else {
      setCurrentView('menu');
    }
  };

  const resetModule = (moduleIndex) => {
    alert("Módulo reiniciado por inatividade ou saída da página.");
    setCurrentView('menu');
  };

  const handleFinalExamPass = () => {
    setCurrentView('certificate');
  };

  const renderView = () => {
    if (currentView === 'menu') {
      return (
        <div className="menu">
          <h1>Plataforma de Aprendizagem</h1>
          <h2>Módulos</h2>
          <ul>
            {modulesData.map((module, index) => (
              <li key={index}>
                <button onClick={() => { setCurrentModule(index); setCurrentView('module'); }}>
                  {module.title} {progress.completedModules.includes(index) && "(Completo)"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (currentView === 'module') {
      return (
        <Module 
          moduleData={modulesData[currentModule]} 
          moduleIndex={currentModule}
          onComplete={() => handleModuleComplete(currentModule)}
          onReset={() => resetModule(currentModule)}
        />
      );
    } else if (currentView === 'finalExam') {
      return (
        <FinalExam 
          onPass={handleFinalExamPass}
          onFail={() => setCurrentView('finalExam')}
        />
      );
    } else if (currentView === 'certificate') {
      return <Certificate />;
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

export default App;
