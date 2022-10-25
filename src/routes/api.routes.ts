import controller from '../controller/api.controller'
import express from 'express'

// creamos un rauter para que use la clase express
const router = express.Router();

// le decimos al router que haga ping
router.get("/ping", controller.ping)
router.post("/parse", controller.parse)


export default router;