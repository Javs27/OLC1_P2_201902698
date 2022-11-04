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
class Funciones extends Instruccion_1.Instruccion {
    constructor(identificador, parametrosFuncion, instruccionesFuncion, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.identificador = identificador;
        this.parametrosFuncion = parametrosFuncion;
        this.instruccionesFuncion = instruccionesFuncion;
        this.linea = linea;
        this.columna = columna;
    }
    interpretar(arbol, tabla) {
    }
    // para el arbol
    ast(arbol) {
        const nombre_nodo = `node_${this.linea}_${this.columna}_`;
        arbol.agregar_ast(`
        ${nombre_nodo} [label="\\<Instruccion\\>\\nFuncion"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.identificador}"];
        ${nombre_nodo}2[label="\\<Parametros\\>"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${nombre_nodo}2;
        ${nombre_nodo}->node_${this.instruccionesFuncion.linea}_${this.instruccionesFuncion.columna}_;
        `);
        this.instruccionesFuncion.ast(arbol);
        let tmp = 3; //empiezo desde 5 porque ya esta ocupado 1 y 2
        this.parametrosFuncion.forEach(x => {
            arbol.agregar_ast(`
            ${nombre_nodo}${tmp}[label="\\<Nombre,Tipo\\>\\n${x}"];
            ${nombre_nodo}2->${nombre_nodo}${tmp};
            `);
            tmp++;
        });
    }
}
exports.default = Funciones;
