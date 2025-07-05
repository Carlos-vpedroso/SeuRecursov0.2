const express = require('express');
const routes = express.Router();

//#region IMPORTANDO AS CONTROLLERS NAS ROTAS

const multasController = require('../controller/multasController');
const registrosController = require('../controller/registrosController');

//#endregion

//#region ROTAS DAS REQUISICOES DAS MULTAS

routes.get('/multas', multasController.Get);
routes.get('/multas/:id', multasController.GetId);
routes.post('/multas', multasController.Post);
routes.put('/multas/:id', multasController.Put);
routes.delete('/multas/:id', multasController.Delete);

//#endregion

//#region ROTAS DA REQUISICOES DOS REGISTROS

routes.get('/registros', registrosController.Get);
routes.get('/registros/:id', registrosController.GetId);
routes.get('/registros/user/:useremail', registrosController.GetEmail);
routes.post("/registros", registrosController.Post);
routes.post("/login", registrosController.PostEmail);
routes.put("/registros/:id", registrosController.Put);
routes.put("/registros/password/:id", registrosController.PutPassword);
routes.delete("/registros/:id", registrosController.Delete);

//#endregion

module.exports = routes;