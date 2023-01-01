import z from 'zod';

const notifyPayInvoiceSchema = z.object({
  to: z.object({
    id: z.string(),
    accountNumber: z.string(),
    lastName: z.string(),
    firstName: z.string(),
  }),
  from: z.object({
    id: z.string(),
    accountNumber: z.string(),
    lastName: z.string(),
    firstName: z.string(),
  }),
  amount: z.preprocess((a) => parseInt(z.string().parse(a)), z.number()),
  invoiceId: z.string(),
  message: z.string(),
});

export const notifyPayInvoice = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { payload } = req.body;
    const { to, from, amount, invoiceId } = payload;
    const message = `You have received a payment of ${amount} from ${from.lastName} ${from.firstName} for invoice ${invoiceId}`;
    console.log('message', message);
    global.io.sockets.in(to.id).emit('message', message);

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
    });

    console.log(error);
  }
};

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
