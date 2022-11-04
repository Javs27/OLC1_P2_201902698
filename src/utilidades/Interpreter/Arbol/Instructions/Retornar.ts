import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

export default class Retornar extends Instruccion{
    private accion :Instruccion;
   

    constructor(accion: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.accion =accion;
        this.linea= linea ;
        this.columna= columna;
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
    }

    // para el arbol
    public ast(arbol: Arbol) {

        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        if(this.accion){
            arbol.agregar_ast(`
                ${nombre_nodo};
                ${nombre_nodo} [label="Instruccion\\nReturn"];
                ${nombre_nodo}1[label="Return"];
                ${nombre_nodo}-> ${nombre_nodo}1;
                ${nombre_nodo}->${this.accion.ast(arbol)}
                `)
                return  
        }
        }
    }
