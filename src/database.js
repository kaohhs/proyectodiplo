const mongoose = require('mongoose');
const URI = process.env.URI;
/* 
mongoose.connect(URI)
.then(db => console.log('La base de datos se conectó correctamente'))
.catch(err => console.error(err));
 */

//asi le damos un pool de conexiones!
const options = {
    maxPoolSize : 10,
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(URI,options,(err)=>{
    err?console.log('No se puede conectar a MONGO (ATLAS)'):console.log('Conectado a MONGO (ATLAS)');

});

module.exports = mongoose;