var fs= require('fs');

var mygramatica = require('./gramatica.js')

fs.readFile('./entrada.txt',(err,data)=>{
    // Si existe algun error
    if (err) throw err;
    
    // si no hay errores proceder con lectura de gramarcia.parse
    console.log("Todo esta bien");
    console.log(data.toString());
    console.log("Ahora toca analizar");
    mygramatica.parse(data.toString());

})