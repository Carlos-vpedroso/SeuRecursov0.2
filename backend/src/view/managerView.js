const DbConnect = require('../database/index');

const multasModel = require('../models/multas');
const registrosModel = require('../models/registros');

const multasViewModel = DbConnect.define('multas', multasModel);
const registrosViewModel = DbConnect.define('registros', registrosModel);


module.exports = {
    multasViewModel,
    registrosViewModel
};