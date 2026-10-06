// const Room = require("../models/Room");

// // ===============================
// // CREATE ROOM
// // ===============================
// const createRoom = async (req, res) => {
//     try {
//         console.log("CREATE ROOM REQUEST:", req.body);
//         const { roomName, username } = req.body;

//         if (!roomName || !username) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Room name and username are required"
//             });
//         }

//         const roomId = Math.random()
//             .toString(36)
//             .substring(2, 8)
//             .toUpperCase();

//         const room = await Room.create({
//             roomId,
//             roomName,
//             host: username,
//             users: [
//                 {
//                     username
//                 }
//             ],
//             playlist: []
//         });

//         res.status(201).json({
//             success: true,
//             message: "Room created successfully",
//             room
//         });

//     } catch (error) {
//         console.error("Create Room Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };


// // ===============================
// // JOIN ROOM
// // ===============================
// const joinRoom = async (req, res) => {
//     try {
//         const { roomId, username } = req.body;

//         // Check required fields
//         if (!roomId || !username) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Room ID and username are required"
//             });
//         }

//         // Find room
//         const room = await Room.findOne({
//             roomId: roomId.toUpperCase()
//         });

//         // Room doesn't exist
//         if (!room) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Room not found"
//             });
//         }

//         // Check if user already exists
//         const userExists = room.users.some(
//             (user) => user.username === username
//         );

//         if (!userExists) {
//             room.users.push({
//                 username
//             });

//             await room.save();
//         }

//         res.status(200).json({
//             success: true,
//             message: "Joined room successfully",
//             room
//         });

//     } catch (error) {
//         console.error("Join Room Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };


// // ===============================
// // EXPORT
// // ===============================
// const getRoom = async (req, res) => {
//     try {
//         const { roomId } = req.params;

//         const room = await Room.findOne({
//             roomId: roomId.toUpperCase()
//         });

//         if (!room) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Room not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             room
//         });

//     } catch (error) {
//         console.error("Get Room Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };

// const addSong = async (req, res) => {
//     try {
//         const { roomId } = req.params;
//         const { title, artist, url } = req.body;

//         if (!title || !artist || !url) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Title, artist and URL are required"
//             });
//         }

//         const room = await Room.findOne({
//             roomId: roomId.toUpperCase()
//         });

//         if (!room) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Room not found"
//             });
//         }

//         room.playlist.push({
//             title,
//             artist,
//             url
//         });

//         await room.save();

//         res.status(200).json({
//             success: true,
//             message: "Song added successfully",
//             room
//         });

//     } catch (error) {
//         console.error("Add Song Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };

// module.exports = {
//     createRoom,
//     joinRoom,
//     getRoom,
//     addSong
// };




const Room = require("../models/Room");

// =========================
// CREATE ROOM
// =========================
const createRoom = async (req, res) => {
    try {
        const { roomName, username } = req.body;

        if (!roomName || !username) {
            return res.status(400).json({
                success: false,
                message: "Room name and username are required"
            });
        }

        // Generate a unique room ID
        let roomId;
        let existingRoom;

        do {
            roomId = Math.random()
                .toString(36)
                .substring(2, 8)
                .toUpperCase();

            existingRoom = await Room.findOne({ roomId });
        } while (existingRoom);

        // Create room
        const room = new Room({
            roomId: roomId,
            roomName: roomName.trim(),
            host: username.trim(),
            users: [
                {
                    username: username.trim()
                }
            ],
            playlist: []
        });

        // IMPORTANT: Save room to MongoDB
        const savedRoom = await room.save();

        console.log("ROOM CREATED:", savedRoom.roomId);

        return res.status(201).json({
            success: true,
            message: "Room created successfully",
            roomId: savedRoom.roomId,
            room: savedRoom
        });

    } catch (error) {
        console.error("CREATE ROOM ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create room",
            error: error.message
        });
    }
};


// =========================
// JOIN ROOM
// =========================
const joinRoom = async (req, res) => {
    try {
        const { roomId, username } = req.body;

        if (!roomId || !username) {
            return res.status(400).json({
                success: false,
                message: "Room ID and username are required"
            });
        }

        const room = await Room.findOne({
            roomId: roomId.trim().toUpperCase()
        });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        // Avoid duplicate username
        const alreadyJoined = room.users.some(
            user => user.username === username.trim()
        );

        if (!alreadyJoined) {
            room.users.push({
                username: username.trim()
            });

            await room.save();
        }

        return res.status(200).json({
            success: true,
            message: "Joined room successfully",
            room: room
        });

    } catch (error) {
        console.error("JOIN ROOM ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to join room",
            error: error.message
        });
    }
};


// =========================
// GET ROOM
// =========================
const getRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;

        console.log("FETCHING ROOM:", roomId);

        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: "Room ID is required"
            });
        }

        const room = await Room.findOne({
            roomId: roomId.trim().toUpperCase()
        });

        if (!room) {
            console.log("ROOM NOT FOUND:", roomId);

            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        console.log("ROOM FOUND:", room.roomId);

        return res.status(200).json({
            success: true,
            room: room
        });

    } catch (error) {
        console.error("GET ROOM ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch room",
            error: error.message
        });
    }
};


// =========================
// ADD SONG
// =========================
const addSong = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { title, artist, url } = req.body;

        if (!title || !artist || !url) {
            return res.status(400).json({
                success: false,
                message: "Title, artist and URL are required"
            });
        }

        const room = await Room.findOne({
            roomId: roomId.trim().toUpperCase()
        });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        room.playlist.push({
            title: title.trim(),
            artist: artist.trim(),
            url: url.trim()
        });

        await room.save();

        return res.status(200).json({
            success: true,
            message: "Song added successfully",
            room: room
        });

    } catch (error) {
        console.error("ADD SONG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add song",
            error: error.message
        });
    }
};

// =========================
// REMOVE SONG
// =========================
const removeSong = async (req, res) => {
    try {
        const { roomId, songId } = req.params;

        const room = await Room.findOne({
            roomId: roomId.trim().toUpperCase()
        });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        const songExists = room.playlist.some(
            song => String(song._id) === String(songId)
        );

        if (!songExists) {
            return res.status(404).json({
                success: false,
                message: "Song not found"
            });
        }

        room.playlist = room.playlist.filter(
            song => String(song._id) !== String(songId)
        );

        await room.save();

        return res.status(200).json({
            success: true,
            message: "Song removed successfully",
            room: room
        });

    } catch (error) {
        console.error("REMOVE SONG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove song",
            error: error.message
        });
    }
};

module.exports = {
    createRoom,
    joinRoom,
    getRoom,
    addSong,
    removeSong
};