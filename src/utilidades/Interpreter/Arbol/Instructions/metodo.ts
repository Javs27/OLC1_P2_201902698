import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

export default class metodo extends Instruccion{
    private identificador :String;
    private parametrosFuncion: Array<String>
    private instruccionesFuncion:Instruccion;

    constructor(identificador: String, parametrosFuncion: Array<String>, instruccionesFuncion:Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.identificador =identificador;
        this.parametrosFuncion=parametrosFuncion;
        this.instruccionesFuncion=instruccionesFuncion;
        this.linea= linea ;
        this.columna= columna;
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
    }

    // para el arbol
    public ast(arbol: Arbol) {

        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        arbol.agregar_ast(`
        ${nombre_nodo} [label="\\<Instruccion\\>\\n Metodo"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.identificador}"];
        ${nombre_nodo}2[label="\\<Parametros\\>"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${nombre_nodo}2;
        ${nombre_nodo}->node_${this.instruccionesFuncion.linea}_${this.instruccionesFuncion.columna}_;
        `)
        this.instruccionesFuncion.ast(arbol);
        
        let tmp = 3 //empiezo desde 5 porque ya esta ocupado 1 y 2
        this.parametrosFuncion.forEach(x => {
            arbol.agregar_ast(`
            ${nombre_nodo}${tmp}[label="\\<Nombre,Tipo\\>\\n${x}"];
            ${nombre_nodo}2->${nombre_nodo}${tmp};
            `)
            tmp++
        })
    }
}