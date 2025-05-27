const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const app = express();
const PORT = process.env.PORT || 3001;

// Almacenamiento en memoria para simular la base de datos
const db = {
  sessions: [],
  chats: [],
  messages: []
};

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3005'],
  credentials: true
}));
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'WhatsApp API está funcionando',
    info: 'Esta es una versión mínima para pruebas.' 
  });
});

// Ruta de estado de la API
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'active',
    timestamp: new Date().toISOString(),
    message: 'La API está lista para ser consumida por el frontend' 
  });
});

// RUTAS PARA SESIONES
// Obtener todas las sesiones
app.get('/api/sessions', (req, res) => {
  res.json(db.sessions);
});

// Crear una nueva sesión
app.post('/api/sessions', async (req, res) => {
  try {
    const id = uuidv4();
    
    // Generar QR simulado
    const qrData = `whatsapp-connect-${id}-${Date.now()}`;
    const qrCode = await QRCode.toDataURL(qrData);
    const qrBase64 = qrCode.split(',')[1];
    
    const newSession = {
      id,
      user_id: 'usuario-demo',
      status: 'connecting',
      qrCode: qrBase64,
      created_at: new Date().toISOString()
    };
    
    db.sessions.push(newSession);
    
    // Simular conexión después de 10 segundos
    setTimeout(() => {
      const sessionIndex = db.sessions.findIndex(s => s.id === id);
      if (sessionIndex !== -1) {
        db.sessions[sessionIndex].status = 'connected';
        db.sessions[sessionIndex].qrCode = null;
      }
    }, 10000);
    
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error al crear sesión:', error);
    res.status(500).json({ error: 'Error al crear sesión' });
  }
});

// Obtener una sesión específica
app.get('/api/sessions/:id', (req, res) => {
  const { id } = req.params;
  const session = db.sessions.find(s => s.id === id);
  
  if (!session) {
    return res.status(404).json({ error: 'Sesión no encontrada' });
  }
  
  res.json(session);
});

// Eliminar una sesión
app.delete('/api/sessions/:id', (req, res) => {
  const { id } = req.params;
  const sessionIndex = db.sessions.findIndex(s => s.id === id);
  
  if (sessionIndex === -1) {
    return res.status(404).json({ error: 'Sesión no encontrada' });
  }
  
  db.sessions.splice(sessionIndex, 1);
  res.status(200).json({ message: 'Sesión eliminada correctamente' });
});

// RUTAS PARA CHATS
// Obtener chats por sesión
app.get('/api/chats', (req, res) => {
  const { session } = req.query;
  
  if (!session) {
    return res.status(400).json({ error: 'Se requiere el ID de sesión' });
  }
  
  const chats = db.chats.filter(c => c.session_id === session);
  res.json(chats);
});

// Crear un nuevo chat
app.post('/api/chats', (req, res) => {
  const { session_id, contact_number, contact_name } = req.body;
  
  if (!session_id || !contact_number) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  
  const newChat = {
    id: uuidv4(),
    session_id,
    contact_number,
    contact_name: contact_name || contact_number,
    last_message: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  db.chats.push(newChat);
  res.status(201).json(newChat);
});

// RUTAS PARA MENSAJES
// Obtener mensajes de un chat
app.get('/api/messages', (req, res) => {
  const { chat_id } = req.query;
  
  if (!chat_id) {
    return res.status(400).json({ error: 'Se requiere el ID del chat' });
  }
  
  const messages = db.messages.filter(m => m.chat_id === chat_id);
  res.json(messages);
});

// Enviar un mensaje
app.post('/api/messages/send', (req, res) => {
  const { sessionId, to, text } = req.body;
  
  if (!sessionId || !to || !text) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  
  // Buscar la sesión
  const session = db.sessions.find(s => s.id === sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Sesión no encontrada' });
  }
  
  if (session.status !== 'connected') {
    return res.status(400).json({ error: 'La sesión no está conectada' });
  }
  
  // Buscar o crear chat
  let chat = db.chats.find(c => c.session_id === sessionId && c.contact_number === to);
  
  if (!chat) {
    chat = {
      id: uuidv4(),
      session_id: sessionId,
      contact_number: to,
      contact_name: to,
      last_message: text,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db.chats.push(chat);
  } else {
    // Actualizar último mensaje
    chat.last_message = text;
    chat.updated_at = new Date().toISOString();
  }
  
  // Crear el mensaje
  const message = {
    id: uuidv4(),
    chat_id: chat.id,
    content: text,
    is_from_me: true,
    created_at: new Date().toISOString()
  };
  
  db.messages.push(message);
  
  // Simular respuesta automática después de 2 segundos
  setTimeout(() => {
    const autoReply = {
      id: uuidv4(),
      chat_id: chat.id,
      content: `Respuesta automática a: "${text}"`,
      is_from_me: false,
      created_at: new Date().toISOString()
    };
    
    db.messages.push(autoReply);
    chat.last_message = autoReply.content;
    chat.updated_at = autoReply.created_at;
  }, 2000);
  
  res.status(200).json({ 
    success: true, 
    message: 'Mensaje enviado correctamente',
    messageId: message.id,
    timestamp: message.created_at
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor API ejecutándose en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api/`);
  
  // Crear una sesión de prueba al iniciar
  const testSessionId = uuidv4();
  db.sessions.push({
    id: testSessionId,
    user_id: 'usuario-demo',
    status: 'connected',
    created_at: new Date().toISOString()
  });
  
  // Crear un chat de prueba
  const testChatId = uuidv4();
  db.chats.push({
    id: testChatId,
    session_id: testSessionId,
    contact_number: '+1234567890',
    contact_name: 'Contacto de Prueba',
    last_message: '¡Hola! Este es un chat de prueba',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  
  // Añadir algunos mensajes de prueba
  db.messages.push({
    id: uuidv4(),
    chat_id: testChatId,
    content: '¡Hola! Este es un chat de prueba',
    is_from_me: false,
    created_at: new Date(Date.now() - 3600000).toISOString()
  });
  
  db.messages.push({
    id: uuidv4(),
    chat_id: testChatId,
    content: 'Puedes enviar mensajes y recibirás respuestas automáticas',
    is_from_me: false,
    created_at: new Date(Date.now() - 3500000).toISOString()
  });
  
  console.log('Datos de prueba creados para demostración');
});

module.exports = app;
