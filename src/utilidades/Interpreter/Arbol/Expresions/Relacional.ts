import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

export default class Relacional extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;
  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
  }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const validTypesOperations = [DataType.ENTERO, DataType.DECIMAL]
        /*console.log("asdfasdfasd")
        console.log("asdfasdfasd")
        console.log("asdfasdfasd")
        console.log("asdfasdfasd")
        console.log("asdfasdfasd")
        console.log("asdfasdfasd")

        console.log(this.tipo)*/
        let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
        let valueDer = this.operacionDer.interpretar(arbol, tabla);
        if(validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
            if(this.tipo===tipoOp.MAYOR){        
                this.tipoDato = new Tipo(DataType.BOOLEANO);
                    return Number(valueIzq) > Number (valueDer);

            }else if(this.tipo===tipoOp.MENOR){        
                this.tipoDato = new Tipo(DataType.BOOLEANO);
                    return Number(valueIzq) < Number (valueDer);

            }else if(this.tipo === tipoOp.MAYOR_IGUAL){         
                this.tipoDato = new Tipo(DataType.BOOLEANO);
                    return Number(valueIzq) >= Number (valueDer);
                    

            }else if(this.tipo===tipoOp.MENOR_IGUAL){        
                this.tipoDato = new Tipo(DataType.BOOLEANO);
                    return Number(valueIzq) <= Number (valueDer);

                
            }else if(this.tipo===tipoOp.DIFERENTE){        
                this.tipoDato = new Tipo(DataType.BOOLEANO);
                    return Number(valueIzq) != Number (valueDer);
            }else if(this.tipo===tipoOp.IGUAL_IGUAL){        
                this.tipoDato = new Tipo(DataType.BOOLEANO);
                    return Number(valueIzq) == Number (valueDer);
            }
        }  else {
            return null;
        }   
    } 
    
    // para el arbol 
    public ast(arbol: Arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${get_simbolo(this.tipo)}"];
        ${nombreNodo}->${this.operacionIzq.ast(arbol)}
        ${nombreNodo}->${this.operacionDer.ast(arbol)}
        `
    }
}

export enum tipoOp{
    MAYOR,
    MENOR,
    MENOR_IGUAL,
    MAYOR_IGUAL,
    IGUAL_IGUAL,
    DIFERENTE
}


export function get_simbolo(objeto: tipoOp): string{
    switch(objeto){
        case 0:
            return "MAYOR"
        case 1:
            return "MENOR"
        case 2:
            return "MENOR_IGUAL"
        case 3:
            return "MAYOR_IGUAL"
        case 4:
                return "IGUAL_IGUAL"
        case 5:
                return "DIFERENTE"
        default:
            return ""
    }
}