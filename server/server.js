const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log(
    "MONGO_URI starts with:",
    process.env.MONGO_URI?.substring(0, 14)
);

const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());


app.use("/api/rooms", roomRoutes);

app.get("/api/rooms/test", (req, res) => {
    res.json({
        success: true,
        message: "Room route is working"
    });
});

app.get("/", (req, res) => {
    res.send("Listen Buddy Backend is Working!");
});

const PORT = 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    let currentRoom = null;
    let currentUsername = null;

    let currentSong = null;
    let currentTime = 0;
    let isPlaying = false;

    socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);

    currentRoom = roomId;
    currentUsername = username;

    console.log(`${username} joined room ${roomId}`);

    io.to(roomId).emit("user-joined", {
        username: username
    });

    // Send current playback state to the newly joined user
    if (currentSong) {
        socket.emit("sync-playback", {
            songId: currentSong,
            currentTime: currentTime,
            isPlaying: isPlaying
        });
    }
});
    socket.on("song-selected", (data) => {
    console.log("SONG SELECTED:", data);

    socket.to(data.roomId).emit("song-selected", {
        song: data.song
    });
});

    socket.on("song-changed", (data) => {
    console.log("SONG CHANGED:", data);

    socket.to(data.roomId).emit("song-changed", {
        song: data.song
    });
});

    socket.on("playlist-updated", (data) => {
    console.log("PLAYLIST UPDATED:", data);

    socket.to(data.roomId).emit("playlist-updated", {
        playlist: data.playlist
    });
});

    socket.on("play-song", (data) => {
    console.log("PLAY SONG:", data);

    currentSong = data.songId;
    currentTime = data.currentTime;
    isPlaying = true;

    socket.to(data.roomId).emit("play-song", {
        songId: data.songId,
        currentTime: data.currentTime
    });
});

    socket.on("pause-song", (data) => {
    console.log("PAUSE SONG:", data);

    currentSong = data.songId;
    currentTime = data.currentTime;
    isPlaying = false;

    socket.to(data.roomId).emit("pause-song", {
        songId: data.songId,
        currentTime: data.currentTime
    });
});

    socket.on("seek-song", (data) => {
    console.log("SEEK SONG:", data);

    currentSong = data.songId;
    currentTime = data.currentTime;

    socket.to(data.roomId).emit("seek-song", {
        songId: data.songId,
        currentTime: data.currentTime
    });
});

    socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);

    console.log(`${currentUsername} left room ${roomId}`);

    io.to(roomId).emit("user-left", {
        username: currentUsername
    });

    currentRoom = null;
    currentUsername = null;
});

    socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (currentRoom && currentUsername) {
        io.to(currentRoom).emit("user-left", {
            username: currentUsername
        });

        console.log(
            `${currentUsername} disconnected from ${currentRoom}`
        );
    }
});
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});