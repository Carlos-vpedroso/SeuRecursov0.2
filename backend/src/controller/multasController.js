const { multasViewModel } = require('../view/managerView')

module.exports =
{
    async Get(req, res) {
        try {
            const multas = await multasViewModel.findAll();
            if (multas.length === 0) {
                return res.json({ "sucesso": false, "mensagem": "There are no registered records." });
            };

            return res.json(multas);
        } catch (erro) {
            return res.json({ "success": false, "erro": JSON.stringify(erro) });
        };
    },

    async GetId(req, res) {
        try {
            const { id } = req.params;
            const multas = await multasViewModel.findByPk(id)
            if (multas) {
                return res.json(multas);
            }
            return res.json({ "sucesso": false, "mensagem": "Multa not finded." });
        } catch (error) {
            return res.json({ "success": false, "erro": JSON.stringify(error) });
        }
    },

    async Post(req, res) {
        try {
            const multas = await multasViewModel.create(req.body);
            return res.json({ "Success": true, "Data": multas });
        } catch (error) {
            return res.json({ "Success": false, "Error": JSON.stringify(erro) });
        };
    },

    async Put(req, res) {
        try {
            const { id } = req.params;
            const { artigo_multa, codigo_multa, valor_multa, valor_recurso, descricao, tipo_multa } = req.body;
            const multas = await multasViewModel.findByPk(id);
            if (multas) {
                multas.artigo_multa = artigo_multa
                multas.codigo_multa = codigo_multa
                multas.valor_multa = valor_multa
                multas.valor_recurso = valor_recurso
                multas.descricao = descricao
                multas.tipo_multa = tipo_multa
                await multas.save();
            }
            return res.json({ "Success": true, "Data": multas });
        } catch (error) {
            return res.json({ "Success": false, "Error": JSON.stringify(erro) })
        };
    },

    async Delete(req, res) {
        try {
            const { id } = req.params;
            const multas = await multasViewModel.findByPk(id)
            await multas.destroy();
            return res.json({ "Success": true, "Data": multas });
        } catch (error) {
            return res.json({ "Success": false, "Error": JSON.stringify(erro) });
        }
    }

}