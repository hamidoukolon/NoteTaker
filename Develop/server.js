// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

app.use(express.static("public"))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db = require('./db/db.json')
var fs = require('fs')

app.get("/api/notes", function(req, res){
  res.json(db)
})

app.post('/api/notes', function(req, res){

  db.push({
    title: req.body.title,
    text: req.body.text,
    id: db.length > 0 ? db[db.length - 1].id + 1 : 1
  })
  fs.writeFile('./db/db.json', JSON.stringify(db), function(err){
    if(err) throw err;
    res.send(200)
  })
})

app.delete("/api/notes/:id", function(req, res){

  // db = db.filter(function(note){
  //   if(note.id === parseInt(req.params.id)){
  //     return false
  //   }
  //   return true
  // })
  
  const findId = note => note.id !== parseInt(req.params.id)
  db = db.filter(findId)
  
  fs.writeFile('./db/db.json', JSON.stringify(db), function(err){
    if(err) throw err;
    res.send(200)
  })
  
})

//   // Displays a single character, or returns false
//   app.get("/api/notes/:", function(req, res) {
//     var chosen = req.params.character;

//     console.log();

//     return res.json(false);
//   });
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});