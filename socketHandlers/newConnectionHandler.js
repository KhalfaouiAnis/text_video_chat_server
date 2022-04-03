const serverStore = require("../serverStore");
const friendsUpdate = require("./updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending friends invitations list
  friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

  // update friend list
  friendsUpdate.updateFriends(userDetails.userId);
};

module.exports = newConnectionHandler;
