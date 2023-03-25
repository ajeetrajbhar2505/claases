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
  




var LecturesWiseContents = [
  {
    lec_id: 1,
    contents: [
      {
        contentId: "1",
        content: "video",
        content_icon: "assets/english.webp",
        content_link: "A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "2",
        content: "video",
        content_icon: "assets/maths.webp",
        content_link: "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
        content_title: "Tables1 to 10 || English Table of One to Ten Tables Song ",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "3",
        content: "video",
        content_icon: "assets/marathi.webp",
        content_link: "येरे-येरे-पावसा-म_.mp4",
        content_title: "येरे येरे पावसा | मजेदार मराठी बालगीत | Marathi Rhymes | Marathi Balgeet | Jingle Toons",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "4",
        content: "video",
        content_icon: "assets/hindi.webp",
        content_link: "क-से-कमल-ka-se-kamal-hindi.mp4",
        content_title: "क से कमल Ka Se Kamal - Hindi Varnamala Geet 2 - Hindi Phonics Song - Hindi Alphabet Song",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "5",
        content: "video",
        content_icon: "assets/gk.webp",
        content_link: "surprise-eggs-toys-learn-fruits-vegetables-for.mp4",
        content_title: "Surprise Eggs Toys Learn Fruits & Vegetables for Kids",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "6",
        content: "video",
        content_icon: "assets/computer-science.webp",
        content_link: "computer-parts-more-computer-parts-name-crea.mp4",
        content_title: "Computer Parts & more | Computer Parts name Creative Learning for Kids Children Early Learning",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "7",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "8",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "9",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "abcd.mp3",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "10",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "EnglishRhymes.mp3",
        content_title: "Rain, Rain, Go Away Nursery Rhyme With Lyrics - Cartoon Animation Rhymes & Songs for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "11",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Tot_Time_Notebook_ABC.pdf",
        content_title: "ABC SONG (THE ALPHABET SONG) PRINTABLE LYRICS – PDF",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "12",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Fingerplays.pdf",
        content_title: "Nursery Rhymes, Fingerplays and Songs for Circle Time",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      }
    ]
  },
  {
    lec_id: 2,
    contents: [
      {
        contentId: "1",
        content: "video",
        content_icon: "assets/english.webp",
        content_link: "A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "2",
        content: "video",
        content_icon: "assets/maths.webp",
        content_link: "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
        content_title: "Tables1 to 10 || English Table of One to Ten Tables Song ",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "3",
        content: "video",
        content_icon: "assets/marathi.webp",
        content_link: "येरे-येरे-पावसा-म_.mp4",
        content_title: "येरे येरे पावसा | मजेदार मराठी बालगीत | Marathi Rhymes | Marathi Balgeet | Jingle Toons",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "4",
        content: "video",
        content_icon: "assets/hindi.webp",
        content_link: "क-से-कमल-ka-se-kamal-hindi.mp4",
        content_title: "क से कमल Ka Se Kamal - Hindi Varnamala Geet 2 - Hindi Phonics Song - Hindi Alphabet Song",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "5",
        content: "video",
        content_icon: "assets/gk.webp",
        content_link: "surprise-eggs-toys-learn-fruits-vegetables-for.mp4",
        content_title: "Surprise Eggs Toys Learn Fruits & Vegetables for Kids",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "6",
        content: "video",
        content_icon: "assets/computer-science.webp",
        content_link: "computer-parts-more-computer-parts-name-crea.mp4",
        content_title: "Computer Parts & more | Computer Parts name Creative Learning for Kids Children Early Learning",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "7",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "8",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "9",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "abcd.mp3",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "10",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "EnglishRhymes.mp3",
        content_title: "Rain, Rain, Go Away Nursery Rhyme With Lyrics - Cartoon Animation Rhymes & Songs for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "11",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Tot_Time_Notebook_ABC.pdf",
        content_title: "ABC SONG (THE ALPHABET SONG) PRINTABLE LYRICS – PDF",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "12",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Fingerplays.pdf",
        content_title: "Nursery Rhymes, Fingerplays and Songs for Circle Time",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      }
    ]
  },
  {
    lec_id: 3,
    contents: [
      {
        contentId: "1",
        content: "video",
        content_icon: "assets/english.webp",
        content_link: "A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "2",
        content: "video",
        content_icon: "assets/maths.webp",
        content_link: "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
        content_title: "Tables1 to 10 || English Table of One to Ten Tables Song ",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "3",
        content: "video",
        content_icon: "assets/marathi.webp",
        content_link: "येरे-येरे-पावसा-म_.mp4",
        content_title: "येरे येरे पावसा | मजेदार मराठी बालगीत | Marathi Rhymes | Marathi Balgeet | Jingle Toons",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "4",
        content: "video",
        content_icon: "assets/hindi.webp",
        content_link: "क-से-कमल-ka-se-kamal-hindi.mp4",
        content_title: "क से कमल Ka Se Kamal - Hindi Varnamala Geet 2 - Hindi Phonics Song - Hindi Alphabet Song",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "5",
        content: "video",
        content_icon: "assets/gk.webp",
        content_link: "surprise-eggs-toys-learn-fruits-vegetables-for.mp4",
        content_title: "Surprise Eggs Toys Learn Fruits & Vegetables for Kids",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "6",
        content: "video",
        content_icon: "assets/computer-science.webp",
        content_link: "computer-parts-more-computer-parts-name-crea.mp4",
        content_title: "Computer Parts & more | Computer Parts name Creative Learning for Kids Children Early Learning",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "7",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "8",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "9",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "abcd.mp3",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "10",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "EnglishRhymes.mp3",
        content_title: "Rain, Rain, Go Away Nursery Rhyme With Lyrics - Cartoon Animation Rhymes & Songs for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "11",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Tot_Time_Notebook_ABC.pdf",
        content_title: "ABC SONG (THE ALPHABET SONG) PRINTABLE LYRICS – PDF",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "12",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Fingerplays.pdf",
        content_title: "Nursery Rhymes, Fingerplays and Songs for Circle Time",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      }
    ]
  },
  {
    lec_id: 4,
    contents: [
      {
        contentId: "1",
        content: "video",
        content_icon: "assets/english.webp",
        content_link: "A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "2",
        content: "video",
        content_icon: "assets/maths.webp",
        content_link: "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
        content_title: "Tables1 to 10 || English Table of One to Ten Tables Song ",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "3",
        content: "video",
        content_icon: "assets/marathi.webp",
        content_link: "येरे-येरे-पावसा-म_.mp4",
        content_title: "येरे येरे पावसा | मजेदार मराठी बालगीत | Marathi Rhymes | Marathi Balgeet | Jingle Toons",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "4",
        content: "video",
        content_icon: "assets/hindi.webp",
        content_link: "क-से-कमल-ka-se-kamal-hindi.mp4",
        content_title: "क से कमल Ka Se Kamal - Hindi Varnamala Geet 2 - Hindi Phonics Song - Hindi Alphabet Song",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "5",
        content: "video",
        content_icon: "assets/gk.webp",
        content_link: "surprise-eggs-toys-learn-fruits-vegetables-for.mp4",
        content_title: "Surprise Eggs Toys Learn Fruits & Vegetables for Kids",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "6",
        content: "video",
        content_icon: "assets/computer-science.webp",
        content_link: "computer-parts-more-computer-parts-name-crea.mp4",
        content_title: "Computer Parts & more | Computer Parts name Creative Learning for Kids Children Early Learning",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "7",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "8",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "9",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "abcd.mp3",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "10",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "EnglishRhymes.mp3",
        content_title: "Rain, Rain, Go Away Nursery Rhyme With Lyrics - Cartoon Animation Rhymes & Songs for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "11",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Tot_Time_Notebook_ABC.pdf",
        content_title: "ABC SONG (THE ALPHABET SONG) PRINTABLE LYRICS – PDF",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "12",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Fingerplays.pdf",
        content_title: "Nursery Rhymes, Fingerplays and Songs for Circle Time",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      }
    ]
  },
  {
    lec_id: 5,
    contents: [
      {
        contentId: "1",
        content: "video",
        content_icon: "assets/english.webp",
        content_link: "A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "2",
        content: "video",
        content_icon: "assets/maths.webp",
        content_link: "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
        content_title: "Tables1 to 10 || English Table of One to Ten Tables Song ",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "3",
        content: "video",
        content_icon: "assets/marathi.webp",
        content_link: "येरे-येरे-पावसा-म_.mp4",
        content_title: "येरे येरे पावसा | मजेदार मराठी बालगीत | Marathi Rhymes | Marathi Balgeet | Jingle Toons",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "4",
        content: "video",
        content_icon: "assets/hindi.webp",
        content_link: "क-से-कमल-ka-se-kamal-hindi.mp4",
        content_title: "क से कमल Ka Se Kamal - Hindi Varnamala Geet 2 - Hindi Phonics Song - Hindi Alphabet Song",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "5",
        content: "video",
        content_icon: "assets/gk.webp",
        content_link: "surprise-eggs-toys-learn-fruits-vegetables-for.mp4",
        content_title: "Surprise Eggs Toys Learn Fruits & Vegetables for Kids",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "6",
        content: "video",
        content_icon: "assets/computer-science.webp",
        content_link: "computer-parts-more-computer-parts-name-crea.mp4",
        content_title: "Computer Parts & more | Computer Parts name Creative Learning for Kids Children Early Learning",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "7",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "8",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "9",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "abcd.mp3",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "10",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "EnglishRhymes.mp3",
        content_title: "Rain, Rain, Go Away Nursery Rhyme With Lyrics - Cartoon Animation Rhymes & Songs for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "11",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Tot_Time_Notebook_ABC.pdf",
        content_title: "ABC SONG (THE ALPHABET SONG) PRINTABLE LYRICS – PDF",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "12",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Fingerplays.pdf",
        content_title: "Nursery Rhymes, Fingerplays and Songs for Circle Time",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      }
    ]
  },
  {
    lec_id: 6,
    contents: [
      {
        contentId: "1",
        content: "video",
        content_icon: "assets/english.webp",
        content_link: "A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "2",
        content: "video",
        content_icon: "assets/maths.webp",
        content_link: "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
        content_title: "Tables1 to 10 || English Table of One to Ten Tables Song ",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "3",
        content: "video",
        content_icon: "assets/marathi.webp",
        content_link: "येरे-येरे-पावसा-म_.mp4",
        content_title: "येरे येरे पावसा | मजेदार मराठी बालगीत | Marathi Rhymes | Marathi Balgeet | Jingle Toons",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "4",
        content: "video",
        content_icon: "assets/hindi.webp",
        content_link: "क-से-कमल-ka-se-kamal-hindi.mp4",
        content_title: "क से कमल Ka Se Kamal - Hindi Varnamala Geet 2 - Hindi Phonics Song - Hindi Alphabet Song",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "5",
        content: "video",
        content_icon: "assets/gk.webp",
        content_link: "surprise-eggs-toys-learn-fruits-vegetables-for.mp4",
        content_title: "Surprise Eggs Toys Learn Fruits & Vegetables for Kids",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "6",
        content: "video",
        content_icon: "assets/computer-science.webp",
        content_link: "computer-parts-more-computer-parts-name-crea.mp4",
        content_title: "Computer Parts & more | Computer Parts name Creative Learning for Kids Children Early Learning",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "7",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "8",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "9",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "abcd.mp3",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "10",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "EnglishRhymes.mp3",
        content_title: "Rain, Rain, Go Away Nursery Rhyme With Lyrics - Cartoon Animation Rhymes & Songs for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "11",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Tot_Time_Notebook_ABC.pdf",
        content_title: "ABC SONG (THE ALPHABET SONG) PRINTABLE LYRICS – PDF",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "12",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Fingerplays.pdf",
        content_title: "Nursery Rhymes, Fingerplays and Songs for Circle Time",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      }
    ]
  },
  {
    lec_id: 7,
    contents: [
      {
        contentId: "1",
        content: "video",
        content_icon: "assets/english.webp",
        content_link: "A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "2",
        content: "video",
        content_icon: "assets/maths.webp",
        content_link: "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
        content_title: "Tables1 to 10 || English Table of One to Ten Tables Song ",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "3",
        content: "video",
        content_icon: "assets/marathi.webp",
        content_link: "येरे-येरे-पावसा-म_.mp4",
        content_title: "येरे येरे पावसा | मजेदार मराठी बालगीत | Marathi Rhymes | Marathi Balgeet | Jingle Toons",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "4",
        content: "video",
        content_icon: "assets/hindi.webp",
        content_link: "क-से-कमल-ka-se-kamal-hindi.mp4",
        content_title: "क से कमल Ka Se Kamal - Hindi Varnamala Geet 2 - Hindi Phonics Song - Hindi Alphabet Song",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "5",
        content: "video",
        content_icon: "assets/gk.webp",
        content_link: "surprise-eggs-toys-learn-fruits-vegetables-for.mp4",
        content_title: "Surprise Eggs Toys Learn Fruits & Vegetables for Kids",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "6",
        content: "video",
        content_icon: "assets/computer-science.webp",
        content_link: "computer-parts-more-computer-parts-name-crea.mp4",
        content_title: "Computer Parts & more | Computer Parts name Creative Learning for Kids Children Early Learning",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "7",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "8",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "9",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "abcd.mp3",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "10",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "EnglishRhymes.mp3",
        content_title: "Rain, Rain, Go Away Nursery Rhyme With Lyrics - Cartoon Animation Rhymes & Songs for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "11",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Tot_Time_Notebook_ABC.pdf",
        content_title: "ABC SONG (THE ALPHABET SONG) PRINTABLE LYRICS – PDF",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "12",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Fingerplays.pdf",
        content_title: "Nursery Rhymes, Fingerplays and Songs for Circle Time",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      }
    ]
  },
  {
    lec_id: 8,
    contents: [
      {
        contentId: "1",
        content: "video",
        content_icon: "assets/english.webp",
        content_link: "A_For_Apple_ABC_Alphabet_Songs_with_Sounds_for_Children.mp4",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "2",
        content: "video",
        content_icon: "assets/maths.webp",
        content_link: "Tables1_to_10 __ English_Table_of One_to_Ten_Tables_Song_Maths.mp4",
        content_title: "Tables1 to 10 || English Table of One to Ten Tables Song ",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "3",
        content: "video",
        content_icon: "assets/marathi.webp",
        content_link: "येरे-येरे-पावसा-म_.mp4",
        content_title: "येरे येरे पावसा | मजेदार मराठी बालगीत | Marathi Rhymes | Marathi Balgeet | Jingle Toons",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "4",
        content: "video",
        content_icon: "assets/hindi.webp",
        content_link: "क-से-कमल-ka-se-kamal-hindi.mp4",
        content_title: "क से कमल Ka Se Kamal - Hindi Varnamala Geet 2 - Hindi Phonics Song - Hindi Alphabet Song",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "5",
        content: "video",
        content_icon: "assets/gk.webp",
        content_link: "surprise-eggs-toys-learn-fruits-vegetables-for.mp4",
        content_title: "Surprise Eggs Toys Learn Fruits & Vegetables for Kids",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "6",
        content: "video",
        content_icon: "assets/computer-science.webp",
        content_link: "computer-parts-more-computer-parts-name-crea.mp4",
        content_title: "Computer Parts & more | Computer Parts name Creative Learning for Kids Children Early Learning",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "7",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "8",
        content: "video",
        content_icon: "assets/evs.webp",
        content_link: "evs-for-class-3-learn-science-for-kids-envir.mp4",
        content_title: "Learn Science For Kids | Environmental Science",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "9",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "abcd.mp3",
        content_title: "A For Apple - ABC Alphabet Songs with Sounds for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "10",
        content: "audio",
        content_icon: "assets/english.webp",
        content_link: "EnglishRhymes.mp3",
        content_title: "Rain, Rain, Go Away Nursery Rhyme With Lyrics - Cartoon Animation Rhymes & Songs for Children",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "11",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Tot_Time_Notebook_ABC.pdf",
        content_title: "ABC SONG (THE ALPHABET SONG) PRINTABLE LYRICS – PDF",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      },
      {
        contentId: "12",
        content: "document",
        content_icon: "assets/english.webp",
        content_link: "Fingerplays.pdf",
        content_title: "Nursery Rhymes, Fingerplays and Songs for Circle Time",
        teacher : "ajeet rajbhar",
        time : "",
        published_at: "18/02/2023"
      }
    ]
  }
]



app.get('/loadVideo/:lec_id/:contentId',async (req,res)=>{
  try{
    var contentToWatch;
    LecturesWiseContents.filter(async (Object)=>{
      if (Object.lec_id == req.params.lec_id) {
        let response =  Object['contents'].filter((data)=> data.contentId == req.params.contentId )
        contentToWatch = response[0]
      }
    })
    console.log(contentToWatch)
    res.send(contentToWatch)
  }
  catch (err)
  {
    console.log(err)
  }
  

})



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
