import { Router } from "express";
const router = Router();

router.get("/realtimeproducts", (req, res) => {
  const admin = req.session.userData;
  
  res.render("realTimeProducts", {admin});
});

export default router;
