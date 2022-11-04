import { entries } from 'lodash';
import { Instruccion } from '../Abstract/Instruccion';
import Errores from '../Exceptions/Error';
import tablaSimbolo from './SymbolTable';

export default class Three {
    // enviamos lista de instrucciones
  private instrucciones: Array<Instruccion>;
  private errores: Array<Errores>;
    // enviamos a consola 
  private consola: String;
  private tablaGlobal: tablaSimbolo;



  // iniciamos el arbol dentro del array podemos meter cualqueir cosa
  constructor(instrucciones: Array<Instruccion>) {
    this.instrucciones = instrucciones;
    this.consola = '';
    this.tablaGlobal = new tablaSimbolo();
    this.errores = new Array<Errores>();
  }
  //obtenemos consola
  public getconsola(): String {
    return this.consola;
  }
  //seteamos consola
  public setconsola(value: String) {
    this.consola = value;
  }
  //actualizamos la consola 
  public actualizaConsola(uptodate: String) {
    this.consola = `${this.consola}${uptodate}\n`;
  }
  //retornamos un arreglo de instrucciones
  public getinstrucciones(): Array<Instruccion> {
    return this.instrucciones;
  }
  public setinstrucciones(value: Array<Instruccion>) {
    this.instrucciones = value;
  }
  public getErrores(): Array<Errores> {
    return this.errores;
  }

  public seterrores(value: Array<Errores>) {
    this.errores = value;
  }
  public gettablaGlobal(): tablaSimbolo {
    return this.tablaGlobal;
  }
  public settablaGlobal(value: tablaSimbolo) {
    this.tablaGlobal = value;
  }

  
  //guardar las cosas del ast
  private ast: string =""
  // para el arbol
  public agregar_ast(data: string){
    this.ast += data
  }

  public get_ast(): string{
    return this.ast
  }

  public createTableSymbols() {

    var TableHTML = '<table style="border-collapse: collapse; width: 100%;" border="1">' +
    '<tbody>' +
    '<tr>' +
    '<td style="text-align: center;"><strong>Nombre variable</strong></td>' +
    '<td style="text-align: center;"><strong>Tipo Variable</strong></td>' +
    '<td style="text-align: center;"><strong>Valor </strong></td>' +
    '</tr>';

    let a = this.tablaGlobal.getTabla()

    for(let auxiliar of a){
      let name = auxiliar[0];
      let valor = auxiliar[1].getvalor();
      let tipo= auxiliar[1].tipo.obtenerTipoDato()
      TableHTML += '<tr>'+
                    '<td>' + name + '</td>\n'+
                    '<td>' +  tipo + '</td>\n'+
                    '<td>' +  valor+ '</td>\n'+
                    '</tr>'
                
    }
    TableHTML += '</tbody>'+
    '</table>';
    return TableHTML;

  }


}