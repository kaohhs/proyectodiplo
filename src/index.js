require('dotenv').config();
const express = require('express');
const server = express();
const morgan = require('morgan');
const path = require('path');
const { Mongoose } = require('./database');
const app = express();
const jwt = require('jsonwebtoken');
const register = require('./controllers/registerController')
const Task = require('./models/task');
const { validate } = require('schema-utils');


app.use(express.json());


//configuracion
server.set('port', process.env.PORT || 3001)


//middlewares

server.use(morgan('dev'));
server.use(express.json());


//Routes

server.use('/api/tasks', require('./routes/task.routes'));


// for register a user you may need provide the username, email, password and roles. If role is not defined, will auto-asign as a user profile by default.
server.post('/api/register', async (req, res, next) =>{
    const data = await req.body;
    
    try {
        await register(data);
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        next(error);
      }
  })


  
//Searching by title // use http://localhost:3001/post?title=(taskTitle)
  server.get('/post', async (req, res) =>{
      const title = req.query.title
      const searchResult = await Task.findOne({title: title})
      res.status(200).json(searchResult);
    })

//Searching by description, just not working at all. Always retrieve a null value.     
  server.get('/description', async (req, res) =>{
    const description = req.query.description
    const searchDescriptionResult = await Task.find({description: description})
    res.status(200).json(searchDescriptionResult);
  })

// This is where the token generates and allow to see stuff
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

 // Authorization: Bearer <token>
function verifyToken(req, res, next){
  const bearerHeader =  req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
       const bearerToken = bearerHeader.split(" ")[1];
       req.token  = bearerToken;
       next();
       module.exports = verifyToken
  }else{
      res.sendStatus(403);
  }
}

// Delete task - if we don't provide token on header and try http://localhost:3001/api/tasks will throw a 403 error because we didn not provided any authorized token on header for that operation. For getting the token, 1st  we must go into localhost://localhost:3001/api/login and get the Token. After that, we can set the header with the provided token by JWT and use DELETE method on Postman. 
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





// Static Files

server.use(express.static(path.join(__dirname, 'public')))


// Starting Server

server.listen(server.get('port') , () => {
    console.log(`Servidor ejecutandose en puerto ${server.get('port')}`)
    
});