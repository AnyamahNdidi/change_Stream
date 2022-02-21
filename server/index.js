const express = require("express")
const mongoose = require("mongoose")
const port = 2024
const app = express()
const http = require('http');
const server = http.createServer(app)
const cors = require("cors")
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket)=>{
  console.log("connection has been createw", socket.id)
})

const myRoute = require("./router")


//database string connector
// const url = "mongodb://localhost/checkDd"
const url2 = "mongodb+srv://admin:ilovemusic1234@cluster0.sawvg.mongodb.net/checkDb?retryWrites=true&w=majority"

//function that connect to our database
mongoose.connect(url2).then(()=>{
  console.log("database connect successfully")
}).catch((error)=>{
  console.log("something is wrong with this connectiion")
})

app.use(cors())
app.use(express.json())
app.use("/", require("./router"))

const db = mongoose.connection;

db.on("open", () => {
  const dbConnect = db.collection("users").watch();

  dbConnect.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const file = {
        _id: change.fullDocument._id,
        fullName: change.fullDocument.fullName,
        course: change.fullDocument.course
      };
      io.emit("observer", file);
    }else if(change.operationType === "delete"){
      io.emit("observerDelete", change);
    }
  });
});

server.listen(port, ()=>{
  console.log(`i'm runing on this port ${port}`)
})
