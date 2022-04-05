const { v4: uuid } = require("uuid");

const connectedUsers = new Map();
let activeRooms = [];
let io;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
  }
};

const getActiveConnections = (userId) => {
  const activeConnections = [];

  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

// rooms
const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuid(),
  };
  activeRooms = [...activeRooms, newActiveRoom];
  return newActiveRoom;
};

const getActiveRooms = () => [...activeRooms];

module.exports = {
  setSocketServerInstance,
  getSocketServerInstance,
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
};
