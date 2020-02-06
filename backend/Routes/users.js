// what should happen to users routes; here it is
const router = require("express").Router();
let User = require("../Models/user.model");

// Route to get all users;
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error" + err));
});

// Route to add Users users/add
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch(err => res.status(400).json("Error" + err));
});

module.exports = router;