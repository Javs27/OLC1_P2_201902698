import { Instruccion } from '../Abstract/Instruccion';
import Errores from '../Exceptions/Error';
import Operacion from '../Expresions/Native';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';

export default class Imprimir extends Instruccion {
  private expresion: Instruccion;

  constructor(expresion: Instruccion, linea: number, columna: number) {
    super(new Type(DataType.INDEFINIDO), linea, columna);
    this.expresion = expresion;
  }

  public interpretar(arbol: Three, tabla: SymbolTable) {
    let valor = this.expresion.interpretar(arbol, tabla);
    if (valor instanceof Errores) return valor;
    arbol.actualizaConsola(valor + '');
  }

  public ast(arbol: Three) {
    
    const nombreNodo = `node_${this.linea}_${this.columna}_`
    arbol.agregar_ast(`
    ${nombreNodo}[label="\\<Instruccion\\>\\nImprimir"];`)
    if (this.expresion!= null){arbol.agregar_ast(`${nombreNodo}->${this.expresion.ast(arbol)}`)}
}
}