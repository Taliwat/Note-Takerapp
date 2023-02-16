
const router = require("express").Router()
const fs = require('fs');
const path = require("path")
const db = require("../db/db.json")
const {readFromFile, readAndAppend} = require("../utils/fsHelpers")
// fs.readFileSync('${__dirname}\index.js');



//MAKE a ROUTE that reads to db.json and returns all saved notes as json
router.get('/notes', (req, res) =>
    res.json(db)
);

//MAKE a POST ROUTE that receives new notes on the req.body, add to db.json, then return to new note in client.
router.post('/notes', (req, res) => {
    const { title, text } = req.body
    const newNote = {
        title,
        text,
        id: db.length
    }
    readAndAppend(newNote, "./db/db.json")
    res.json(db)
})

router.delete("/notes/:id", (req, res) => {
    readFromFile("./db/db.json").then((data) => {
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== req.params.id)
        fs.writeFileSync(
            path.join(__dirname, "../db/db.json"),
            JSON.stringify(notes)
            )
            console.log("clicked")
        res.json(db)
    })
})



module.exports = router;
//Unique id install notes for npm(for later)
// npm install uuidv4