class WebSockets {
  users = [];
  connection(client) {
    console.log('a user connected: ' + client.id);
    client.on('disconnect', () => {
      console.log('Disconnect ' + client.id);
      this.users = this.users?.filter((user) => {
        user.socketIDs = user.socketIDs?.filter((socketID) => {
          return socketID !== client.id;
        });

        return user.socketIDs.length > 0;
      });
    });

    client.on('userID', (id) => {
      const user = this.users?.find((user) => {
        return user.id === id;
      });

      if (user) {
        if (!user.socketIDs.find((socketID) => socketID === client.id)) {
          user.socketIDs.push(client.id);
        }
      } else {
        this.users = this.users || [];
        this.users.push({ id, socketIDs: [client.id] });
      }

      client.join(id);
      console.log('Users: ', this.users);
    });
  }
}

export default new WebSockets();
