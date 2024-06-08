require('dotenv').config({ path: './config/config.env' });

const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
const Document = require('./models/documentModel');
const connectDatabase = require("./dbConnect/dbConnect.js");

// Import route modules
const documentRoute = require('./routes/documentRoutes');
const authRoute = require('./routes/authRoutes');
const collaborationRoute = require('./routes/collaborationRoutes');

const PORT = 8888;
const app = express();

app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/document', documentRoute);
app.use('/api/auth', authRoute);
app.use('/api/collaboration', collaborationRoute);

// Database connection
connectDatabase();

// Set up Socket.io server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('connected', documentId => {
        const data = "";
        socket.join(documentId);
        socket.emit('load-document', data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta); // receive-change event created which will receive the changes i.e. delta that are made by user and use this event to reflect the changes on every other user's screen
        });

        socket.on('save-document', async data => {
            await Document.findByIdAndUpdate(documentId, { doc: data });
        });
    });
});

// https://localhost:8888/api/document/create
// mongodb+srv://shreyansharipur:12345@cluster0.8ds2hha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/EditIt