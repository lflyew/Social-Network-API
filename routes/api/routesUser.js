const router = require('express').Router();


const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require ("../../controllers/UserController");

//GET All and post users

router.route("/").get(getUser).post(createUser);

//get one user put and delete

router.route("/:userId")
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

//post and delete by Friend ID

router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(deleteFriend);

module.exports = router;
