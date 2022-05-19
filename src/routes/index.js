const express = require("express");
const router = express.Router();

const FilmeController = require("../controllers/filme");
const GeneroController = require("../controllers/genero");
const ReservaController = require("../controllers/reserva");
const ClienteController = require("../controllers/cliente");

//Rotas - Filme:

router.get("/filme", FilmeController.index);
router.post("/filme", FilmeController.store);
router.get("/filme/:codigo", FilmeController.show);
router.put("/filme/:codigo", FilmeController.update);
router.delete("/filme/:codigo", FilmeController.destroy);

//Rotas - Gênero:

router.get("/genero", GeneroController.index);
router.post("/genero", GeneroController.store);
router.get("/genero/:codigo", GeneroController.show);
router.put("/genero/:codigo", GeneroController.update);
router.delete("/genero/:codigo", GeneroController.destroy);


//Rotas - Reserva:

router.get("/reserva", ReservaController.index);
router.post("/reserva", ReservaController.store);
router.get("/reserva/:codigo", ReservaController.show);
router.put("/reserva/:codigo", ReservaController.update);
router.delete("/reserva/:codigo", ReservaController.destroy);

//Rotas - Cliente

router.get("/cliente", ClienteController.index);
router.post("/cliente", ClienteController.store);
router.get("/cliente/:codigo", ClienteController.show);
router.put("/cliente/:codigo", ClienteController.update);
router.delete("/cliente/:codigo", ClienteController.destroy);

module.exports = router;
