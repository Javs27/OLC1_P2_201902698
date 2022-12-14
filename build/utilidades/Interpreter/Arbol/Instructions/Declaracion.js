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
const Instruccion_1 = require("../Abstract/Instruccion");
const Symbol_1 = __importDefault(require("../Symbol/Symbol"));
const Type_1 = __importStar(require("../Symbol/Type"));
class Declaracion extends Instruccion_1.Instruccion {
    constructor(id, tipo, valor, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.valor == null) {
            //tabla.setValor(this.id, new Simbolo(this.tipo, this.id, 0));
            if (this.tipo.getTipo() == 0) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, 0));
                return;
            }
            else if (this.tipo.getTipo() == 1) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, ""));
                return;
            }
            else if (this.tipo.getTipo() == 4) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, true));
                return;
            }
            else if (this.tipo.getTipo() == 5) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, ''));
                return;
            }
            else if (this.tipo.getTipo() == 6) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, 0.0));
                return;
            }
            return null;
        }
        tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, this.valor.interpretar(arbol, tabla)));
        return null;
    }
    // para el arbol
    ast(arbol) {
        const nombre_nodo = `node_${this.linea}_${this.columna}_`;
        arbol.agregar_ast(`
        ${nombre_nodo}[label="\\<Instruccion\\>\\nDeclaracion"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.id}"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.valor.ast(arbol)}
        `);
    }
}
exports.default = Declaracion;
