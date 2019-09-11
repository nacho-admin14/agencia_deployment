//Importar Express
const express = require('express'); //Creamos el servidor
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
const database = require('./config/database');

require('dotenv').config({path: 'variables.env'});

database.authenticate()
    .then(() => console.log('DB Conectada'))
    .catch(error => console.log(error));

//Configurar Express
const app = express();
//Habilitar pug
app.set('view engine', 'pug');
//Añadir las vistas
app.set('views', path.join(__dirname, './views'));
//Cargar una carpeta estática llamada public
app.use(express.static('public'));

//Validar si estamos en desarrollo o producción
const config = configs[app.get('env')];
//Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;
//Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear(); // res.locals = varible interna de Node
    res.locals.ruta = req.path;
    //console.log(res.locals);
    return next();
})
//Ejecutamos el bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//Cargar las rutas
app.use('/', routes());

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;

app.listen(port, host, () => {
    console.log('El servidor está funcionando');
});