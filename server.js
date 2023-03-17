import express from "express";
import bodyParser from "body-parser";
import {
  getMoods,
  getMood,
  addMood,
  updateMood,
  deleteMood,
} from "./database.js";

const app = express();

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(res.data);
});

// get a list of all users
app.get("/api/moods", (req, res) => {
  getMoods()
    .then((moods) => {
      res.send(moods);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "There was an error" });
    });
});

app.get("/api/moods/:id", (req, res) => {
  const id = req.params.id;
  getMood(id)
    .then((mood) => {
      if (!mood) {
        res.status(404).send({ message: `There is no mood with the id ${id}` });
        return;
      }
      res.send(mood);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "There was an error" });
    });
});

app.post("/api/moods", (req, res) => {
  // let id = req.body.id;
  let notes = req.body.notes;
  let rating = req.body.rating;
  let created = req.body.created;

  if (!notes || !rating) {
    res.status(400).send({ message: "There is no notes and rating" });
    return;
  }
  addMood(notes, rating, created)
    .then((mood) => {
      res.status(201).send(mood);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "There was an error" });
    });
});

app.put("/api/moods/:id", (req, res) => {
  const id = req.params.id;
  const notes = req.body.notes;
  const rating = req.body.rating;
  if (!notes) {
    res.status(400).send({ message: "No note" });
    return;
  }
  if (!(rating >= 0 && rating <= 10)) {
    res.status(400).send({ message: "Rating is not between 0 and 10" });
    return;
  }
  updateMood(id, notes, rating)
    .then((mood) => {
      res.status(201).send(mood);
    })
    .catch((error) => {
      res.status(500).send({ error: "There was an error" });
    });
});

app.delete("/api/moods/:id", (req, res) => {
  const id = req.params.id;
  getMood(id)
    .then((mood) => {
      if (!mood) {
        res.status(404).send({ message: `There is no mood with the id ${id}` });
        return;
      }
      deleteMood(id);
      res.end();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "There was an error" });
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
