"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.listaErrores = void 0;
const Error_1 = __importDefault(require("../../utilidades/Interpreter/Arbol/Exceptions/Error"));
const Three_1 = __importDefault(require("../../utilidades/Interpreter/Arbol/Symbol/Three"));
const SymbolTable_1 = __importDefault(require("../../utilidades/Interpreter/Arbol/Symbol/SymbolTable"));
const Instruccion_1 = require("../../utilidades/Interpreter/Arbol/Abstract/Instruccion");
exports.listaErrores = [];
const parse = (req, res) => {
    exports.listaErrores = new Array();
    let parser = require('../../utilidades/Interpreter/Arbol/analizador');
    const { peticion } = req.body;
    try {
        let ast = new Three_1.default(parser.parse(peticion));
        var tabla = new SymbolTable_1.default();
        ast.settablaGlobal(tabla);
        for (let i of ast.getinstrucciones()) {
            if (i instanceof Error_1.default) {
                exports.listaErrores.push(i);
                ast.actualizaConsola(i.returnError());
            }
            var resultador = i instanceof Instruccion_1.Instruccion ? i.interpretar(ast, tabla) : new Error_1.default("Error Semantico", "no se puede operar", 0, 0);
            if (resultador instanceof Error_1.default) {
                exports.listaErrores.push(resultador);
                ast.actualizaConsola(resultador.returnError());
            }
        }
        res.json({ consola: ast.getconsola(), errores: exports.listaErrores, simbolos: [] });
    }
    catch (err) {
        console.log(err);
        res.json({ consola: '', error: err, errores: exports.listaErrores, simbolos: [] });
    }
};
exports.parse = parse;
