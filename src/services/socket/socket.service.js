let users = [];

export const initialSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    socket.on('disconnect', () => {
      users = users?.filter((user) => {
        user.socketIDs = user.socketIDs?.filter((socketID) => {
          return socketID !== socket.id;
        });

        return user.socketIDs.length > 0;
      });
    });

    socket.on('userID', (id) => {
      const user = users.find((user) => {
        return user.id === id;
      });

      user
        ? !user.socketIDs.find((socketID) => socketID === socket.id) &&
          user.socketIDs.push(socket.id)
        : users.push({ id, socketIDs: [socket.id] });

      socket.join(id);
      console.log('Users: ', users);
    });
  });
};
