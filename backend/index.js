const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var http = require("http"),
  fs = require("fs"),
  util = require("util");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const { v4: uuidv4 } = require("uuid");
dotenv.config();
app.use(cors());
const multer = require('multer');


// ChatGpt Integration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Integrate Server
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId

let url = "mongodb+srv://ajeet:ajeet@cluster0.e5pj6.mongodb.net/test"

var database;
server.listen(3000, MongoClient.connect(url, {useNewUrlParser : true},(err, db)=>{
  if (err) throw err;
  console.log('Database connection successful!');
  // Use the db object to perform database operations
}));

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});



io.on("connection", (socket) => {
  // Emit a message to the client
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("notification", (msg) => {
    io.emit("notification", msg);
  });
});

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('video'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });

});




app.get("/video/:name", (req, res) => {
  let path = "video/" + req.params.name;
  var stat = fs.statSync(path);
  var total = stat.size;
  if (req.headers.range) {
    // meaning client (browser) has moved the forward/back slider
    // which has sent this request back to this server logic ... cool
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total - 1;
    var chunksize = end - start + 1;
    console.log("RANGE: " + start + " - " + end + " = " + chunksize);

    var file = fs.createReadStream(path, { start: start, end: end });
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });
    file.pipe(res);
  } else {
    console.log("ALL: " + total);
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(path).pipe(res);
  }
});



app.post("/questionResponse", async (req, res) => {
  let question = req.body.question;
  var question_count = 10;
  console.log(question);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    let answer = response.data.choices[0].text;
    res.send({ status: 200, data: answer });
  } catch {
    console.log("error");
  }
});






// create a Date object for the desired date and time
const date = new Date("2023-03-19T19:30:46.310Z");
date.setHours(1);
date.setMinutes(14);
// extract the year, month, day, hour, and minute values from the Date object
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
// create the cron schedule value using the extracted values
const cronSchedule = `${minute} ${hour} ${day} ${month} *`;

// schedule the cron job using the cron schedule value
cron.schedule(cronSchedule, () => {
  console.log("Cron job running");
});
