// Get Router from express
const router = require("express").Router();
// get Model
let Exercise = require("../Models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error" + err));
});

router.route("/store").post((req, res) => {
  const username = String(req.body.username);
  const duration = Number(req.body.duration);
  const date = Date(req.body.date);
  const description = String(req.body.description);
  const newExercise = new Exercise({
    username,
    duration,
    date,
    description
  });
  newExercise
    .save()
    .then(() => res.json("Exercise Added"))
    .catch(err => err.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(ex => res.json(ex))
    .catch(err => res.status(400).json("Err" + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findByIdAndUpdate(req.params.id)
    .then(ex => {
      ex.username = String(req.body.username);
      ex.duration = Number(req.body.duration);
      ex.date = Date(req.body.date);
      ex.description = String(req.body.description);
      ex.save()
        .then(() => res.json("Updated"))
        .catch(err => res.status(500).json("Error" + err));
    })
    .catch(err => res.status(500).json("err" + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(ex => res.json(ex))
    .catch(err => res.status(400).json("Err" + err));
});

module.exports = router;
