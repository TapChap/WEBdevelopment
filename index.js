import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io'; 

const app = express();
const server = createServer(app);
const io = new Server(server);

var colors = ['red', 'blue', 'purple', 'orange', 'brown', 'magenta', 'black'];

const __dirname = dirname(fileURLToPath(import.meta.url));

var userCount = 1;

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log(`user ${userCount} connected`);

    socket.emit("newUser", {'id': userCount, 'color': popRandomColor()});
    io.emit("chat message", {'msg': `user ${userCount} connected`, 'color': 'green'});  
    let userID = userCount;

    userCount ++; // for next user

    socket.on('chat message', (msg)=> {
        console.log(`massage: "${msg.msg}" from user ${msg.id}`);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', ()=> {
      console.log(`user ${userID} disconnected`);
    })
  });  

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

function popRandomColor(){
  if (colors.length == 0) return 'black'; // display black if all colors are used

  let index = Math.floor(Math.random() * colors.length);
  let color = colors[index];
  colors = colors.filter(item => item !== color); // remove the chosen color from the array

  console.log(colors);
  return color;
}