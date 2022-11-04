"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SymbolTable_1 = __importDefault(require("./SymbolTable"));
class Three {
    // iniciamos el arbol dentro del array podemos meter cualqueir cosa
    constructor(instrucciones) {
        //guardar las cosas del ast
        this.ast = "";
        this.instrucciones = instrucciones;
        this.consola = '';
        this.tablaGlobal = new SymbolTable_1.default();
        this.errores = new Array();
    }
    //obtenemos consola
    getconsola() {
        return this.consola;
    }
    //seteamos consola
    setconsola(value) {
        this.consola = value;
    }
    //actualizamos la consola 
    actualizaConsola(uptodate) {
        this.consola = `${this.consola}${uptodate}\n`;
    }
    //retornamos un arreglo de instrucciones
    getinstrucciones() {
        return this.instrucciones;
    }
    setinstrucciones(value) {
        this.instrucciones = value;
    }
    getErrores() {
        return this.errores;
    }
    seterrores(value) {
        this.errores = value;
    }
    gettablaGlobal() {
        return this.tablaGlobal;
    }
    settablaGlobal(value) {
        this.tablaGlobal = value;
    }
    // para el arbol
    agregar_ast(data) {
        this.ast += data;
    }
    get_ast() {
        return this.ast;
    }
    createTableSymbols() {
        var TableHTML = '<table style="border-collapse: collapse; width: 100%;" border="1">' +
            '<tbody>' +
            '<tr>' +
            '<td style="text-align: center;"><strong>Nombre variable</strong></td>' +
            '<td style="text-align: center;"><strong>Tipo Variable</strong></td>' +
            '<td style="text-align: center;"><strong>Valor </strong></td>' +
            '</tr>';
        let a = this.tablaGlobal.getTabla();
        for (let auxiliar of a) {
            let name = auxiliar[0];
            let valor = auxiliar[1].getvalor();
            let tipo = auxiliar[1].tipo.obtenerTipoDato();
            TableHTML += '<tr>' +
                '<td>' + name + '</td>\n' +
                '<td>' + tipo + '</td>\n' +
                '<td>' + valor + '</td>\n' +
                '</tr>';
        }
        TableHTML += '</tbody>' +
            '</table>';
        return TableHTML;
    }
}
exports.default = Three;
