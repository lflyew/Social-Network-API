const { User, Thought } = require("../models");
const { populate } = require("../models/User");

module.exports = {

    //get users
    getUser(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //get one user 

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        populate("thoughts")
        .populate("friends")
        .select("-__v")
        then((user) =>
        !user
        ? res.status(404).json({ message: "No User found with that ID!"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //create user

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },

    //update user

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .catch((err) => res.status(500).json(err));
    },

    //delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
        ? res.status(404).json({ message: "No User found with this ID!" })
        : Thought.deleteMany({ _id: { $in: user.thoughts }})
        )
        .then(() => res.json({ message: "User and Thought deleted!" }))
        .catch((err) => res.status(500).json(err));
    },
    //add friend

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: "No User found with this ID!" })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //delete friend

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )
        .then(
            (user) =>
            !user
            ? res.status(404).json({ message: "Np User found with this ID!" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};
