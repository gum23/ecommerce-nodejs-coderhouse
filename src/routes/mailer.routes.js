import { Router } from 'express';
import * as mailer from '../config/mailer.js'

const router = Router();

router.get("/mail", mailer.mail);

router.get("/recoverPassword", mailer.recoverPass);

router.get("/deleteUsers", mailer.deleteUsers);

router.get("/deleteProduct", mailer.deleteProduct);

export default router;