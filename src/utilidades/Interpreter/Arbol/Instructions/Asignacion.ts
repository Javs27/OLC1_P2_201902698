import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Simbolo from '../Symbol/Symbol';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';


export default class Declaracion extends Instruccion {
    private id: String;
    private valor: Instruccion;

    constructor(id: String, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        tabla.setValor(this.id, new Simbolo(this.valor.tipoDato, this.id, this.valor.interpretar(arbol, tabla)), false);
        return null;
    }

    // para el arbol
    public ast(arbol: Arbol) {
     
        const nombre_nodo =`node_${this.linea}_${this.columna}_`
        arbol.agregar_ast(`
        ${nombre_nodo}[label="\\<Instruccion\\>\\nAsignacion"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.id}"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.valor.ast(arbol)}
        `)

    }
}