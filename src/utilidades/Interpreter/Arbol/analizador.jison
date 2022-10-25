%{
    //codigo js
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Symbol/Type');
    const impresion = require('./Instructions/imprimir');
    const declaracion = require('./Instructions/Declaracion');
    const controller = require('../../../controller/parser/parser')
    const errores = require('./Exceptions/Error')
    const aritmetico=require('./Expresions/Aritmetica');
  
%}
%lex 


%options case-insensitive 
//inicio analisis lexico
%%
"imprimir"      return 'RESPRINT';

"entero" return 'RESINT';
'cadena' return 'RESSTRING';
"=" return 'IGUAL';
"+" return 'MAS';
"*" return 'MULTIPLICACION';
[0-9]+ return 'ENTERO';
[a-zA-Z]+["_"0-9A-Za-z]* return 'IDENTIFICADOR';

";"             return 'PTCOMA';
"("             return 'PARABRE';
")"             return 'PARCIERRA';

[ \r\t]+ { }
\n {}
\"[^\"]*\"                  { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }


<<EOF>>                     return 'EOF';
.                           return 'INVALID'

/lex
%left 'MAS'


%start INIT
//Inicio
//Definicion de gramatica

%left 'SUMA'
%left 'MULTIPLICACION'
%%

INIT: INSTRUCCIONES EOF     {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$1.push($2); $$=$1;}
              | INSTRUCCION               {$$=[$1];}
;

INSTRUCCION : IMPRIMIR              {$$=$1;}
            |DECLARACION            {$$=$1}
            | INVALID               {controller.listaErrores.push(new errores.default('Error lexico', $1,@1.first_line, @1.first_column));}
            | error  PTCOMA         {controller.listaErrores.push(new errores.default('Error sintactico','Se esperaba token ',@1.first_line, @1.first_column));}
;
DECLARACION :
    RESINT IDENTIFICADOR IGUAL EXPRESION PTCOMA {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.ENTERO), $4, @1.first_line, @1.first_column );}
    |RESSTRING IDENTIFICADOR IGUAL EXPRESION PTCOMA {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.CADENA), $4, @1.first_line, @1.first_column );}
;

IMPRIMIR : RESPRINT PARABRE EXPRESION PARCIERRA PTCOMA {$$=new impresion.default($3,@1.first_line,@1.first_column);}
;

EXPRESION :
        EXPRESION MAS EXPRESION {$$ = new aritmetico.default(aritmetico.tipoOp.SUMA, $1, $3, @1.first_line, @1.first_column)}
        | ENTERO                {$$= new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);}
        | IDENTIFICADOR         {$$= new nativo.default(new Tipo.default(Tipo.DataType.IDENTIFICADOR),$1, @1.first_line, @1.first_column);}
        | CADENA                {$$= new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
;