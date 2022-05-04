const path = require("path")
const express = require('express')
const http= require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use(express.static(path.join(__dirname, "../docs")))

io.on('connection', socket =>{
    console.log("New websocket connection", socket.id);

    socket.emit('message', 'welcome to scribbling')

    // passing message to al user accept who has transmitted

    socket.broadcast.emit('message', 'someone else join zoom chat')

    socket.on('disconnect', () =>{
        io.emit('message', 'A User has closed the chat')
    })

    //Listen for DOM element changes

    socket.on('updated_dom_elements', (updated_dom_elements) => {
        console.log(updated_dom_elements);
        io.emit('updated_dom_elements', updated_dom_elements)

    })

    socket.on('edit_overlay', (target) => {
        console.log(target);
        io.emit('edit_overlay', target)

    })

    socket.on('open_comment', (e) => {
        io.emit('open_comment', e)

    })

    socket.on('over_lay', (e) => {
        io.emit('over_lay', e)

    })

    socket.on('annotation_text', (e) => {
        io.emit('annotation_text', e)

    })

    socket.on('create_page', (page_number) => {
        io.emit('create_page', page_number)
    })

    socket.on('insert_comment',( comment) => {
        io.emit('insert_comment',comment)
    })

    socket.on('read_only_content',( content, annotationId) => {
        io.emit('insert_comment',content, annotationId)
    })

    socket.on('renderScreenReaderComments',( documentId, annotationId, comments) => {
        io.emit('renderScreenReaderComments',documentId, annotationId, comments)
    })

    socket.on('openPicker',value => {
        io.emit('openPicker',value)
    })

    

    

    

})

const PORT  = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`server running on port ${PORT}`))
// const io = require('socket.io')(3000, {
//     cors:{
//         origin:["http://http://127.0.0.1:5500"]
//     }
// })

// io.on('connection', socket =>{
//     console.log(socket.id);
// })