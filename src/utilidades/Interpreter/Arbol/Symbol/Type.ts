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

    public obtenerTipoDato(): String {
      let tipo="";
      switch(this.tipo){
        case 0:
          tipo= "Int"
          return tipo;
          case 1:
          tipo= "String"
          return tipo;
          case 2:
          tipo= "Identificador"
          return tipo;
          case 3:
          tipo= "INDEFINIDO"
          return tipo;
          case 4:
          tipo= "BOOLEANO"
          return tipo;
          case 5:
          tipo= "CHAR"
          return tipo;
          case 6:
            tipo= "DECIMAL"
            return tipo;
      }
      return tipo;
    }
}

// contiene todos los tipos de datos
// esto usamos para la tabla de simbolos

export enum DataType {
    ENTERO,
    CADENA,
    IDENTIFICADOR,
    INDEFINIDO,
    BOOLEANO,
    CHAR,
    DECIMAL 
}