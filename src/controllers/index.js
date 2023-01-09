import z, { string } from 'zod';

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
});

const notifyCancelInvoiceSchema = z.object({
  invoiceId: z.string(),
  from: z.object({
    id: z.string(),
    accountNumber: z.string(),
    lastName: z.string(),
    firstName: z.string(),
    email: z.string(),
  }),
  to: z.object({
    id: z.string(),
    accountNumber: z.string(),
    lastName: z.string(),
    firstName: z.string(),
    email: z.string(),
  }),
  messageForCreater: z.string(),
  messageForCustomer: z.string(),
});

export const notifyPayInvoice = async (req, res) => {
  try {
    const { payload } = req.body;
    const { to, from, invoiceId } = notifyPayInvoiceSchema.parse(payload);
    const message = `${from.lastName} ${from.firstName} has canceled invoice #${invoiceId}`;
    global.io.sockets.in(to.id).emit('message', message);
    res.json({
      success: true,
      message: 'OK',
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Error',
    });
    console.log(error);
  }
};

export const notifyCreateInvoice = async (req, res) => {
  try {
    const { payload } = req.body;
    const { to, from, amount } = notifyPayInvoiceSchema.parse(payload);
    const message = `You have received a invoice from ${from.firstName} ${from.lastName} with amount $${amount}`;
    global.io.sockets.in(to.id).emit('message', message);
    res.json({
      success: true,
      message: 'OK',
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Error',
    });
    console.log(error);
  }
};

export const notifyCancelInvoice = async (req, res) => {
  try {
    const { payload } = req.body;
    const { from, to, messageForCreater, messageForCustomer } =
      notifyCancelInvoiceSchema.parse(payload);
    global.io.sockets.in(from.id).emit('message', messageForCreater);
    global.io.sockets.in(to.id).emit('message', messageForCustomer);
    res.json({
      success: true,
      message: 'OK',
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Error',
    });
    console.log(error);
  }
};
