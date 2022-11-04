import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import Symbol from '../Symbol/Symbol';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import exp from 'constants';
import { conformsTo } from 'lodash';
import controller from '../../../../controller/api.controller';


export default class Incremento extends Instruccion {
    id: String;
    tipo: tipoOp;

    constructor(tipo: tipoOp, id:String , linea: number, columna: number) {
        super(new Tipo(DataType.INDEFINIDO), linea, columna);
        this.tipo = tipo
        this.id = id;
    }

    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
       const value= tabla.getValor(this.id);
        let tipoDato= value.tipo.getTipo();
        let x=value.getvalor();

        if(value && tipoDato==0){
            if(this.tipo===tipoOp.INCRE){
                x=Number(x)+1;
                tabla.setValor(this.id, new Symbol(value.tipo, this.id, x-1));
    
                this.tipoDato.setTipo(DataType.ENTERO);
                return x;
            }
            else if(this.tipo===tipoOp.DECRE){
                x=Number(x)-1;
                tabla.setValor(this.id, new Symbol(value.tipo, this.id, x+1));
    
                this.tipoDato.setTipo(DataType.ENTERO);
                return x;
            }
                
        }
        
        return null;
    }

    // para el arbol
    public ast(arbol: Arbol) {
     
        const nombre_nodo =`node_${this.linea}_${this.columna}_`
        return`
        /**/${nombre_nodo}1;
        ${nombre_nodo}1[label="${this.id}"];
        ${nombre_nodo}[label="${getSimbol(this.tipo)}"];
        ${nombre_nodo}1->${nombre_nodo};`

    }
}


export enum tipoOp{
    INCRE , 
    DECRE 
}

export function getSimbol(objeto:tipoOp): string{
    switch(objeto){
        case 0:
            return "++"
        case 1:
            return "--"
        default:
            return""
        }
}

export function getname(objeto: tipoOp): string{
    switch(objeto){
        case 0:
            return "INCREMENTO"
        case 1:
            return "DECREMENTO"
        default:
            return""
        }

}