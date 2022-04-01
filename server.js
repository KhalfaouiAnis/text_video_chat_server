const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const socketServer = require("./socketServer");

const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

// ********** MIDDLEWARES ***********
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors());

// *********** ROUTES **************
app.use("/api/auth", authRoutes);
app.use("/api/friendinvitation", friendInvitationRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.info(`Connected to MongoDB`);
      console.info(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Database connection failed. ${err}`);
  });
