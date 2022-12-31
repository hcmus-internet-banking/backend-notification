export const notifyCancelInvoice = async () => {
  const { to, from } = req.body;

  const user = users.find((user) => {
    return user.id === to;
  });

  if (user) {
    user.socketIDs.forEach((socketID) => {
      io.to(socketID).emit('invoice', from);
    });
  }

  res.status(200).json({ message: 'OK' });
};

export const notifyCreateInvoice = async () => {
  const { to, from } = req.body;

  const user = users.find((user) => {
    return user.id === to;
  });

  if (user) {
    user.socketIDs.forEach((socketID) => {
      io.to(socketID).emit('invoice', from);
    });
  }

  res.status(200).json({ message: 'OK' });
};
