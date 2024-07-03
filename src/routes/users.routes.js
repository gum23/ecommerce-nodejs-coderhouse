import { Router } from 'express';
import { auth } from '../controllers/products.controller.js';
import * as ctrlUsers from '../controllers/users.controllers.js';

const router = Router();

router.get("/users/premium/:uid", ctrlUsers.premiumView);

router.post("/users/premium", auth, ctrlUsers.premium);

router.get("/users", ctrlUsers.userInactivity);

router.delete("/users", ctrlUsers.deleteUser);

router.put("/users/premium", ctrlUsers.putUserRol);

export default router;