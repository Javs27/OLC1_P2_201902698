

%{

    // variables globales, JS
    var flag=0;
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Symbol/Type');
    const impresion = require('./Instructions/imprimir');
    const declaracion = require('./Instructions/Declaracion');
    const controller = require('../../../controller/parser/parser');
    const errores = require('./Exceptions/Error');
    const aritmetico = require('./Expresions/Aritmetica');
    const relacional = require('./Expresions/Relacional');
    const logica = require('./Expresions/Logica');
    const ifIns = require('./Instructions/IfIns'); 
    const mientras = require('./Instructions/Mientras');
    const asignacion = require('./Instructions/Asignacion');
    const newInstructions = require('./Instructions/NewInstructions');
    const doWhile  = require('./Instructions/Mientras');
    const doUntil  = require('./Instructions/doUntil');
    const casteos    = require('./Instructions/Casteo');
    const cicloFor = require('./Instructions/cicloFor');
    const incremento =  require('./Instructions/incremento');
    const vector1  =  require('./Instructions/VectorTipo1');
    const Funciones  =  require('./Instructions/Funciones');
    const Metodo    =  require('./Instructions/metodo');
    const llamada     =  require('./Instructions/llamarFuncion');
    const retornar     =  require('./Instructions/Retornar');
        const Continuar     =  require('./Instructions/Continuar');
        const Run = require('./Instructions/runn');
        const Break = require('./Instructions/breakk');
%}

%lex

%options case-insensitive

%%

// para eliminar espacios en blanco y comentarios 
[ \r\t\n\f]+  {/*estos  se omiten*/}
\n  {/*estos  se omiten*/}
"//".*     {/*estos  se omiten*/}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {/*estos  se omiten*/}

//simbolos y palabras reservadas 


","     return 'coma';
"."     return 'punto';
":"     return 'dosPuntos';
";"     return 'puntoComa';
"{"     return 'llaveA';
"}"     return 'llaveC';
"["     return 'corcheteA';
"]"     return 'corcheteC';
"("     return 'parentA';
")"     return 'parentC';

'>='    return 'mayorIgual';
'<='    return 'menorIgual';
"<"     return 'menor';
">"     return 'mayor';
"!="    return 'diferente';
"=="    return 'igualigual';
"="     return 'igual';
"++"    return 'incremento';
"+"     return 'suma';
//"%"     return 'modulo';

"--"    return 'decremento';
"-"     return 'resta';
"/"     return 'division';
"*"     return  'multiplicacion';

"||"    return 'operadorOr';
"&&"    return  'operadorAnd';
"!"     return  'operadorNot';


// palabras reservadas




'int'     return 'Int';
"double"  return 'Double';
"boolean" return 'Boolean';
"char"    return  'Char';
"string"  return  'String';
"void"    return  'Void';


"false"   return 'falso';
"true"    return 'verdadero';
"new"     return 'New';

"if"      return  'if';
"else"    return  'else';
"switch"  return   'switch';
"case"    return 'case';
"elif"    return 'elif';
"while"   return 'While';
"for"     return  'for';
"do"      return 'do';
"until"   return 'until';
"break"   return 'break';
"continue" return 'continue';
"return"   return 'Return';
"LLAMADA"   return 'Llamada';
"PARAMETROS_LLAMADA" return 'LlaamadaPar';
"print"     return 'print';
"println"   return 'println';
"toLower"   return 'toLower';
"toUpper"   return 'toUpper';
"round"     return 'round';
"length"    return 'length';
"typeof"    return 'typeof';
"toString"  return  'ToString';
"toCharArray" return 'toCharArray';
"push"      return 'Push';
"pop"       return 'Pop'
"run"       return 'Run';
"Default"   return 'default';

\'.{1}\'      {yytext=yytext.substr(1,yyleng-2); return 'Caracter';} 
[0-9]+("."[0-9]+)?\b    return 'Numero';
\"(.+)*\"                {yytext=yytext.substr(1,yyleng-2); return 'Cadena';} 

