import { Router } from 'express';
import * as mailer from '../config/mailer.js'

const router = Router();

router.get("/mail", mailer.mail);

export default router;