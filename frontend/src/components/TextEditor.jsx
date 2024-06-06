import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';


const Component = styled.div`
    background: #F5F5F5;
`

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
];

const TextEditor = () => {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const { id } = useParams();


    useEffect(() => {

        // Instantiating the quill server 
        const quillServer = new Quill('#container', { theme: 'snow' ,modules: { toolbar: toolbarOptions } } );
        setQuill(quillServer);

        // Disabling any typing untill the document ( which is previously saved ) is loaded
        quillServer.disable();
        quillServer.setText('Loading...');

    }, []);

    useEffect(() => {
        const socketServer = io('http://localhost:8888');
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        }
    }, []);

    useEffect(() => {
        if(quill && socket){
            socket.once('load-document', document => {
                quill.setContents(document);
                quill.enable();
            })
            socket.emit('connected', id);
        }
    }, [quill, socket, id]);



    useEffect(() => {//sending changes to server from quill by user
        if(quill && socket){
            const handleChange = (delta, oldData, source) => {
                if(source !== 'user') return;
    
                socket.emit('send-changes',delta);
            }

    
            quill.on('text-change', handleChange);
    
            return () => {
                quill.off('text-change', handleChange);
            }
        }
    }, [quill, socket]);

    useEffect(() => {//recieving changes from server to quill
        if(quill && socket){
            const handleChange = (delta) => {
                quill.updateContents(delta);
            }
    
            socket.on('receive-changes', handleChange);
    
            return () => {
                socket.off('receive-changes', handleChange);
            }
        }
    }, [quill, socket]);


    return (
        <Component>
            <Box 
            id="container" 
            className=" container ">
            </Box>
        </Component>
    );
}

export default TextEditor;
