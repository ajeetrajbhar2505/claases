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
const modalId = "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";
const configuration = new Configuration({
  apiKey: modalId,
});
const openai = new OpenAIApi(configuration);

// Integrate Server
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

server.listen(3000, () => {
  console.log(`app listening on ${3000}`);
});

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
  console.log({ question: question });
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
    res.send({
      status: 200,
      data: "Chatbot is not available, Please contact to our developer Ajeet Rajbhar to fix them ",
    });
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

app.post("/quiz", async (req, res) => {
  // Set the number of questions to generate
  

  const topic = 'Generate a multiple choice question' + req.body.topic + 'with four options';
  const numQuestions = req.body.total_questions;

  // Generate questions and answers using OpenAI API
  await generateQuestions(numQuestions, topic)
    .then((result) => {
      // handle resolved Promise
      const questions = result
        .map((str) => {
          const match = str.match(/\n\n(.*\?)\n/g);
          if (match) {
            const question = match[0].trim();
            let options = str.split(question)[1].trim().split("\n");
            
            
            if(options.length == 1)
              {
                options[0] = options[0].split("  ")
                options = options[0][1].split("   ")
                console.log(options)
              }
            
             // Filter  of the option that contains the empty options
               options = options.filter(option => option.trim() !== "");
            
            // Find the index of the option that contains the answer
               const answerIndex = options.findIndex(option => option.startsWith("Answer"));
              if(answerIndex)
                {
                  options = options.slice(0, answerIndex);
                }
            return {
              question,
              options,
            };
          }
          return null;
        })
        .filter(Boolean);
      res.json({ questions });
    })
    .catch((error) => {
      // handle rejected Promise
      console.log(error);
    });

  // Send the generated quiz back to the client
});

// Generate questions and answers using OpenAI API
async function generateQuestions(numQuestions, topic) {
  const questions = [];

  for (let i = 0; i < numQuestions; i++) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: topic,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const question = response.data.choices[0].text;
    console.log({question:question});
    questions.push(question);
  }

  return questions;
}


app.post("/generateCorrectOption", async (req, res) => {
  // Set the number of questions to generate
  

  const question = req.body.question;
  console.log(question)

  // Generate questions and answers using OpenAI API
  await generateCorrectOption(question)
    .then((result) => {
   
      res.json({ result });
    })
    .catch((error) => {
      // handle rejected Promise
      console.log(error);
    });

  // Send the generated quiz back to the client
});


async function generateCorrectOption(question) {
   const topic = question;
      const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: '"'+ topic + '"',
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  
  return handleResponse(response,question)
  
}

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


function handleResponse(response, question) {
  var correctOption;
  if (!response || !response.data || !response.data.choices || response.data.choices.length < 1 || !response.data.choices[0].text) {
    console.log("Error: Invalid response object.");
    return generateCorrectOption(question);
  }
  correctOption = response.data.choices[0].text;
  console.log("The first choice is not empty: " + correctOption);
  return correctOption;
}







