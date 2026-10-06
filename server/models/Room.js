const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            required: true,
            unique: true
        },

        roomName: {
            type: String,
            required: true
        },

        host: {
            type: String,
            required: true
        },

        users: [
            {
                username: {
                    type: String,
                    required: true
                }
            }
        ],

        playlist: [
            {
                title: String,
                artist: String,
                url: String
            }
        ]
    },
    {
        timestamps: true
    }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;