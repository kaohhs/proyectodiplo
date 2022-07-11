require('dotenv').config();
const express = require('express');
const server = express();
const morgan = require('morgan');
const path = require('path');
const { Mongoose } = require('./database');
const app = express();
app.use(express.json());

//configuracion
server.set('port', process.env.PORT || 3001)


//middlewares

server.use(morgan('dev'));
server.use(express.json());


//Routes

server.use('/api/tasks', require('./routes/task.routes'));

// Archivos estaticos

server.use(express.static(path.join(__dirname, 'public')))
// inicializando servidor




server.listen(server.get('port') , () => {
    console.log(`Servidor ejecutandose en puerto ${server.get('port')}`)
    
});