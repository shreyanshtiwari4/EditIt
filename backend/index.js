import { Server } from 'socket.io';
import Document from './models/documentModel';

const PORT = 8888;

const io = new Server(PORT, {
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
            socket.broadcast.to(documentId).emit('receive-changes', delta); //recieve-change event created which will recieve the changes i.e. delta that are made by user and use this event to reflect the changes on every other user's screen
        });
        socket.on('save-document', async data => {
            await Document.findByIdAndUpdate(documentId, { doc: data });
        })
    })
});