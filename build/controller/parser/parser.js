"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.listaErrores = void 0;
const Three_1 = __importDefault(require("../../utilidades/Interpreter/Arbol/Symbol/Three"));
const SymbolTable_1 = __importDefault(require("../../utilidades/Interpreter/Arbol/Symbol/SymbolTable"));
exports.listaErrores = [];
const parse = (req, res) => {
    exports.listaErrores = new Array();
    let parser = require('../../utilidades/Interpreter/Arbol/analizador');
    const { peticion } = req.body;
    try {
        let ast = new Three_1.default(parser.parse(peticion));
        var tabla = new SymbolTable_1.default();
        ast.settablaGlobal(tabla);
        // para el arbol 
        ast.agregar_ast(`nodeOriginal[label="<\\Lista_Instrucciones\\>"];`);
        //generar el ast primero
        for (const instr of ast.getinstrucciones()) {
            try {
                instr.ast(ast);
                ast.agregar_ast(`nodeOriginal->node_${instr.linea}_${instr.columna}_;`);
            }
            catch (error) {
            }
        }
        let graficarAST = ("digraph G {\nnode[shape=box];" + ast.get_ast() + "\n}");
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
        console.log(TableHTML);
        //console.log(TableHTML)
        // ENVIARMOS LA VARIBLE: Y DESPUES SE ENVIA EL CONTENIDO 
        res.json({ consola: ast.getconsola(), errores: exports.listaErrores, simbolos: [], ErroresHTML: TableHTML, tablaSimbolos: TableSymbols, ArbolGraficado: graficarAST });
    }
    catch (err) {
        console.log(err);
        res.json({ consola: '', error: err, errores: exports.listaErrores, simbolos: [] });
    }
};
exports.parse = parse;
function TablaErrores() {
    var TableHTML = '<table style="border-collapse: collapse; width: 100%;" border="1">' +
        '<tbody>' +
        '<tr>' +
        '<td style="text-align: center;"><strong>TIPO DE ERROR</strong></td>' +
        '<td style="text-align: center;"><strong>DESCRIPCION</strong></td>' +
        '<td style="text-align: center;"><strong>FILA</strong></td>' +
        '<td style="text-align: center;"><strong>COLUMNA</strong></td>' +
        '</tr>';
    for (let error in exports.listaErrores) {
        TableHTML += (exports.listaErrores[error].FilaErores());
    }
    TableHTML += '</tbody>' + '</table>';
    return TableHTML;
}
