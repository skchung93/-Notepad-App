//server file
const express = require('express');
const fs = require('fs');
const db = require('./db/db.json')
const path = require('path');
const { v4: uuid } = require('uuid');
const DB_PATH = path.join(__dirname, '/db/db.json')

const PORT = process.env.port;
const app = express();

app.use(express.json());
app.use(express.static('public'));

//get / returns index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});


//Notes landing page
app.get('/notes', (req, res) => {
  console.log('anything');
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});


//api/notes GET should read the db.json file and return all saved notes
app.get('/api/notes', (req, res) =>
  fs.readFile(DB_PATH, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      return res.json(parsedData);
    }
  })
);


//api/notes POST should receive a new note to save on the request body AND add it to the db.json
app.post('/api/notes', (req, res) => {
  console.log(req);
  console.log(uuid);
  let newNotes = req.body;
  newNotes.id = uuid();
  // db.push(newNotes);

  fs.readFile(DB_PATH, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newNotes);
      fs.writeFile(DB_PATH, JSON.stringify(parsedData), (err) => {
        if (err) {
          console.error(err);
        }else{
          res.sendStatus(200);
        }
      })
    }
  })

});


//BONUS DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete.
app.delete('/api/notes/:id', (req,res) => {
  const id = req.params.id;
  fs.readFile(DB_PATH, (err, data) => {
    //parsing the notes file
    const parsedData = JSON.parse(data);
    //grabbing the ID from the parameter
    const newParsedData = parsedData.filter( data => data.id != id );
    fs.writeFile (DB_PATH, JSON.stringify(newParsedData), (err) => {
      if (err) {
        console.error(err);
      }else{
        res.sendStatus(200);
      }
    })
  })
});





//get * returns index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});


//listening port
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});
