export default class Type {
    // declaramos el tipo de dato 
    private tipo: DataType;
    
    // constructor datatype
    constructor(tipo: DataType) {
      this.tipo = tipo;
    }
    // nos retorna el tpo de dato
    public getTipo(): DataType {
      return this.tipo;
    }
    // este nos sirve para ver que estamos operando pal semantico 
    public setTipo(tipo: DataType): void {
      this.tipo = tipo;
    }
}

// contiene todos los tipos de datos
// esto usamos para la tabla de simbolos
export enum DataType {
    ENTERO,
    CADENA,
    IDENTIFICADOR,
    INDEFINIDO
}