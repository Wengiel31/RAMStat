const express = require("express");
const socket = require("socket.io");
const os = require("os");
const app = express();
const port = 81;
const server = app.listen(port, () => {
    console.log(`The server has started listening on port: ${port}`);
});
app.use(express.static("public_html"));
const io = socket(server);
setInterval(() => {
    let usedmem = parseInt(((os.totalmem() - os.freemem()) / 1000000).toFixed(0));
    io.sockets.emit("ram", usedmem);
    console.log(usedmem);
}, 1000);