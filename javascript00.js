"use strict"; //permette di dare errori per tutte le variabili non dichiarate nel file *.js
//i tipi di dati possibili sono :
// numeri(int, float), string, null, NaN, undefined

/*===================================STRING=============================*/
var nomeMaiuscola = "stephane".toUpperCase();
var s = "stringa0"; 
s = 'stringa1';
s = "L'altro ieri\nHo mangiato un kebab"; //i caratteri speciali si inseriscono dopo "\"
s = "L\'altra sera, ho cucinato la \"pasta\"";
s = "la seq \\n indica il ritorno a capo";
s = "html.it\u00A9 2013"; // "\u si usa per indicare caratteri unicode in una string"

/*=======================VARIABILE e COSTANTI===========================*/
var nome_variab; // a sto pto, il vaore della variabile è UNDEFINED
const MyConst = "Hello";

/*======================CONVERSIONE TRA TIPI===========================*/
var x = "12";
var y = "10";
var z = x*y; //z = 120
            
/*      REGOLE DI CONVERSIONI:

--> Partiamo dal principio in base al quale in JavaScript ogni tipo di dato primitivo può essere convertito in un altro tipo di dato primitivo: numeri, stringhe, booleani, undefined e null

--> Nel caso dell’operatore + : se almeno uno dei due operandi è una stringa, allora viene effettuata una concatenazione di stringhe, altrimenti viene eseguita una addizione. 
        exple: "12"+13 = "1213"; true + null = 1 (dal momento che non è presente nessuna stringa, l’operatore + viene interpretato come addizione e quindi i valori true e null vengono convertiti in valori numerici, con il risultato finale di 1);  

--> Nel caso dell'operatore logico OR ||:viene restituito il secondo valore sse il primo valore è NULL. altrimeni, viene restituito il primo valore.
        exple: var x = y || ""; x  = "" ssi y = null
               var z = h || 1;  z = 1 ssi h = null

--> Nel caso di operatori relazionali >, >=, < e <= : se almeno uno degli operandi è un numero, si effettua un confronto tra numeri, se no si fa un confronto tra stringhe.
        exple: var x = "12" > 10; x = true
               var x = true > null; x = true car "true" > "null"

--> Nel caso degli operatori != e == : se entrambi gli operatori sono stringhe allora viene effettuato un confronto tra stringhe, altrimenti si esegue un confronto tra numeri; unica eccezione è: (null == undefined) che è vera per definizione

--> Nel caso di Uguaglianza e disuguaglianza STRETTA(=== e !==) : Questi operatori confrontano gli operandi senza effettuare alcuna conversione.

            LA MIGLIORE REGOLA E' DI EVITARE CONVERSIONI ESPLICITE!!!
*/

/*=========================parseInt e parseFloat======================*/
//parseInt e parseFloat conversione da string -> intero o decimale
parseInt("12")	// 12
parseInt("12abc")	// 12; les lettres apres 12 sont IGNOREES
parseInt("a12bc")	// NaN
parseInt("12.5")	// 12
parseInt("12", 8)	// il valore di 12 nel sistema di numerazione ottale (base 8), cioè 10

parseFloat("12");   //12
parseFloat("12.5")  //12.5

/*===========typeof per verificare il tipo di una variabile=============*/
var prova = new Function();
var numero = 1;
var carattere = "Salve";
console.log(typeof prova);     // ritorna "function"
console.log(typeof numero);    // ritorna "number"
console.log(typeof carattere); // ritorna "string"

/*=============================== ARRAY ===============================*/
var days= [
    "monday", "tuesday", "wednesday", 
    "thursday", "friday", "saturday", "sunday"];
//var day1 = days[0] => day1 = "monday"; 
//var day7 = days[6] => day7 = "sunday";

var emptyArray = [];
var vet2 = [, "ciao"]; //dim vet2 = 2, il 1° è UNDEFINED, il 2° è "ciao"
var vet3 = [1, "2",]; //dim vet3 = 2. vet3[0] = 1; vet3[1] = "2"
var myArray = [123, "stringa", true, null]; //valido
var myArray2 = [123, "stringa", ["a", "b", 99]]; //valido
var lastElt = myArray2[2][2]; //lastE = 99

//          MATRICI O ARRAY MULTIDIMENSIONALI
var matrice = [
                [24, 13, 1], 
                [48, 92, 17], 
                [8, 56, 11]
              ];
var quarantotto = matrice[1][0];

var [primoGiorno,,terzoGiorno,,,,settimoGiorno] = days;
//primoGiorno = "lundi" etc...

/*==============istruzioni-condizionali if...else...switch =============*/
//In questo caso i voti con valori partendo da uno al cinque eseguiranno tutti la stessa istruzione: "insufficiente".
switch (voto) {
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
		giudizio = "insufficiente";
		break;
	case 6:
		giudizio = "sufficiente";
		break;
	case 7:
		giudizio = "discreto";
		break;
	case 8:
		giudizio = "buono";
		break;
	case 9:
		giudizio = "ottimo";
		break;
	case 10:
		giudizio = "eccellente";
		break;
	default:
		messaggio = "non classificato";
		break;
}

