require('dotenv').config();
const express = require('express');
const server = express();
const morgan = require('morgan');
const path = require('path');
const { Mongoose } = require('./database');
const app = express();
const jwt = require('jsonwebtoken');


app.use(express.json());


//configuracion
server.set('port', process.env.PORT || 3001)


//middlewares

server.use(morgan('dev'));
server.use(express.json());


//Routes

server.use('/api/tasks', require('./routes/task.routes'));

server.post('/api/login', (req, res) =>{
     const user = {
   
        id: 1,
        name: "Marcelo",
        email: "kaohhs@gmail.com",
     
 
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
      res.json({
        token
        });
      });
  })

  server.delete("/api/tasks", verifyToken, (req , res) => {

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                    mensaje: "Delete correct",
                    authData
                });
        }
    });
});

// Authorization: Bearer <token>
function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
         const bearerToken = bearerHeader.split(" ")[1];
         req.token  = bearerToken;
         next();
    }else{
        res.sendStatus(403);
    }
}


// Archivos estaticos

server.use(express.static(path.join(__dirname, 'public')))
// inicializando servidor




server.listen(server.get('port') , () => {
    console.log(`Servidor ejecutandose en puerto ${server.get('port')}`)
    
});