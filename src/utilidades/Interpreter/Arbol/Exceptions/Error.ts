export default class Error {
    private tipoError: String;
    private desc: String;
    private fila: number;
    private columna: number;
    public getDesc(): String {
      return this.desc;
    }
    public getTipoError(): String {
      return this.tipoError;
    }
    public getcolumna(): number {
      return this.columna;
    }
    public getFila(): number {
      return this.fila;
    }
    constructor(tipo: String, desc: String, fila: number, columna: number) {
      this.tipoError = tipo;
      this.desc = desc;
      this.fila = fila;
      this.columna = columna;
    }

    // retornamos la cadena de los errores que se obtienen 
    public returnError(): String {
      return (
        'Se obtuvo: ' +
        this.tipoError +
        ' desc:{' +
        this.desc +
        '} en la fila: ' +
        this.fila +
        ' en la columna: ' +
        this.columna +
        '\n'
      );
    
    }
    // para retornar fila para tabla de errores
    public FilaErores(): String{
      return(// generamos lineas en el html
      '<tr>'+
      '<td>' + this.tipoError + '</td>\n'+
      '<td>' + this.desc      +  '</td>\n'+
      '<td>' + this.fila      +  '</td>\n'+
      '<td>' + this.columna      +  '</td>\n'+
      '</tr>'
      );
    }
  }