import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

import { io } from 'socket.io-client';

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


    useEffect(() => {
        const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions } });
        setQuill(quillServer);
    }, []);

    useEffect(() => {
        const socketServer = io('http://localhost:8888');
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        }
    }, []);

    useEffect(() => {
        // quill.setQuill(socket);
    })

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
