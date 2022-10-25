import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';


export default class Aritmetico extends Instruccion{
    operacionIzquierda: Instruccion;
    operacionDerecha: Instruccion;
    tipo: tipoOp;

    constructor(tipo: tipoOp, opIzq:Instruccion, opDer:Instruccion, fila:number, columna:number){
        super(new Tipo(DataType.INDEFINIDO),fila,columna);
        this.tipo=tipo;
        this.operacionIzquierda=opIzq;
        this.operacionDerecha=opDer;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.tipo===tipoOp.SUMA){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);

            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)+Number(valueDer));
                }
            else if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                    if(this.operacionDerecha.tipoDato.getTipo()===DataType.CADENA){
                        this.tipoDato.setTipo(DataType.CADENA);
                        return (valueIzq.toString()+valueDer.toString());
                    }
                }
            }
        }
       
        else if(this.tipo===tipoOp.MULTIPLICACION){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);

            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)*Number(valueDer));
                }
            }
        }
        return null;
    }
}
export enum tipoOp{
    SUMA,
    RESTA,
    DIVISION,
    MULTIPLICACION 
}