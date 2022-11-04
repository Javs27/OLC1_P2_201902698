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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getname = exports.getSimbol = exports.tipoOp = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Symbol_1 = __importDefault(require("../Symbol/Symbol"));
const Type_1 = __importStar(require("../Symbol/Type"));
class Incremento extends Instruccion_1.Instruccion {
    constructor(tipo, id, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.tipo = tipo;
        this.id = id;
    }
    interpretar(arbol, tabla) {
        const value = tabla.getValor(this.id);
        let tipoDato = value.tipo.getTipo();
        let x = value.getvalor();
        if (value && tipoDato == 0) {
            if (this.tipo === tipoOp.INCRE) {
                x = Number(x) + 1;
                tabla.setValor(this.id, new Symbol_1.default(value.tipo, this.id, x - 1));
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return x;
            }
            else if (this.tipo === tipoOp.DECRE) {
                x = Number(x) - 1;
                tabla.setValor(this.id, new Symbol_1.default(value.tipo, this.id, x + 1));
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return x;
            }
        }
        return null;
    }
    // para el arbol
    ast(arbol) {
        const nombre_nodo = `node_${this.linea}_${this.columna}_`;
        return `
        /**/${nombre_nodo}1;
        ${nombre_nodo}1[label="${this.id}"];
        ${nombre_nodo}[label="${getSimbol(this.tipo)}"];
        ${nombre_nodo}1->${nombre_nodo};`;
    }
}
exports.default = Incremento;
var tipoOp;
(function (tipoOp) {
    tipoOp[tipoOp["INCRE"] = 0] = "INCRE";
    tipoOp[tipoOp["DECRE"] = 1] = "DECRE";
})(tipoOp = exports.tipoOp || (exports.tipoOp = {}));
function getSimbol(objeto) {
    switch (objeto) {
        case 0:
            return "++";
        case 1:
            return "--";
        default:
            return "";
    }
}
exports.getSimbol = getSimbol;
function getname(objeto) {
    switch (objeto) {
        case 0:
            return "INCREMENTO";
        case 1:
            return "DECREMENTO";
        default:
            return "";
    }
}
exports.getname = getname;
