const { registrosViewModel } = require('../view/managerView')
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports =
{
    async Get(req, res) {
        try {
            const registros = await registrosViewModel.findAll();
            if (registros.length === 0) {
                return res.json({ "sucesso": false, "mensagem": "There are no registered records." });
            };
            return res.json({ registros });
        } catch (erro) {
            return res.json({ "success": false, "erro": JSON.stringify(erro) });
        };
    },

    async GetId(req, res) {
        try {
            const { id } = req.params;
            const dados = await registrosViewModel.findByPk(id);
            if (dados) {
                return res.json(dados);
            }
            return res.json({ "sucesso": false, "mensagem": "There are no registered records." });
        } catch (error) {
            return res.json({ "success": false, "erro": JSON.stringify(erro) });
        }
    },

    async GetEmail(req, res) {
        try {
            const { useremail } = req.params;
            const dados = await registrosViewModel.findOne({ where: { useremail: useremail } });
            if (dados) {
                return res.json(dados);
            }
            return res.json({ "sucesso": false, "mensagem": "There are no registered records." });
        } catch (error) {
            return res.json({ "success": false, "erro": JSON.stringify(erro) });
        }
    },

    async PostEmail(req, res) {
        try {
            const dados = req.body;

            const user = await registrosViewModel.findOne({ where: { useremail: dados.useremail } });

            if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

            const match = await bcrypt.compare(dados.password, user.password);

            if (!match) return res.status(401).json({ error: "Senha incorreta" });

            const token = jwt.sign(
                { id: user.id, email: user.useremail },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({ "email": user.useremail, "token": token, "username": user.username });
        } catch (error) {
            return res.json({ "Success": false, "Error": error.message });
        };
    },

    async Post(req, res) {
        try {
            const dados = req.body;

            const emailJaExiste = await registrosViewModel.findOne({ where: { useremail: dados.useremail } });
            const loginJaExiste = await registrosViewModel.findOne({ where: { username: dados.username } });

            if (!dados.useremail || !dados.username || !dados.password) {
                return res.json({ Success: false, Message: "Campos obrigatórios faltando" });
            }

            if (emailJaExiste) {
                return res.json({ Success: false, Message: "Email já cadastrado" });
            }

            if (loginJaExiste) {
                return res.json({ Success: false, Message: "Login indisponível" });
            }

            // Hash da senha
            const senhaHash = await bcrypt.hash(dados.password, 10);

            const novoUsuario = await registrosViewModel.create({
                ...dados,
                password: senhaHash,
            });

            return res.json({ Success: true, Data: novoUsuario });

        } catch (error) {
            return res.json({ Success: false, Error: error.message });
        }
    },

    async Put(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;

            const registro = await registrosViewModel.findByPk(id);

            if (!registro) {
                return res.status(404).json({ Success: false, Message: "Registro não encontrado." });
            }
            await registro.update({
                telefone: dados.telefone ?? registro.telefone,
            });

            return res.json({ Success: true, Message: "Registro atualizado com sucesso.", Data: registro });
        } catch (error) {
            console.error("Erro ao atualizar registro:", error);
            return res.status(500).json({ Success: false, Error: error.message });
        }
    },

    async PutPassword(req, res) {
        try {
            const { id } = req.params;
            const { senha, password } = req.body; // senha = senha atual, password = nova senha

            if (!senha || !password) {
                return res.json({ Success: false, Message: "Faltou preencher todos os campos da requisição" });
            }

            if (password.length < 8) {
                return res.json({ Success: false, Message: "A senha precisa ter mais que 8 digitos." });
            }

            const registros = await registrosViewModel.findByPk(id);
            if (!registros) {
                return res.json({ Success: false, Message: "Não há registros com esse ID" });
            }

            const isPasswordValid = await bcrypt.compare(senha, registros.password);
            if (!isPasswordValid) {
                return res.json({ Success: false, Message: "Senha ínvalida" });
            }

            const isSamePassword = await bcrypt.compare(password, registros.password);
            if (isSamePassword) {
                return res.json({ Success: false, Message: "A nova senha não pode ser igual a anterior" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            registros.password = hashedPassword;

            await registros.save();

            return res.json({ Success: true, Message: "Senha atualizada com sucesso." });
        } catch (error) {
            console.error("Erro ao atualizar senha:", error);
            return res.status(500).json({ Success: false, Error: "Internal server error." });
        }
    },

    async Delete(req, res) {
        try {
            const { id } = req.params;
            const registros = await registrosViewModel.findByPk(id)
            await registros.destroy();
            return res.json({ "Success": true, "Data": registros });
        } catch (error) {
            return res.json({ "Success": false, "Error": JSON.stringify(erro) });
        }
    }

}