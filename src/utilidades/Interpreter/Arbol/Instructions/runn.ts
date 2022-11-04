import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

export default class runn extends Instruccion{
    
    private instruccionesFuncion:Instruccion;

    constructor(instruccionesFuncion:Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
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
        ${nombre_nodo} [label="\\<Instruccion\\>\\n Run"];
        ${nombre_nodo}->node_${this.instruccionesFuncion.linea}_${this.instruccionesFuncion.columna}_;
        `)
        this.instruccionesFuncion.ast(arbol);
        
       
        }
    }
