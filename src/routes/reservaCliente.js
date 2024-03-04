const express = require("express");
const { createReservaCliente, getReservaCliente, getReservaClienteById} = require("../controllers/cliente/ReservaClienteController")
const { admin, protect } = require("../middlewares/jsonwebtoken");



const router = express.Router();


router.get("/", [protect], [admin],getReservaCliente);
router.get("/:id", [protect], getReservaClienteById);
router.post("/", [protect], createReservaCliente);
// router.delete("/:id", [protect],[admin] ,deleteMovie);
// router.put("/:id", [protect],[admin] ,updateMovie);



module.exports = router
