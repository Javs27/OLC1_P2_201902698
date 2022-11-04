import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

export default class Declaracion extends Instruccion{
    private id:String;
    private tipo:Tipo;
    private valor:Instruccion;

    constructor(id: String, tipo: Tipo, valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.tipo=tipo;
        this.valor=valor;
    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.valor == null){
            //tabla.setValor(this.id, new Simbolo(this.tipo, this.id, 0));
            if(this.tipo.getTipo() == 0){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id, 0));
                return
                
            }else if(this.tipo.getTipo() == 1){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id, ""));
                return
                
            }else if(this.tipo.getTipo() == 4){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id, true));
                return
                
            }else if(this.tipo.getTipo() == 5){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id, ''));
                return
                
            }else if(this.tipo.getTipo() == 6){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id, 0.0));
                return
                
            }
            
            return null
        }
        tabla.setValor(this.id, new Simbolo(this.tipo, this.id, this.valor.interpretar(arbol, tabla)));
        return null
    }

    // para el arbol
    public ast(arbol: Arbol) {

        const nombre_nodo =`node_${this.linea}_${this.columna}_`
        arbol.agregar_ast(`
        ${nombre_nodo}[label="\\<Instruccion\\>\\nDeclaracion"];
        ${nombre_nodo}1[label="\\<Nombre\\>\\n${this.id}"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.valor.ast(arbol)}
        `)

    }
}