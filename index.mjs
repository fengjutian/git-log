// #!/usr/bin/env zx

// let branch = await $`git log`
// console.log('branch', branch)
// echo`Current branch is ${branch}.`

import express from 'express';
import { createServer } from 'http';
import path from 'path'
import { Server } from "socket.io";
import { gitLog, gitLogCommitDetail } from './shellExec.mjs';

const __dirname = path.resolve();
const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    gitLog((msg) => {
        io.emit('chatMessage', msg);
    })

    socket.on('showCommitDetail', (data) => {
      console.log('server showCommitDetail', data)
      gitLogCommitDetail(data, (msg) => {
        io.emit('toShowCommitDetail', msg);
      })
    })
});



app.get('/', (req, res) => {
    console.log(2)
    res.sendFile(__dirname + '/index.html');
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});




