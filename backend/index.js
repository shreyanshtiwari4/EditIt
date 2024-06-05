import { Server } from 'socket.io';


const PORT = 8888;

const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    console.log('connected');
});