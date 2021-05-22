const router = require("express").Router();
const fs = require("fs");

let noteArray = fs.readFileSync("./Develop/db/db.json", "utf-8");
console.log(noteArray);

noteArray = JSON.parse(noteArray);

router.get("/api/notes", async (req, res) => {
  res.status(200).json(noteArray);
});

router.post("/api/notes", (req, res) => {
  const newNote = req.body;
  if (noteArray.length === 0) {
    newNote.id = 1;
  } else {
    newNote.id = noteArray[noteArray.length - 1].id + 1;
  }

  noteArray.push(newNote);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteArray, null, 2));
  res.json(newNote);
});

router.delete("/api/notes/:id", async (req, res) => {
  function filterByID(note) {
    if (note.id !== parseInt(req.params.id)) {
      return true;
    }

    return false;
  }
  noteArray = noteArray.filter(filterByID);

  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteArray, null, 2));
  res.json(noteArray);
});

module.exports = router;
