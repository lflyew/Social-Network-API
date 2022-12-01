const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/ThoughtController");

//GET and Post Thought
router.route('/').get(getThought).post(createThought);

//GET PUT DELETE BY ID ONE THOUGHT

router.route("/:thoughtId")
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//Post new reactions

router.route("/:thoughtId/reactions")
.post(createReaction);

//Delete reactions

router.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction);

module.exports = router;