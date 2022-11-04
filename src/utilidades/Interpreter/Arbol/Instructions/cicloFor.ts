import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';
import cloneDeep from 'lodash/cloneDeep';

export default class cicloFor   extends Instruccion {
    private op: Instruccion;
    private condition: Instruccion;
    private accion: Instruccion;
  

    constructor(
        op: Instruccion, 
        condition: Instruccion, 
        accion: Instruccion, 
        listaInstrucciones: Instruccion, 
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.op = op
        this.condition = condition
        this.accion = accion
      
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
    }

    public ast(arbol: Arbol) {
        
        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        arbol.agregar_ast(`
        ${nombre_nodo}[label="Instruccion\\nFor"];
        ${nombre_nodo}->node_${this.op.linea}_${this.op.columna}_;
        ${nombre_nodo}->${this.condition.ast(arbol)}
        ${nombre_nodo}->node_${this.accion.linea}_${this.accion.columna}_;

        `)
        this.op.ast(arbol);
        this.accion.ast(arbol);
 

    }
}