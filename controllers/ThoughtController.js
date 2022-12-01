const { Thought, User } = require('../models');

module.exports = {

   // Get Thoughts
   getThought(req, res) {
    Thought.find({})
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
   } ,

   //get one thought
   getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thought) =>
    !thought
    ? res.status(404).json({ message: "No Thought found with this ID!" })
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
   },
   
}