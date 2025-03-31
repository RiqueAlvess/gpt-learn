import React from 'react';

function Certificate() {
  const today = new Date().toLocaleDateString();
  return (
    <div className="certificate">
      <h1>Certificado de Aptidão</h1>
      <p>Certificamos que [Nome do Aluno] concluiu com sucesso a Plataforma de Aprendizagem para iniciar seu trabalho na empresa 3s dev.</p>
      <p>Data: {today}</p>
    </div>
  );
}

export default Certificate;
