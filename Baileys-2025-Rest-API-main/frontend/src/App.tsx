import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface ApiStatus {
  status: string;
  timestamp: string;
  message: string;
}

const App: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiStatus>('http://localhost:3001/api/status');
        setApiStatus(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al conectar con la API:', err);
        setError('No se pudo conectar con la API de WhatsApp. Asegúrate de que el servidor esté en ejecución en el puerto 3001.');
      } finally {
        setLoading(false);
      }
    };

    checkApiStatus();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Frontend conectado a la API de WhatsApp</h1>
        <h2>¡Todo funcionando correctamente!</h2>
        
        <div className="status-container">
          {loading ? (
            <p>Verificando conexión con la API...</p>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="status-box">
              <h3>Estado de la API:</h3>
              <p><strong>Estado:</strong> {apiStatus?.status}</p>
              <p><strong>Mensaje:</strong> {apiStatus?.message}</p>
              <p><strong>Timestamp:</strong> {apiStatus?.timestamp}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default App;
