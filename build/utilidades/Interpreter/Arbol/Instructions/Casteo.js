"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Casteo extends Instruccion_1.Instruccion {
    constructor(tipoDato, identificador, valor, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.tipoDato = tipoDato;
        this.identificador = identificador;
        this.valor = valor;
        this.columna = columna;
        this.linea;
    }
    interpretar(arbol, tabla) {
    }
    ast(arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`;
        arbol.agregar_ast(`
        ${nombreNodo}[label="Instruccion\\nCasteo"];
        ${nombreNodo}2[label="Tipo\\n${this.tipoDato.obtenerTipoDato()}"];
        ${nombreNodo}1[label="Nombre\\n${this.identificador}"];
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${nombreNodo}1
        ${nombreNodo}->${this.valor.ast(arbol)}`);
    }
}
exports.default = Casteo;