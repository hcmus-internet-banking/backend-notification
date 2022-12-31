import { Router } from 'express';
import {
  notifyCancelInvoice,
  notifyCreateInvoice,
} from '../controllers/index.js';

const router = Router();

router.post('/notify/cancel-invoice', notifyCancelInvoice);

router.post('/notify/create-invoice', notifyCreateInvoice);

export default router;
