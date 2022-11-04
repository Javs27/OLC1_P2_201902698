import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

export default class llamarFuncion extends Instruccion{
    private identificador :String;
    private parametrosFuncion: Array<Instruccion>
  

    constructor(identificador: String, parametrosFuncion: Array<Instruccion>, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.identificador =identificador;
        this.parametrosFuncion=parametrosFuncion;
        this.linea= linea ;
        this.columna= columna;
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
    }

    // para el arbol
    public ast(arbol: Arbol) {

        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        arbol.agregar_ast(`
        ${nombre_nodo} [label="\\<Instruccion\\>\\n Llamada Funcion"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.identificador}"];
        ${nombre_nodo}2[label="\\<Parametros\\>"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${nombre_nodo}2;
        `)
        
        this.parametrosFuncion.forEach(x => {
            arbol.agregar_ast(`
            ${nombre_nodo}2->${x.ast(arbol)};
            `)
          
        })
    }
}