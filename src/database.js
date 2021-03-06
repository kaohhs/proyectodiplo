const mongoose = require('mongoose');
const {createRoles} = require('./lib/initialRoleSetup');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vgbzmud.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos') 
    createRoles();
  })
  .catch((e) => {
    console.log('Database error', e)
  })