[a-zA-Z0-9_]+            return 'Identificador';


// token end of file 
<<EOF>> return 'EOF';

. return 'INVALID';  //{console.log("Este es un error lexico" + yytext)}

// aca termina el analisis lexico 
/lex

// precedencia de datos 
%left 'suma' 'resta' 
%left 'division' 'multiplicacion'
%left  'decremento' 'incremento'
%left 'mayor' 'menor' 'menorIgual' 'mayorIgual' 


//Analisis sintactico

%start INICIAR 

%%

// GRAMATICAS 
INICIAR : ACCIONES EOF {return $1;}

;


ACCIONES : ACCIONES ACCION {$1.push($2); $$=$1;}
        | ACCION            {$$=[$1];}
;

ACCION:
        CICLO_IF                    {$$=$1;} 
        | DECLARACION               {$$=$1;}
        | CASTEOS                   {$$=$1;}
        | INCREMETO_DECREMENTO
        | VECTOR_TIPO1              {$$=$1;}
        | VECTOR_TIPO2
        | SWITCH_CASE
        | DECLARACION_INCREMENTOS 
        | CICLO_FOR                     {$$=$1;}
        | CICLO_WHILE                   {$$=$1;}
        | CICLO_DOWHILE                 {$$=$1;}
        | FUNCION_BREAK                 {$$=$1;}
        | SENTENCIA_TRANSFERENCIA     
        | FUNCIONES                     {$$=$1;}
        | METODO                         {$$=$1;}
        | FUNCION_PRINT
        | FUNCION_LOWER
        | FUNCION_UPPER
        | FUNCION_ROUND
        | FUNCION_LENGTH
        | FUNCION_TYPEOF
        | FUNCION_TOSTRING
        | TOCHAR_ARRAY
        | FUNCION_PUSH
        | FUNCION_CONTINUAR                {$$=$1;}
        | FUNCION_RETURN            {$$=$1;}
        | FUNCION_POP
        | FUNCION_RUN
        | PARAMETROS_LLAMADA
        | INVALID               {controller.listaErrores.push(new errores.default('Error lexico', $1,@1.first_line, @1.first_column));}
        | error  puntoComa         {controller.listaErrores.push(new errores.default('Error sintactico','Se esperaba token ',@1.first_line, @1.first_column));}
;


LISTA_IDENTIFICADOR:
        LISTA_IDENTIFICADOR coma Identificador  
        | Identificador
                {$$ = $1}
        
;

DECLARACION:
        Int LISTA_IDENTIFICADOR puntoComa
             {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.ENTERO)
             ,null, @1.first_line, @1.first_column );}
        | Int LISTA_IDENTIFICADOR igual ARITMETICA puntoComa
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.ENTERO)
             ,$4, @1.first_line, @1.first_column );}
        | LISTA_IDENTIFICADOR igual ARITMETICA puntoComa
             {$$ = new asignacion.default($1, $3, @2.first_line,@2.first_column);}

        | Boolean LISTA_IDENTIFICADOR igual ARITMETICA puntoComa
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.BOOLEANO)
             ,$4, @1.first_line, @1.first_column );}
        | Boolean LISTA_IDENTIFICADOR puntoComa
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.BOOLEANO)
             ,null, @1.first_line, @1.first_column );}
        |  Boolean LISTA_IDENTIFICADOR igual CONDICIONAL puntoComa 
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.BOOLEANO)
             ,$4, @1.first_line, @1.first_column );}
        | Char LISTA_IDENTIFICADOR igual ARITMETICA puntoComa
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.CHAR)
             ,$4, @1.first_line, @1.first_column );}
        | Char LISTA_IDENTIFICADOR puntoComa
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.CHAR)
             ,null, @1.first_line, @1.first_column );}
        
        | String LISTA_IDENTIFICADOR igual ARITMETICA puntoComa
        //Id es la variable, tipo de dato string
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.CADENA),
              $4, @1.first_line, @1.first_column );}
        | String LISTA_IDENTIFICADOR puntoComa
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.CADENA)
             ,null, @1.first_line, @1.first_column );}
        | Double LISTA_IDENTIFICADOR igual ARITMETICA puntoComa 
                {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.DECIMAL)
             ,$4, @1.first_line, @1.first_column );}
        | Double LISTA_IDENTIFICADOR puntoComa
                 {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.DECIMAL)
             ,null, @1.first_line, @1.first_column );}

        |  LISTA_IDENTIFICADOR igual CONDICIONAL puntoComa
                 {$$=new declaracion.default($1, new Tipo.default(Tipo.DataType.DECIMAL)
              ,$3, @1.first_line, @1.first_column );}
        | ACCESO_VECTORES igual ARITMETICA puntoComa
        | LISTA_IDENTIFICADOR parentA ARITMETICA parentC
        | LLAMAR_FUNCIONES
        
