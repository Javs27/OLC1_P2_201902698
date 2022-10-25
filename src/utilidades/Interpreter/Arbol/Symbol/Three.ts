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
}