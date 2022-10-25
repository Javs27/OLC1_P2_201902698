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
})(DataType = exports.DataType || (exports.DataType = {}));
