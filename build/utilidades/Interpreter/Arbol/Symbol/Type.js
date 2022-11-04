"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
class Type {
    // constructor datatype
    constructor(tipo) {
        this.tipo = tipo;
    }
    // nos retorna el tpo de dato
    getTipo() {
        return this.tipo;
    }
    // este nos sirve para ver que estamos operando pal semantico 
    setTipo(tipo) {
        this.tipo = tipo;
    }
    obtenerTipoDato() {
        let tipo = "";
        switch (this.tipo) {
            case 0:
                tipo = "Int";
                return tipo;
            case 1:
                tipo = "String";
                return tipo;
            case 2:
                tipo = "Identificador";
                return tipo;
            case 3:
                tipo = "INDEFINIDO";
                return tipo;
            case 4:
                tipo = "BOOLEANO";
                return tipo;
            case 5:
                tipo = "CHAR";
                return tipo;
            case 6:
                tipo = "DECIMAL";
                return tipo;
        }
        return tipo;
    }
}
exports.default = Type;
// contiene todos los tipos de datos
// esto usamos para la tabla de simbolos
var DataType;
(function (DataType) {
    DataType[DataType["ENTERO"] = 0] = "ENTERO";
    DataType[DataType["CADENA"] = 1] = "CADENA";
    DataType[DataType["IDENTIFICADOR"] = 2] = "IDENTIFICADOR";
    DataType[DataType["INDEFINIDO"] = 3] = "INDEFINIDO";
    DataType[DataType["BOOLEANO"] = 4] = "BOOLEANO";
    DataType[DataType["CHAR"] = 5] = "CHAR";
    DataType[DataType["DECIMAL"] = 6] = "DECIMAL";
})(DataType = exports.DataType || (exports.DataType = {}));
