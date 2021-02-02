const models = require('../models');
var bcrypt = require('bcryptjs');
const token = require('../services/token');


module.exports = {
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    query: async(req, res, next) => {
        try {
            const reg = await models.usuario.findOne({ id: req.query.id });
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    update: async(req, res, next) => {
        try {
            let pas = req.body.password;
            const reg0 = await models.usuario.findOne({ where: { id: req.body.id } });
            if (pas != reg0.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const reg = await models.usuario.update({ nombre: req.body.nombre, tipo_documento: req.body.tipo_documento, num_documento: req.body.num_documento, direccion: req.body.direccion, telefono: req.body.telefono, email: req.body.email, password: req.body.password }, { where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    login: async(req, res, next) => {
        try {
            console.log(req.body.email)
            let user = await models.usuario.findOne({ where: { email: req.body.email } });
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    let tokenReturn = await token.encode(user.id, user.nombre);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(401).send({
                        message: 'Password Incorrecto' 
                    });
                }
            } else {
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }
}