;



ARITMETICA:    
        ARITMETICA suma ARITMETICA
                {$$ = new aritmetico.default(aritmetico.tipoOp.SUMA, $1, $3, @1.first_line, @1.first_column);}
        // PARA LAS OPERACONES ARITMETICAS
        | Numero 
                {$$= new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);}
        | ARITMETICA resta ARITMETICA 
                 {$$ = new aritmetico.default(aritmetico.tipoOp.RESTA, $1, $3, @1.first_line, @1.first_column);}

        | ARITMETICA division ARITMETICA
                 {$$ = new aritmetico.default(aritmetico.tipoOp.DIVISION, $1, $3, @1.first_line, @1.first_column);}
        
        | ARITMETICA multiplicacion ARITMETICA
        //PARA LOS TIPOS DE DATOS       
                {$$ = new aritmetico.default(aritmetico.tipoOp.MULTIPLICACION, $1, $3, @1.first_line, @1.first_column);}
        | verdadero
                {$$= new nativo.default(new Tipo.default(Tipo.DataType.BOOLEANO),$1, @1.first_line, @1.first_column);}
        | falso 
        {$$= new nativo.default(new Tipo.default(Tipo.DataType.BOOLEANO),$1, @1.first_line, @1.first_column);}
        | Cadena 
                {$$= new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
        | Caracter 
                {$$= new nativo.default(new Tipo.default(Tipo.DataType.CHAR),$1, @1.first_line, @1.first_column);}
        | LISTA_IDENTIFICADOR
                {$$ = new nativo.default(new Tipo.default(Tipo.DataType.IDENTIFICADOR), $1, @1.first_line, @1.first_column);}

        | parentA ARITMETICA parentC
                         {$$ =$2;}
        // incrementos 
        /*| ARITMETICA modulo ARITMETICA
                 {$$ = new aritmetico.default(aritmetico.tipoOp.MODULO, $1, $3, @1.first_line, @1.first_column);}*/

        | LISTA_IDENTIFICADOR incremento
           {$$ = new incremento.default(incremento.tipoOp.INCRE,$1, @1.first_line, @1.first_column);}

        | LISTA_IDENTIFICADOR decremento 
        {$$ = new incremento.default(incremento.tipoOp.DECRE ,$1, @1.first_line, @1.first_column);}
        |  Identificador corcheteA ARITMETICA corcheteC
        |  Identificador corcheteA ARITMETICA corcheteC  corcheteA ARITMETICA corcheteC
        


;

DECLARACION_INCREMENTOS:
        LISTA_IDENTIFICADOR incremento puntoComa
        | LISTA_IDENTIFICADOR decremento puntoComa

;
 
CASTEOS :
        Int LISTA_IDENTIFICADOR igual parentA Int parentC Numero puntoComa
                  {$$ = new casteos.default( new Tipo.default(Tipo.DataType.ENTERO), $2,$7,  @1.first_line, @1.first_column);}
        | Int LISTA_IDENTIFICADOR igual parentA Int parentC falso puntoComa
        | Int LISTA_IDENTIFICADOR igual parentA Int  parentC Caracter puntoComa
        | Int LISTA_IDENTIFICADOR igual parentA Int parentC Cadena  puntoComa
        | Double LISTA_IDENTIFICADOR igual parentA Double parentC Numero puntoComa
        | Double LISTA_IDENTIFICADOR igual parentA Double parentC Cadena puntoComa
        | Boolean LISTA_IDENTIFICADOR igual parentA Boolean parentC Numero puntoComa
        | Boolean LISTA_IDENTIFICADOR igual parentA Boolean parentC Cadena puntoComa
        | Boolean LISTA_IDENTIFICADOR igual parentA Boolean parentC Caracter puntoComa
        | Char LISTA_IDENTIFICADOR igual parentA Char parentC Numero puntoComa
        | Char LISTA_IDENTIFICADOR igual parentA Char parentC falso puntoComa
        | Char LISTA_IDENTIFICADOR igual parentA Char parentC verdadero puntoComa 
        | Char LISTA_IDENTIFICADOR igual parentA Char parentC Cadena puntoComa 
        | String LISTA_IDENTIFICADOR igual parentA String parentC Numero puntoComa
        | String LISTA_IDENTIFICADOR igual parentA String parentC falso puntoComa 
        | String LISTA_IDENTIFICADOR igual parentA String parentC verdadero puntoComa
        | String LISTA_IDENTIFICADOR igual parentA String parentC Caracter puntoComa
        | String LISTA_IDENTIFICADOR igual parentA String parentC Cadena puntoComa      
        | parentA Int parentC
;






VECTOR_TIPO1:   
        Int corcheteA corcheteC ARITMETICA igual New Int corcheteA ARITMETICA corcheteC puntoComa
        | Double  corcheteA corcheteC ARITMETICA igual New Double corcheteA ARITMETICA corcheteC puntoComa
        | Boolean corcheteA corcheteC ARITMETICA igual New Boolean corcheteA ARITMETICA corcheteC puntoComa
        | Char corcheteA corcheteC ARITMETICA igual New Char corcheteA  ARITMETICA corcheteC puntoComa
        | String corcheteA corcheteC ARITMETICA igual New String corcheteA ARITMETICA corcheteC puntoComa
        
        // vectores de 2x2
        |Int corcheteA corcheteC corcheteA corcheteC ARITMETICA igual 
                New Int corcheteA  Numero corcheteC corcheteA Numero corcheteC puntoComa
        |Char corcheteA corcheteC corcheteA corcheteC ARITMETICA igual 
                New Char corcheteA CASTEOS Cadena corcheteC corcheteA Numero corcheteC puntoComa
        |Double corcheteA corcheteC corcheteA corcheteC ARITMETICA igual 
                New Double corcheteA Numero  corcheteC corcheteA Numero corcheteC puntoComa
        |String corcheteA corcheteC corcheteA corcheteC ARITMETICA igual 
                New String corcheteA Numero  corcheteC corcheteA Numero corcheteC puntoComa
        |Boolean corcheteA corcheteC corcheteA corcheteC ARITMETICA igual 
                New Boolean corcheteA Numero  corcheteC corcheteA Numero corcheteC puntoComa
;       
VECTOR_TIPO2:
        // vector tipo 2 de 1 dimension
        Int corcheteA corcheteC ARITMETICA igual llaveA DATOS_VECTOR llaveC puntoComa
        | String corcheteA corcheteC ARITMETICA igual llaveA DATOS_VECTOR llaveC puntoComa
        | Double corcheteA corcheteC ARITMETICA igual llaveA DATOS_VECTOR llaveC puntoComa
        | Boolean corcheteA corcheteC ARITMETICA igual  DATOS_VECTOR 
        | Char corcheteA corcheteC ARITMETICA igual llaveA DATOS_VECTOR llaveC puntoComa
        // vector tipo 2 de 2 dimensiones
        // ver si colocar los boolean, char y string 
        | Int corcheteA corcheteC corcheteA corcheteC ARITMETICA igual 
                llaveA llaveA DATOS_VECTOR llaveC coma llaveA DATOS_VECTOR llaveC llaveC puntoComa
        | String corcheteA corcheteC corcheteA corcheteC ARITMETICA igual 
                llaveA llaveA DATOS_VECTOR llaveC coma llaveA DATOS_VECTOR llaveC llaveC puntoComa
;   



DATOS_VECTOR:
        DATOS_VECTOR coma Numero
        | Numero
        | coma Cadena
        | Cadena
        | coma Caracter
        | Caracter
        | llaveA verdadero llaveC puntoComa
        | llaveA verdadero coma verdadero llaveC puntoComa
        | llaveA falso llaveC puntoComa
        | llaveA falso coma falso llaveC puntoComa
        
;

ACCESO_VECTORES:
        LISTA_IDENTIFICADOR corcheteA ARITMETICA corcheteC 
        | LISTA_IDENTIFICADOR corcheteA ARITMETICA corcheteC corcheteA ARITMETICA corcheteC 
;


CONDICIONAL:
        //AGREGAR A RELACIONAL LOS SIMBOLOS
        ARITMETICA mayor ARITMETICA
                {$$ = new relacional.default(relacional.tipoOp.MAYOR, $1, $3, @2.first_line, @2.first_column);}
        | ARITMETICA menor  ARITMETICA
                {$$ = new relacional.default(relacional.tipoOp.MENOR, $1, $3, @2.first_line, @2.first_column);}
        | ARITMETICA igual ARITMETICA
                {$$ = new relacional.default(relacional.tipoOp.IGUAL, $1, $3, @2.first_line, @2.first_column);}
        | ARITMETICA menorIgual ARITMETICA
                {$$ = new relacional.default(relacional.tipoOp.MENOR_IGUAL, $1, $3, @2.first_line, @2.first_column);}
        | ARITMETICA mayorIgual ARITMETICA
                {$$ = new relacional.default(relacional.tipoOp.MAYOR_IGUAL, $1, $3, @2.first_line, @2.first_column);}
        | ARITMETICA igualigual ARITMETICA
                {$$ = new relacional.default(relacional.tipoOp.IGUAL_IGUAL, $1, $3, @2.first_line, @2.first_column);}
        | ARITMETICA diferente ARITMETICA
                {$$ = new relacional.default(relacional.tipoOp.DIFERENTE, $1, $3, @2.first_line, @2.first_column);}
        | ARITMETICA operadorAnd CONDICIONAL
                {$$ = new logica.default(logica.tipoOp.AND, $1, $3, @1.first_line, @1.first_column);}
        |  operadorNot CONDICIONAL
                {$$ = new logica.default(logica.tipoOp.NOT, $2, $2, @1.first_line, @1.first_column);}
        | ARITMETICA operadorOr CONDICIONAL
                {$$ = new logica.default(logica.tipoOp.OR, $1, $3, @1.first_line, @1.first_column);}
        
;




CICLO_IF:
    SIMPLEIF                {$$ = $1;}          
    |  if  parentA CONDICIONAL parentC llaveA NEWINSTRUCCIONTS llaveC ELSEIFSINS 
                        {$$=new ifIns.default($3,$6,$8,@1.first_line,@1.first_column);} 
     
;


SIMPLEIF:
    if parentA CONDICIONAL parentC llaveA NEWINSTRUCCIONTS llaveC
        {$$ =new ifIns.default($3,$6,undefined, @1.first_line,@1.first_column);}
          
;


ELSEIFSINS :
      else if parentA CONDICIONAL parentC llaveA NEWINSTRUCCIONTS llaveC  ELSEIFSINS            
         {$$ =new ifIns.default($4,$7,$9, @1.first_line,@1.first_column);}
    | else if parentA CONDICIONAL parentC llaveA NEWINSTRUCCIONTS llaveC              
         {$$ =new ifIns.default($4,$7,undefined, @1.first_line,@1.first_column);}
    | else  llaveA NEWINSTRUCCIONTS llaveC 
                        {$$= $3}       
;


NEWINSTRUCCIONTS:
    ACCIONES {$$ = new newInstructions.default($1,@1.first_line,@1.first_column);}
;   
/*
CICLO_IF:
        IF  
        | IF ELSE
        | IF VARIOS_ELIF ELSE
        | IF VARIOS_ELIF 
;

IF: if parentA CONDICIONAL parentC llaveA ACCIONES llaveC
;

ELSE: else llaveA ACCIONES llaveC
;

ELIF:
        elif parentA CONDICIONAL parentC llaveA ACCIONES llaveC
;

VARIOS_ELIF:
        VARIOS_ELIF ELIF
        | ELIF
;

*/


SWITCH_CASE:
         switch parentA LISTA_IDENTIFICADOR parentC llaveA CASES llaveC
;

CASES:
        
        CASES case ARITMETICA dosPuntos ACCIONES   
        |  case ARITMETICA dosPuntos ACCIONES  
        |  CASES  default dosPuntos ACCIONES

        
;

CICLO_WHILE:
        While  parentA CONDICIONAL parentC llaveA NEWINSTRUCCIONTS llaveC
                        {$$ = new mientras.default($3,$6,@2.first_line,@2.first_column);}
        
;    

CICLO_DOWHILE:
        do llaveA NEWINSTRUCCIONTS llaveC While parentA CONDICIONAL parentC puntoComa
                        {$$ = new doWhile.default($7,$3,@2.first_line,@2.first_column);}
         // Do until 
        |  do llaveA   NEWINSTRUCCIONTS  llaveC until parentA CONDICIONAL parentC puntoComa     
                        {$$ = new doUntil.default($7,$3,@2.first_line,@2.first_column);}
;               


CICLO_FOR:
        for parentA DECLARACION CONDICIONAL puntoComa ARITMETICA parentC llaveA
                NEWINSTRUCCIONTS   llaveC
                {$$ = new cicloFor.default($3,$4,$6,$9,  @1.first_line,@1.first_column);}

        // for con incremento en la asignacion 
        |    for parentA DECLARACION CONDICIONAL puntoComa 
                ARITMETICA igual ARITMETICA suma ARITMETICA
                 parentC llaveA ACCIONES   llaveC    
        // fot con decremento en la asignacion 
        | for parentA DECLARACION CONDICIONAL puntoComa 
                ARITMETICA igual ARITMETICA resta ARITMETICA
                 parentC llaveA ACCIONES   llaveC  
        // for con variables en la asignacion
        
;




SENTENCIA_TRANSFERENCIA:
        
        
         return puntoComa
        | return ARITMETICA puntoComa

;

FUNCIONES:
        LISTA_IDENTIFICADOR   parentA PARAMETROS parentC dosPuntos 
                TIPO_DATO llaveA NEWINSTRUCCIONTS llaveC
                 {$$= new Funciones.default($1,$3,$8,  @1.first_line,@1.first_column);}
        // FUNCION SIN PARAMETROS 
        |  LISTA_IDENTIFICADOR   parentA  parentC dosPuntos 
                TIPO_DATO llaveA NEWINSTRUCCIONTS llaveC
                {$$= new Funciones.default($1,[],$7,  @1.first_line,@1.first_column);}
        
;


TIPO_DATO:
        Int {$$=$1}  | String {$$=$1}  | Boolean {$$=$1}  | Char  {$$=$1} | Double{$$=$1} 
;


LLAMAR_FUNCIONES:
        LISTA_IDENTIFICADOR parentA parentC puntoComa
          {$$= new llamada.default($1,[],  @1.first_line,@1.first_column);}

;

LLAMAR_PARAMETROS:
        PARAMETROS coma  ARITMETICA
        |  ARITMETICA

;


PARAMETROS:
        PARAMETROS coma TIPO_DATO Identificador  { $1.push($3+","+$4); $$ = $1;  }
        | TIPO_DATO Identificador                { $$ = [$1+","+$2];             }
        
       
;



METODO:
        LISTA_IDENTIFICADOR parentA parentC dosPuntos Void llaveA NEWINSTRUCCIONTS llaveC
                {$$= new Metodo.default($1,[],$7,  @1.first_line,@1.first_column);}
        // metodo sin tipo definido 
        | LISTA_IDENTIFICADOR parentA parentC dosPuntos llaveA NEWINSTRUCCIONTS llaveC
              {$$= new Metodo.default($1,[],$6,  @1.first_line,@1.first_column);}
        
        |  LISTA_IDENTIFICADOR parentA PARAMETROS parentC dosPuntos Void llaveA NEWINSTRUCCIONTS llaveC
                {$$= new Metodo.default($1,$3,$8,  @1.first_line,@1.first_column);}
        
;


FUNCION_PRINT:
        print parentA ARITMETICA parentC puntoComa
                                {$$=new impresion.default($3,@2.first_line,@2.first_column);}
        | println parentA ARITMETICA parentC puntoComa
                                 {$$=new impresion.default($3,@2.first_line,@2.first_column);}
        | print parentA CONDICIONAL parentC puntoComa
                                 {$$=new impresion.default($3,@2.first_line,@2.first_column);}
;

FUNCION_LOWER:
        String LISTA_IDENTIFICADOR igual toLower parentA ARITMETICA parentC puntoComa
;

FUNCION_UPPER:
        String LISTA_IDENTIFICADOR igual toUpper parentA ARITMETICA parentC puntoComa
;

FUNCION_ROUND:
        Double LISTA_IDENTIFICADOR igual round parentA Numero parentC puntoComa
        | Int LISTA_IDENTIFICADOR igual round parentA Numero parentC puntoComa
;

FUNCION_LENGTH:
       String LISTA_IDENTIFICADOR igual  length parentA Identificador parentC puntoComa
       |   Int LISTA_IDENTIFICADOR igual  length parentA Identificador corcheteA Numero corcheteC parentC puntoComa

;


FUNCION_TYPEOF:
        String LISTA_IDENTIFICADOR igual typeof parentA ARITMETICA parentC puntoComa
       |  Int LISTA_IDENTIFICADOR igual typeof parentA ARITMETICA parentC puntoComa
        |  Boolean LISTA_IDENTIFICADOR igual typeof parentA ARITMETICA parentC puntoComa 
        |  Char LISTA_IDENTIFICADOR igual typeof parentA ARITMETICA parentC puntoComa
        |  Double LISTA_IDENTIFICADOR igual typeof parentA ARITMETICA parentC puntoComa
;

FUNCION_TOSTRING:
        Int LISTA_IDENTIFICADOR igual ToString parentA ARITMETICA parentC puntoComa
        | String LISTA_IDENTIFICADOR igual ToString parentA ARITMETICA parentC puntoComa
        | Boolean LISTA_IDENTIFICADOR igual ToString parentA ARITMETICA parentC puntoComa
;


TOCHAR_ARRAY:
        Char corcheteA corcheteC ARITMETICA igual toCharArray 
                parentA Cadena parentC puntoComa
;

FUNCION_PUSH:
        LISTA_IDENTIFICADOR punto Push parentA ARITMETICA parentC puntoComa
;

FUNCION_POP:
        LISTA_IDENTIFICADOR punto Pop parentA parentC puntoComa
;

FUNCION_RUN:
        Run LLAMAR_FUNCIONES 
         {$$=new Run.default($2,@1.first_line,@1.first_column);}
;

FUNCION_RETURN:
        Return ARITMETICA puntoComa
                 {$$=new retornar.default($2,@1.first_line,@1.first_column);}
;


 FUNCION_CONTINUAR:
        continue puntoComa
         {$$=new Continuar.default("",@1.first_line,@1.first_column);}
 ;

FUNCION_BREAK:
         break puntoComa
         {$$=new Break.default("",@1.first_line,@1.first_column);}
;
