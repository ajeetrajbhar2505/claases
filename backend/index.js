const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var http = require("http"),
  fs = require("fs"),
  util = require("util");
const cors = require("cors");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require('uuid');
dotenv.config();
app.use(cors());
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

server.listen(3000, () => {
  console.log(`app listening on ${3000}`);
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  let userInfo = [1, 22];


io.on('connection', (socket) => {
    const uuid = uuidv4();
  // Emit a message to the client
  socket.emit('message', 'Welcome to the chat! ');
  socket.emit('message', uuid);
  socket.on('message', (msg) => {
    console.log({userId : uuid,msg : msg});
    io.emit('message', {userId : uuid,msg : msg});
  });
});

let lecturesData = [];
app.get("/videos", (req, res) => {
  res.send(lecturesData);
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



app.post("/generate_quiz1", async (req, res) => {
    let question = 'Give 10 question on the topic of  ' + req.body.question + ' with 4 options and correct answer and send this data in array form for quiz';
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
      const quizArray = answer.replace(/question/g, 'question').replace(/options/g, 'options').replace(/answer/g, 'answer')
      console.log({quizArray :quizArray});
      res.send({ status: 200, data: quizArray });
    } catch (err) {
      console.log("error" + err);
    }
  });

var questions = [];
var questionsWithOptions = [];
var questionsWithAnswer = [];
var question_count = 0;
app.post("/generate_quiz2", async (req, res) => {
  let question = "Give a question on the topic of " + req.body.question;
  question_count = 10;
  let questions = [];

  try {
    questions = await getQuestions(question_count, question);
    questionsWithOptions = await getOptionQuestionwise(questions);
    questionsWithAnswer = await getQuestionwiseAnswer(questionsWithOptions);
    res.send({ status: 200, data: questionsWithOptions });
  } catch (err) {
    console.log("error" + err);
  }
});

async function getQuestions(temptquestion_count, question) {
  for (let i = 0; i < temptquestion_count; i++) {
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
    questions.push(answer);
  }
  questions = questions.filter(
    (object, index) => questions.indexOf(object) == index
  );
  return questions;
}

async function getOptionQuestionwise(questions) {
  let temptquestions = [];
  for (let i = 0; i < questions.length; i++) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        questions[i] +
        " Can you generate strict only 4  options for this question",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    let answer = response.data.choices[0].text;
    const options = answer
      .split("\n")
      .slice(2)
      .map((option) => option.slice(3));
    let object = { question: questions[i], options: options.filter(Boolean) };
    temptquestions.push(object);
  }
  return temptquestions;
}

async function getQuestionwiseAnswer(questions) {
  let temptquestions = [];
  for (let i = 0; i < questions.length; i++) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: questions[i] + "",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    let answer = response.data.choices[0].text;
    //   const options = answer
    //     .split("\n")
    //     .slice(2)
    //     .map((option) => option.slice(3));
    //   let object = { question: questions[i], options: options.filter(Boolean) };
    //   temptquestions.push(object);
  }
  return temptquestions;
}



app.post('/questionResponse',async (req,res)=>{
    let question = req.body.question
    var question_count = 10
    console.log(question);
    try{
        const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  
   let answer = response.data.choices[0].text
   res.send({status : 200 , data : answer})    
  }
    
    catch{
      console.log('error')
    }
    
  })




  
const cron = require('node-cron');


// create a Date object for the desired date and time
const date = new Date('2023-03-19T19:30:46.310Z');

date.setHours(1);
date.setMinutes(14)
// extract the year, month, day, hour, and minute values from the Date object
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
;


// create the cron schedule value using the extracted values
const cronSchedule = `${minute} ${hour} ${day} ${month} *`;


// schedule the cron job using the cron schedule value
cron.schedule(cronSchedule, () => {
    console.log('Cron job running');
  });