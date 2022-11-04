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
exports.get_simbolo = exports.tipoOp = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Relacional extends Instruccion_1.Instruccion {
    constructor(tipo, opIzq, opDer, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.operacionIzq = opIzq;
        this.operacionDer = opDer;
    }
    interpretar(arbol, tabla) {
        const validTypesOperations = [Type_1.DataType.ENTERO, Type_1.DataType.DECIMAL];
        /*console.log("asdfasdfasd")
        console.log("asdfasdfasd")
        console.log("asdfasdfasd")
        console.log("asdfasdfasd")
        console.log("asdfasdfasd")
        console.log("asdfasdfasd")

        console.log(this.tipo)*/
        let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
        let valueDer = this.operacionDer.interpretar(arbol, tabla);
        if (validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
            if (this.tipo === tipoOp.MAYOR) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return Number(valueIzq) > Number(valueDer);
            }
            else if (this.tipo === tipoOp.MENOR) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return Number(valueIzq) < Number(valueDer);
            }
            else if (this.tipo === tipoOp.MAYOR_IGUAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return Number(valueIzq) >= Number(valueDer);
            }
            else if (this.tipo === tipoOp.MENOR_IGUAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return Number(valueIzq) <= Number(valueDer);
            }
            else if (this.tipo === tipoOp.DIFERENTE) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return Number(valueIzq) != Number(valueDer);
            }
            else if (this.tipo === tipoOp.IGUAL_IGUAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEANO);
                return Number(valueIzq) == Number(valueDer);
            }
        }
        else {
            return null;
        }
    }
    // para el arbol 
    ast(arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`;
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${get_simbolo(this.tipo)}"];
        ${nombreNodo}->${this.operacionIzq.ast(arbol)}
        ${nombreNodo}->${this.operacionDer.ast(arbol)}
        `;
    }
}
exports.default = Relacional;
var tipoOp;
(function (tipoOp) {
    tipoOp[tipoOp["MAYOR"] = 0] = "MAYOR";
    tipoOp[tipoOp["MENOR"] = 1] = "MENOR";
    tipoOp[tipoOp["MENOR_IGUAL"] = 2] = "MENOR_IGUAL";
    tipoOp[tipoOp["MAYOR_IGUAL"] = 3] = "MAYOR_IGUAL";
    tipoOp[tipoOp["IGUAL_IGUAL"] = 4] = "IGUAL_IGUAL";
    tipoOp[tipoOp["DIFERENTE"] = 5] = "DIFERENTE";
})(tipoOp = exports.tipoOp || (exports.tipoOp = {}));
function get_simbolo(objeto) {
    switch (objeto) {
        case 0:
            return "MAYOR";
        case 1:
            return "MENOR";
        case 2:
            return "MENOR_IGUAL";
        case 3:
            return "MAYOR_IGUAL";
        case 4:
            return "IGUAL_IGUAL";
        case 5:
            return "DIFERENTE";
        default:
            return "";
    }
}
exports.get_simbolo = get_simbolo;
