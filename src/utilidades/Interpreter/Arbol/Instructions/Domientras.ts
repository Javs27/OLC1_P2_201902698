import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import SymbolTable from '../Symbol/SymbolTable';

export default class DoMientras extends Instruccion {
    private operacion: Instruccion;
    private listaInstrucciones: Instruccion ;    

    constructor(
        operacion: Instruccion, 
        listaInstrucciones: Instruccion, 
        linea: number, 
        columna: number
    ){
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.operacion = operacion
        this.listaInstrucciones = listaInstrucciones
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let aux 

       
        do{const tablaLocal = new SymbolTable(tabla)
            
            this.listaInstrucciones.interpretar(arbol,tabla)
           
            aux = this.operacion.interpretar(arbol,tabla)
        }while(aux )
        return null;
    }
    
    public ast(arbol: Arbol) {
            
        const name_node = `node_${this.linea}_${this.columna}_`
        arbol.agregar_ast(`
        ${name_node}[label="\\<Instruccion\\>\\nDoWhile"];
        ${name_node}1[label="\\<Condicion\\>"];
        ${name_node}->${name_node}1;
        ${name_node}1->${this.operacion.ast(arbol)}
        ${name_node}->node_${this.listaInstrucciones.linea}_${this.listaInstrucciones.columna}_;
        `)
        this.listaInstrucciones.ast(arbol)

    }
}

