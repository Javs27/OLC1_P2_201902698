

%{

    // variables globales, JS
    var flag=0;

%}

%lex

%options case-insensitive

%%

// para eliminar espacios en blanco y comentarios 
[ \r\t\n\f]+  {/*estos  se omiten*/}
\n  {/*estos  se omiten*/}
"//".*     {/*estos  se omiten*/}
[/][][^][]+([^/][^][]+)*[/]  {/*estos  se omiten*/}

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



"<"     return 'menor';
">"     return 'mayor';
">="    return 'mayorIgual';
"<="    return 'menorIgual';
"!="    return 'diferente';
"=="    return 'igualigual';
"="     return 'igual';
"++"    return 'incremento';
"+"     return 'suma';

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
"return"   return 'return';
"LLAMADA"   return 'Llamada';
"PARAMETROS_LLAMADA" return 'LlaamadaPar';
"print"     return 'print';
"println"   return 'println';
"toLower"   return 'toLower';
"toUpper"   return 'toUpper';
"round"     return 'round';
"length"    return 'length';
"typeof"    return 'typeof';
"toString"  return  'toString';
"toCharArray" return 'toCharArray';
"push"      return 'push';
"run"       return 'run';


[0-9]+("."[0-9]+)?\b    return 'Numero';
\"(.+)*\"               return 'Cadena';
\'([a-zA-Z0-9])*\'         return 'Caracter';
[a-zA-Z0-9_]+            return 'Identificador';


// token end of file 
<<EOF>> return 'EOF';

.  {console.log("Este es un error lexico" + yytext)}

// aca termina el analisis lexico 
/lex

// precedencia de datos 
%left 'suma' 'resta' 
%left 'division' 'multiplicacion'

//Analisis sintactico

%start INICIAR 

%%

// GRAMATICAS 
INICIAR : ACCIONES EOF {console.log("Analisis del proyecto terminado :D");}

;


ACCIONES : ACCIONES ACCION 
        | ACCION
;

ACCION:
        DECLARACION
        | CICLO_IF
        | CASTEOS
        | INCREMETO_DECREMENTO
        | VECTOR_TIPO1
        | VECTOR_TIPO2
        | CICLO_EL_IF
        | SWITCH_CASE
        | WHILE
        | CICLO_FOR
        | DO_WHILE
        | DO_UNTIL
;

DECLARACION:
        Int LISTA_IDENTIFICADOR puntoComa
        | Int LISTA_IDENTIFICADOR igual ARITMETICA puntoComa
        | LISTA_IDENTIFICADOR igual verdadero puntoComa
        | LISTA_IDENTIFICADOR falso verdadero puntoComa
        | Boolean LISTA_IDENTIFICADOR igual falso puntoComa
        | Boolean LISTA_IDENTIFICADOR igual verdadero puntoComa
        | Char LISTA_IDENTIFICADOR igual Caracter puntoComa
        | LISTA_IDENTIFICADOR igual Cadena puntoComa
        
        // acceso a vectores por declaraccion 
        | String LISTA_IDENTIFICADOR igual ACCESO_VECTORES        
        | Boolean LISTA_IDENTIFICADOR igual ACCESO_VECTORES
        | Char LISTA_IDENTIFICADOR igual ACCESO_VECTORES
        | Double LISTA_IDENTIFICADOR igual ACCESO_VECTORES
        
        


 
        
;

LISTA_IDENTIFICADOR:
        LISTA_IDENTIFICADOR coma Identificador
        | Identificador
        
;




CASTEOS :
        Int LISTA_IDENTIFICADOR igual parentA Int parentC Numero puntoComa
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

INCREMETO_DECREMENTO :
        LISTA_IDENTIFICADOR  incremento puntoComa
        | LISTA_IDENTIFICADOR decremento puntoComa
        | LISTA_IDENTIFICADOR igual LISTA_IDENTIFICADOR  decremento puntoComa
        | LISTA_IDENTIFICADOR igual LISTA_IDENTIFICADOR incremento puntoComa
        | LISTA_IDENTIFICADOR igual Numero suma LISTA_IDENTIFICADOR incremento puntoComa
        | LISTA_IDENTIFICADOR igual Numero resta LISTA_IDENTIFICADOR decremento puntoComa
        
        
;


VECTOR_TIPO1:   
        Int corcheteA corcheteC LISTA_IDENTIFICADOR igual New Int corcheteA Numero corcheteC puntoComa
        | Double  corcheteA corcheteC LISTA_IDENTIFICADOR igual New Double corcheteA Numero corcheteC puntoComa
        | Boolean corcheteA corcheteC LISTA_IDENTIFICADOR igual New Boolean corcheteA Numero corcheteC puntoComa
        | Char corcheteA corcheteC LISTA_IDENTIFICADOR igual New Char corcheteA  Numero corcheteC puntoComa
        | String corcheteA corcheteC LISTA_IDENTIFICADOR igual New String corcheteA Numero corcheteC puntoComa
        
        
        |Int corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual 
                New Int corcheteA  Numero corcheteC corcheteA Numero corcheteC puntoComa
        |Char corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual 
                New Char corcheteA CASTEOS Cadena corcheteC corcheteA Numero corcheteC puntoComa
        |Double corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual 
                New Double corcheteA Numero  corcheteC corcheteA Numero corcheteC puntoComa
        |String corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual 
                New String corcheteA Numero  corcheteC corcheteA Numero corcheteC puntoComa
        |Boolean corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual 
                New Boolean corcheteA Numero  corcheteC corcheteA Numero corcheteC puntoComa
;       

