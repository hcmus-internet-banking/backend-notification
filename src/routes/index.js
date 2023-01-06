import { Router } from 'express';
import {
  notifyCancelInvoice,
  notifyCreateInvoice,
  notifyPayInvoice,
} from '../controllers/index.js';

const router = Router();

router.post('/notify/create-invoice', notifyCreateInvoice);

router.post('/notify/pay-invoice', notifyPayInvoice);

router.post('/notify/cancel-invoice', notifyCancelInvoice);

export default router;
