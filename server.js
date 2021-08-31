//server file
const express = require('express');
const fs = require('fs');
const db = require ('db/db.json')
const path = require('path');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'));

//Notes landing page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//get * returns index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


//api/notes GET should read the db.json file and return all saved notes
app.get('/api/notes', (req, res) =>
    fs.readFile(db, (err, data) => {
        if (err){
            console.error(err);
        }else {
            const parsedData = JSON.parse(data);
            return res.json(parsedData);
        }
    })
);


//api/notes POST should receive a new note to save on the request body AND add it to the db.json
app.post('/api/notes', (req, res) => 




);

//listening port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


