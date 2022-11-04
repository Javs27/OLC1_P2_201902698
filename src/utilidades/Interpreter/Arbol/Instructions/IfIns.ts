import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';

export default class If extends Instruccion {

    private operacionIf: Instruccion;
    // arreglo para las instrucciones
    private listaInstrucciones: Instruccion; 
    // arreglo instrucciones del if 
    private listaElseIf: Instruccion  | undefined;
    //arreglo para las instrucciones del else
    //private listaInsElse: Instruccion | undefined;


    constructor(
        operacion: Instruccion, 
        listaInstrucciones: Instruccion, 
        listaElseIf: Instruccion| undefined, 
        //listaInsElse: Instruccion | undefined,
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacionIf = operacion
        this.listaInstrucciones = listaInstrucciones
        this.listaElseIf = listaElseIf
        //this.listaInsElse = listaInsElse
    }

    
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const condition = this.operacionIf.interpretar(arbol, tabla)
        if((condition)){
            const tablaLocal = new SymbolTable(tabla)
            this.listaInstrucciones.interpretar(arbol,tabla)
            return true
        }else{
            if(this.listaElseIf){
                this.listaElseIf?.interpretar(arbol,tabla)
            }
        }
    }


    // para el arbol 
    public ast(arbol:Arbol) {
    
        const name_node = `node_${this.linea}_${this.columna}_`
        arbol.agregar_ast(`
        ${name_node}[label="\\<Instruccion\\>\\nif"];
        ${name_node}1[label="\\<True\\>"];
        ${name_node}2[label="\\<Else\\>"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}1->node_${this.listaInstrucciones.linea}_${this.listaInstrucciones.columna}_;`)
        this.listaInstrucciones.ast(arbol)
        if (this.listaElseIf != null) {
            arbol.agregar_ast(`${name_node}2->node_${this.listaElseIf.linea}_${this.listaElseIf.columna}_`)
            this.listaElseIf.ast(arbol)
        }
}
}