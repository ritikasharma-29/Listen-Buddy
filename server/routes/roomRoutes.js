// const express = require("express");

// const router = express.Router();

// console.log("ROOM ROUTES LOADED");

// const {
//     createRoom,
//     joinRoom
// } = require("../controllers/roomController");


// // Create Room
// router.post("/", createRoom);


// // Join Room
// //router.post("/join", joinRoom);
// router.post("/join", (req, res, next) => {
//     console.log("JOIN ROUTE HIT");
//     next();
// }, joinRoom);


// module.exports = router;

console.log("ROOM ROUTES LOADED");

const express = require("express");

const router = express.Router();

const {
    createRoom,
    joinRoom,
    getRoom,
    addSong,
    removeSong
} = require("../controllers/roomController");

router.post("/", createRoom);

// router.post("/join", (req, res) => {
//     console.log("JOIN ROUTE HIT");
//     console.log("BODY:", req.body);

//     res.json({
//         success: true,
//         message: "JOIN ROUTE IS WORKING"
//     });

//     joinRoom(req, res);
// });
router.post("/join", joinRoom);

router.get("/:roomId", getRoom);

router.post("/:roomId/songs", addSong);

router.delete("/:roomId/songs/:songId", removeSong);

module.exports = router;