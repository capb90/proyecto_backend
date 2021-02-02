/* import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth'; */
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');


const router = routerx();

 router.post('/add', usuarioController.add);
 router.get('/query', usuarioController.query);

 router.put('/update', usuarioController.update);
 
 router.post('/login', usuarioController.login);

module.exports = router;