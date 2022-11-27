const express = require("express");
const userDao = require("./daos/userDAO")

//Requerido en todos
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();
const res = require('express/lib/response');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);//Ruta principal

//Inicializar el servicio
var port = process.env.PORT || 8090; //Declarando puerto de inicio
app.listen(port); //Puerto de escucha
console.log('Prenda API Iniciado en el puerto : ' + port); //Mensaje de inicio de servicio


//Ruta de bienvenida eg: http://localhost:8090
app.get("/", (_request, response) => {
    response.send("Bienvenido a la API de APOLO");
});

//CONSEGUIR USUARIO POR MEDIO DE EMAIL
router.route('/usuarios/:email/:pass').get((request, response) => {
    userDao.getOne(request.params.email, request.params.pass).then(result => {
        response.json(result[0]);
    })
})
//CONSEGUIR USUARIO POR MEDIO DE NOMBRE
router.route('/usuarios/:name').get((request, response) => {
    userDao.getOneByName(request.params.name).then(result => {
        response.json(result[0]);
    })
})
//INSERTAR USUARIO 
router.route('/usuario/insertar').post((request, response) => {
    let usuario = {...request.body};
    userDao.insertOne(usuario).then(result => {
        response.json(result);
    })
})
//ACTUALIZAR USUARIO 
router.route('/usuario/actualizar').post((request, response) => {
    let usuario = {...request.body};
    userDao.updatetOne(usuario).then(result => {
        response.json(result);
    })
})
//BORRAR USUARIO 
router.route('/usuario/eliminar').delete((request, response) => {
    let usuario = {...request.body};
    userDao.deleteOne(usuario).then(result => {
        response.json(result);
    })
})