"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error {
    constructor(tipo, desc, fila, columna) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.columna = columna;
    }
    getDesc() {
        return this.desc;
    }
    getTipoError() {
        return this.tipoError;
    }
    getcolumna() {
        return this.columna;
    }
    getFila() {
        return this.fila;
    }
    // retornamos la cadena de los errores que se obtienen 
    returnError() {
        return ('Se obtuvo: ' +
            this.tipoError +
            ' desc:{' +
            this.desc +
            '} en la fila: ' +
            this.fila +
            ' en la columna: ' +
            this.columna +
            '\n');
    }
    // para retornar fila para tabla de errores
    FilaErores() {
        return ( // generamos lineas en el html
        '<tr>' +
            '<td>' + this.tipoError + '</td>\n' +
            '<td>' + this.desc + '</td>\n' +
            '<td>' + this.fila + '</td>\n' +
            '<td>' + this.columna + '</td>\n' +
            '</tr>');
    }
}
exports.default = Error;