/*======================== istruzioni iterative ======================*/
//Per lavorare più comodamente con gli array JavaScript prevede due varianti del for: il for...in e il for...of. Vediamo come come scrivere le istruzioni precedenti facendo uso del for...in

//--> for in
var quantita = [12, 34, 45, 7, 19];
var totale = 0;
var indice;
for (indice in quantita) {
	totale = totale +  quantita[indice];
}

//-->for of
var quantita = [12, 34, 45, 7, 19];
var totale = 0;
var valore;
for (valore of quantita) {
	totale = totale +  valore;
}

/*Ad ogni iterazione JavaScript assegna alla variabile valore il contenuto di ciascun elemento dell’array.

Queste varianti del for ci consentono di scrivere meno codice quando lavoriamo con gli array. C’è da tenere presente, però, che il for...of fa parte delle specifiche di ECMAScript 6 e potrebbe non essere disponibile in engine JavaScript meno recenti.*/

/*======================Funzioni in JavaScript==========================*/
function somma() {
	var z = 11 + 5;
	return z;
}
var risultato = somma();

function sommaInt(int1, int2){
  return int1 + int2;
}
risultato = sommaInt(1, 1);

// -->arguments: per definizione, non passo parametri alla function!!!
//arguments: consente di creare funzioni con un numero di parametri non definito. Ad esempio, possiamo sommare un numero indefinito di valori
function somma() {
	var z = 0;
	var i;
	for (i in arguments) {
		z = z + arguments[i];
	}
	return z;
}
var v1 = somma(2, 78); //v1 = 80
var v2 = somma(1, 32, 4, 2, 4); //v2 = 43

//  -->funzioni con valori di default: novità di ECMAScript6
function somma(x = 0, y = 0) {
	var z = x + y;
	return z;
}
//se al momento della chiamata non viene passato un argomento, ad esso viene assegnato il valore di default specificato, invece del valore undefined. ad esempio, la chiamata somma() senza argomenti restituirà il valore 0 anzichè NaN

//  -->Rest parameter (oppure argomenti aggiuntivi): novita di EcmaScript6
//espio: Supponiamo di voler definire una funzione che implementa diverse operazioni aritmetiche e prende come primo argomento il nome dell’operazione da eseguire ed a seguire un numero variabile di valori su cui effettuare l’operazione
function eseguiOperazione(x, ...y){ //...y <=> ARRAY
  var z = 0;
  switch(x){
    case "somma":
      for(i in y)
        z += y[i];
      break;
    case "moltiplica":
      for(i of y)
        z *= i;
      break;
    case "dividi": z = y[0]/y[1];
      break;
    default: z = NaN;
      break;
  }
  return z; 
}
var v1 = eseguiOperazione("somma", 12, 54, 2, 7, 12); //v1 = 87
var v2 = eseguiOperazione("moltiplica", 4, 11, 32);   //v2 = 1408
var v3 = eseguiOperazione("dividi", 45, 9, 6, 17);    //v3 = 5

//  -->spread operator(new in EcmaScript6): è quando il REST PARAMETER è usato nella chiamata di funzioni:
var addendi = [8, 23, 9, 2, 3, 1];
var v = somma(...addendi); // v = 46

/*============================== Funzioni predefinite==================*/
/*
    --> parseInt() e parseFloat() pemettono di convertire una string in un Intero o in un float

    --> bool isNaN(param): return true if param is NaN. else return false

	-->bool isFinite(param): return true if param is not Infinite or NaN. else return false

	--> escape(string ): restituisce la codifica una stringa lasciando inalterate cifre, lettere e i caratteri + - * /._@ 
		exple: var stringa = escape("Questa è una stringa!");
				il che da: Questa%20%E8%20una%20stringa%21
	
	-->unescape(string ): fa il contrario di escape().
	exple: unescape(Questa%20%E8%20una%20stringa%21) => "Questa è una stringa!"
	
	-->encodeURI(string ) e decodeURI(string ) sono le nuove versioni di escape(string ) e di unescape(string ). Loro escludono i caratteri speciali che escape()/unescape() codificherebbe.

	-->encodeURIComponent(string )/decodeURIComponent(string ): si comportano come encode/decodeURI. pero, codificano i caratteri speciali non codificati da encode/decodeURI. 
	
	exple: var param = encodeURIComponent("Che cos'è?");
	var encodeURI = encodeURI("http://www.html.it/a b.php?x=") + param;

	Il valore finale della variabile encodedURI sarà:
	http://www.html.it/a%20b.php?x=Che%20cos'%C3%A8%3F


	--> eval(string ): valuta o esegue la stringa passata come parame come se fosse codice JavaScript.

	exple:  var x = eval("5 + 1"); //x = 6
			var z = eval("x + 1"); //z = 7
			eval("var a = 4; a = a *3;"); //a = 12
			a = a + 1; //a = 13

	*/
	
/*=====================================================================*/
/*=====================================================================*/
