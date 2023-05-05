const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const convRoutes = require("./routes/conversation.js");
const messageRoutes = require("./routes/message.js");


const testServer = async (bool) => {
    if (bool) {
        console.log("testServer PASSED!");
    }
}

const testMongo = async (bool) => {
    if (bool) {
        console.log("testMongo PASSED!");
    }
}


dotenv.config();
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE);
        // console.log("Connected to mongoDB");
        testMongo(true);
    } catch (err) {
        console.log(err);
    }
}

//middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded succesfully!");
    } catch (err) {
        res.status(500).json(err);
    }
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/conversations", convRoutes);
app.use("/message", messageRoutes);



const port = 5000;
app.listen(port, () => {

    try {
        connect();
        // console.log("Server is running on port " + port);
        testServer(true);
    } catch (err) {
        console.log(err);
    }

});


//socket
const io = require("socket.io")(8900, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({
            userId,
            socketId,
        });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

// socket connection
io.on("connection", (socket) => {
    console.log("a user connected.");

    //take userId and socketId from the client
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);

        //send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            const user = getUser(receiverId);
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
            });
        });

        //when disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
    });
})