VECTOR_TIPO2:
        Int corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR 
        | String corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
        | Char corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
        | Double corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
        | Boolean corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
        

        | Int corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
        | String corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
        | Char corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
        | Double corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
        | Boolean corcheteA corcheteC corcheteA corcheteC LISTA_IDENTIFICADOR igual DATOS_VECTOR
;


DATOS_VECTOR:
        llaveA  Numero  llaveC puntoComa
        | llaveA  Numero coma Numero  llaveC puntoComa
        | llaveA  Numero coma Numero coma Numero  llaveC puntoComa
        | llaveA  Numero coma Numero coma Numero coma Numero llaveC puntoComa

        | llaveA Cadena llaveC puntoComa
        | llaveA Cadena coma Cadena llaveC puntoComa
        | llaveA Cadena coma Cadena coma Cadena llaveC puntoComa        
        | llaveA Cadena coma Cadena coma Cadena coma Cadena llaveC puntoComa

        | llaveA Caracter llaveC puntoComa
        | llaveA Caracter coma Caracter llaveC puntoComa
        | llaveA Caracter coma Caracter coma Caracter llaveC puntoComa 
        | llaveA Caracter coma Caracter coma Caracter coma Caracter llaveC puntoComa

        | llaveA verdadero llaveC puntoComa
        | llaveA verdadero coma verdadero llaveC puntoComa
        | llaveA falso llaveC puntoComa
        | llaveA falso coma falso llaveC puntoComa

        |  llaveA llaveA Numero coma Numero llaveC coma llaveA Numero coma Numero llaveC llaveC puntoComa
        
;

ACCESO_VECTORES:
        LISTA_IDENTIFICADOR corcheteA ARITMETICA corcheteC puntoComa
        | LISTA_IDENTIFICADOR corcheteA ARITMETICA corcheteC corcheteA ARITMETICA corcheteC puntoComa
;


ARITMETICA:    
        ARITMETICA suma ARITMETICA
        | Numero 
        | ARITMETICA resta ARITMETICA
        | ARITMETICA division ARITMETICA
        | ARITMETICA multiplicacion ARITMETICA
        | Identificador
     
;

CONDICIONAL:
        ARITMETICA mayor ARITMETICA
        | ARITMETICA menor  ARITMETICA
        | ARITMETICA igual ARITMETICA
        | ARITMETICA menorIgual ARITMETICA
        | ARITMETICA mayorIgual ARITMETICA
        | Int ARITMETICA igual ARITMETICA puntoComa ARITMETICA mayor ARITMETICA puntoComa  ARITMETICA incremento
        | Int ARITMETICA igual ARITMETICA puntoComa ARITMETICA menor ARITMETICA puntoComa  ARITMETICA incremento
        | Int ARITMETICA igual ARITMETICA puntoComa ARITMETICA diferente ARITMETICA puntoComa  ARITMETICA incremento
        | Identificador igualigual ARITMETICA
;
 
CICLO_IF:
        if parentA CONDICIONAL parentC llaveA DECLARACION   llaveC
        
        |  if parentA CONDICIONAL parentC llaveA DECLARACION   llaveC 
                else llaveA DECLARACION llaveC

        | if parentA CONDICIONAL parentC llaveA if parentA CONDICIONAL parentC llaveA DECLARACION  llaveC  llaveC

        // IFS CON BREAK
        | if parentA CONDICIONAL parentC llaveA DECLARACION break puntoComa llaveC
        | if parentA CONDICIONAL parentC llaveA if parentA CONDICIONAL parentC llaveA DECLARACION break puntoComa llaveC  llaveC
        
        // IF CON CONTINUE
        | if parentA CONDICIONAL parentC llaveA DECLARACION continue puntoComa  llaveC DECLARACION llaveC
        
;

MULTIPLES_DECLARACIONES:
        ACCIONES
;


CICLO_EL_IF:
        if parentA CONDICIONAL parentC llaveA DECLARACION   llaveC 
                elif parentA CONDICIONAL parentC 
                        llaveA DECLARACION 
                                if parentA CONDICIONAL parentC llaveA DECLARACION   llaveC 
                                        else llaveA DECLARACION llaveC llaveC
;


SWITCH_CASE:
        switch parentA LISTA_IDENTIFICADOR parentC llaveA CASES llaveC
                
                
;

CASES:
        case Numero dosPuntos DECLARACION 

;

WHILE: 
        While parentA CONDICIONAL parentC llaveA  CICLO_IF DECLARACION   llaveC
        | While parentA CONDICIONAL parentC llaveA  DECLARACION CICLO_IF    llaveC
        | While parentA CONDICIONAL parentC llaveA  CICLO_EL_IF DECLARACION   llaveC
;


CICLO_FOR:
        for parentA  CONDICIONAL parentC llaveA DECLARACION llaveC 
        | for parentA  CONDICIONAL parentC llaveA 
                for parentA  CONDICIONAL parentC llaveA DECLARACION llaveC  llaveC 
        // ciclo for con if anidado y break
        |for parentA  CONDICIONAL parentC llaveA CICLO_IF  DECLARACION llaveC 

        | for parentA  CONDICIONAL parentC llaveA CICLO_IF llaveC 
        
;

DO_WHILE:
        do llaveA CICLO_IF  Identificador incremento puntoComa llaveC 
        | do llaveA CICLO_IF  Identificador decremento  puntoComa llaveC 
;


DO_UNTIL:
        do llaveA CICLO_IF  Identificador incremento puntoComa llaveC 
                until parentA CONDICIONAL parentC puntoComa
        | do llaveA CICLO_IF  Identificador decremento puntoComa llaveC 
                until parentA CONDICIONAL parentC puntoComa
        
;