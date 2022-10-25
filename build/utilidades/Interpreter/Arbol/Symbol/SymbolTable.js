"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SymbolTable {
    constructor(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
    }
    getValor(id) {
        let valor = this.tablaActual.get(id);
        return valor;
    }
    setValor(id, valor) {
        var _a;
        this.tablaActual.set(id, valor);
        console.log(id + "=" + ((_a = this.tablaActual.get(id)) === null || _a === void 0 ? void 0 : _a.getvalor()));
        return null;
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    setAnterior(anterior) {
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(Tabla) {
        this.tablaActual = Tabla;
    }
}
exports.default = SymbolTable;
