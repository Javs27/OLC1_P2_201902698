import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, { DataType } from "../Symbol/Type";

export default class Casteo  extends Instruccion{

    public tipoDato: Tipo;
    public identificador: String;
    public valor: Instruccion;


    constructor(tipoDato: Tipo, identificador: String, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.tipoDato = tipoDato;
        this.identificador = identificador;
        this.valor = valor;
        this.columna = columna;
        this.linea;


    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    }


    public ast(arbol: Arbol) {
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
