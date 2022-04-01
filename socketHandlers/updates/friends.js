const User = require("../../models/User");
const FriendInvitation = require("../../models/FriendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");

    // find all active connections with userId
    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      if (pendingInvitations) {
        io.to(receiverSocketId).emit("friends-invitations", {
          pendingInvitations,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateFriendsPendingInvitations };
