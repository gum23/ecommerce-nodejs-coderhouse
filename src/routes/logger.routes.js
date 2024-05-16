import { Router } from 'express';

const router = Router();

router.get("/loggerTest", (req, res) => {
    req.logger.debug("Prueba de log leve Debug --> en Endpoint /api/loggerTest");
    req.logger.http("Prueba de log leve Http --> en Endpoint /api/loggerTest");
    req.logger.info("Prueba de log leve Info --> en Endpoint /api/loggerTest");
    req.logger.warning("Prueba de log leve Warning --> en Endpoint /api/loggerTest");
    req.logger.error("Prueba de log leve Error --> en Endpoint /api/loggerTest");
    req.logger.fatal("Prueba de log leve Fatal --> en Endpoint /api/loggerTest");
    res.send("Prueba de logger!!");
})

export default router;