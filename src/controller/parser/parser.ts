import { Response, Request } from "express";
import Errores from '../../utilidades/Interpreter/Arbol/Exceptions/Error';
import Three from "../../utilidades/Interpreter/Arbol/Symbol/Three";
import SymbolTable from "../../utilidades/Interpreter/Arbol/Symbol/SymbolTable";
import { Instruccion } from "../../utilidades/Interpreter/Arbol/Abstract/Instruccion";

export let listaErrores: Array<Errores> = [];

export const parse = (req: Request & unknown, res: Response): void => {
    listaErrores = new Array<Errores>();
    let parser = require('../../utilidades/Interpreter/Arbol/analizador');
    const { peticion } = req.body;

    try { 
      let ast = new Three(parser.parse(peticion));
      var tabla = new SymbolTable();
      ast.settablaGlobal(tabla);
      for (let i of ast.getinstrucciones()) {
        if (i instanceof Errores) {
          listaErrores.push(i);
          ast.actualizaConsola((<Errores>i).returnError());
        }

   
        var resultador = i instanceof Instruccion ?  i.interpretar(ast, tabla) : new Errores("Error Semantico","no se puede operar",0,0);
        if (resultador instanceof Errores) {
          listaErrores.push(resultador);
          ast.actualizaConsola((<Errores>resultador).returnError());
        }        
      }
      res.json({ consola: ast.getconsola(), errores: listaErrores, simbolos: [] });
    } catch (err) {
        console.log(err)
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] });
    }
}