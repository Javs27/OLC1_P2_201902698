import { Response, Request } from "express";
import Errores from '../../utilidades/Interpreter/Arbol/Exceptions/Error';
import Three from "../../utilidades/Interpreter/Arbol/Symbol/Three";
import SymbolTable from "../../utilidades/Interpreter/Arbol/Symbol/SymbolTable";
import { Instruccion } from "../../utilidades/Interpreter/Arbol/Abstract/Instruccion";
import { Console, group } from "console";

export let listaErrores: Array<Errores> = [];

export const parse = (req: Request & unknown, res: Response): void => {
    listaErrores = new Array<Errores>();
    let parser = require('../../utilidades/Interpreter/Arbol/analizador');
    const { peticion } = req.body;



    try { 
      let ast = new Three(parser.parse(peticion));
      var tabla = new SymbolTable();
      ast.settablaGlobal(tabla);
      
      // para el arbol 
      ast.agregar_ast(`nodeOriginal[label="<\\Lista_Instrucciones\\>"];`)

       //generar el ast primero
       for (const instr of ast.getinstrucciones()) {
        try {
            instr.ast(ast);
            ast.agregar_ast(`nodeOriginal->node_${instr.linea}_${instr.columna}_;`)
        } catch (error) {
        }
      }
      let graficarAST=("digraph G {\nnode[shape=box];" + ast.get_ast() + "\n}")
      console.log(graficarAST);


      // aca empieza el analisis semantico 
     /* for (let i of ast.getinstrucciones()) {
        if (i instanceof Errores) {
          listaErrores.push(i);
          ast.actualizaConsola((<Errores>i).returnError());
        }

   
        var resultador = i instanceof Instruccion ?  i.interpretar(ast, tabla) :console.log("Error") ;
        if (resultador instanceof Errores) {
          listaErrores.push(resultador);
          ast.actualizaConsola((<Errores>resultador).returnError());
        }        
      }*/
      // aca termina el analisis semantico 

      // extraemos el codigo de la tableHTML
      let TableHTML = TablaErrores();
      let TableSymbols = ast.createTableSymbols();
      console.log(TableHTML)
     
      //console.log(TableHTML)
      // ENVIARMOS LA VARIBLE: Y DESPUES SE ENVIA EL CONTENIDO 
      res.json({ consola: ast.getconsola(), errores: listaErrores, simbolos: [], ErroresHTML: TableHTML , tablaSimbolos: TableSymbols , ArbolGraficado: graficarAST});


    } catch (err) {
        console.log(err)
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] });
    }



}


function TablaErrores(){
  var TableHTML='<table style="border-collapse: collapse; width: 100%;" border="1">'+
'<tbody>'+
'<tr>'+
'<td style="text-align: center;"><strong>TIPO DE ERROR</strong></td>'+
'<td style="text-align: center;"><strong>DESCRIPCION</strong></td>'+
'<td style="text-align: center;"><strong>FILA</strong></td>'+
'<td style="text-align: center;"><strong>COLUMNA</strong></td>'+
'</tr>';
  for (let error in listaErrores){
    TableHTML += (listaErrores[error].FilaErores())
  }
  TableHTML += '</tbody>'+'</table>';
  return TableHTML;


}
  

