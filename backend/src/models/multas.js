const Sequelize = require('sequelize');

module.exports = multas = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    artigo_multa: {
        type: Sequelize.STRING,
        allowNull: true
    },
    codigo_multa: {
        type: Sequelize.STRING,
        allowNull: true
    },
    valor_multa: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    valor_recurso: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo_multa: {
        type: Sequelize.STRING,
        allowNull: true
    }
};