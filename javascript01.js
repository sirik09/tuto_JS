"use strict";
//===================Object JavaScript: proprietà, metodi, this=========

//creazione di un oggetto:
var oogettoVuoto = {}; //oggetto senza proprieta
var persona = {"nome":"Mario", "cognome":"Rossi"};
//proprietà = nome; valore = Mario
var pers1 = {nome:"Mario", cognome:"Rossi"};
//quando il nome della proprieta non segue le regole per la creazione di un nome allora, L'UTILIZZO DEI DOPPI APICI " " E OBBLIGATORIO.
var pers2 = {"primo-nome":"mario", "secondo.nome": "rossi"};

//oggetti annidati:
var pers3 = {
    nome: "Mario",
    cognome: "Rossi",
    indirizzo:{
        via: "Via Garibaldi",
        numero: 15,
        Cap: "00100",
        citta: "Roma"
    }
};

pers3.eta = 32; //ceci ajoute la prop eta à l'objet pers3
//accedere alle proprietà di un oggetto:
var nomePers1 = pers1.nome; //Mario
//se il nome della prop non segue le regole di creazione dei nomi, allora:
var nomePers2 = pers2["primo-nome"];//Mario

function visualizzaNomeCognome() {
    return "Mario Rossi"; 
}
persona.nomeCognome = visualizzaNomeCognome;

//metodo anonimo: metodo senza nome: ritorna sempre Mario Rossi
persona.nomeCognome = function () { return "Mario Rossi"; }

//ritorna nome+cognome della persona "this"
persona.nomeCognome = function () {
    return this.nome + " " + this.cognome; 
}

//per oggetti != dai tipi primitivi(numero, string), l'assegnazione si fa per rifermiento

//--> per tipi primitivi, il passaggio di parametri si fa per valore
var x = 10;
var y = x;
y = y + 1; // y = 11; x = 10

//--> per tipi complessi(oggetti), il passaggio di param si fa per riferim
var persona = {nome:"Mario", cognome: "Rossi"};
var pers1 = persona;
pers1.nome = "Guiseppe"; //persona = Giuseppe Rossi; pers1 = "Giuseppe Rossi".

var persona = {};
persona.nome = "Mario";
persona.cognome = "Rossi";

//le 3 righe qua sopra sono equivalenti alle seguenti :
var persona = new Object(); //creazione di una nuova istanza di un oggetto
persona.nome = "Mario";
persona.cognome = "Rossi";

var num = new Object(2); //num = 2
var num = new Object(3*2); //num = 6
var str = new Object("test0");
var persona = new Object({nome: "Mario", cognome: "Rossi"});

//metodi associati a Object:

//  -->ToString()
str.toString(); //test0
persona.toString(); //[object Object]. essendo un oggetto complesso, devo implementare il suo metodo toString()

//  -->valueOf(): ritorno il contenuto di una variab primitiva(int /string)
var x = new Object(10); 
x.valueOf(); // 10

//====================Number, l’oggetto per rappresentare i numeri =======
var x = new Number(123);
var y = new Number(3.14);

/*prop di Number: proprietà sono specifiche dell’oggetto Number e non vengono trasmesse alle singole istanze. le diverse proprietà di Number sono: 

Number.EPSILON: La più piccola differenza tra la rappresentazione di due numeri (ECMAScript 6)
Number.MAX_VALUE: Il più grande numero positivo rappresentabile
Number.MIN_VALUE : Il più piccolo numero positivo rappresentabile diverso da zero
Number.NaN: Un valore non numerico
Number.NEGATIVE_INFINITY: Rappresenta il valore infinito negativo
Number.POSITIVE_INFINITY: Rappresenta il valore infinito positivo
*/

//==================alcune costanti della classe statica Math
var x = 1;
if (x > Math.PI) {
	console.log("Valore maggiore di pi greco");
}
console.log("Il doppio di pi greco è " + Math.PI * 2);

//alcune metodi della classe Math
Math.max(89, 13, 6.4, 49, 87.2, 121, 40);	//121
Math.min(89, 13, 6.4, 49, 87.2, 121, 40);	//6.4
Math.pow(4, 3);	//4³ = 64
Math.sqrt(144);	//12
Math.ceil(3.4);	//4
Math.floor(3.4)	//3
Math.round(3.4)	//3
Math.round(3.6)	//4
Math.abs(-3.6); //3.6

//random(): genera un numero casuale compreso tra 0 e 1. 
//tips: Combinando opportunamente questo metodo con il metodo floor() è possibile generare interi casuali compresi tra un minimo ed un massimo arbitrari

//genera un num a caso compreso tra min e max
function generaInteroCasuale(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//=================alcuni metodi e prop della classe String===============
var x = new String("a new string");
var y = x + "an old one";

//alcunimetodi di String
var x = new String("Una nuova stringa");
var y = x.length;//17

//extract a character from a string
var x = "Una nuova stringa".charAt(2);  //x = a
var x = "Una nuova stringa"[2];         //x = a; approccio Read-Only

//Replace: sostituire la prima occorrenza di un stringa passata come prama in una seconda stringa
var x = "Una nuova stringa".replace("s", "S"); //cerca e sostituisce la prima occorrenza di "s" con "S" 

//IndexOf, individuare l'indice della prima occorrenza di una stringa
var x = "una nuova stringa".indexOf("nuova"); //x = 4
var x = "Una nuova stringa".indexOf("a", 4); //x = 8; ritorna la prima posizione della prima occorrenza di "a" partendo dalla posizione 4.

//lastIndexOf(): fa l'opposto di indexOf localizzando l'ultima occorrenza
var x = "Una nuova stringa".lastIndexOf("n");  //   x = 14
var x = "Una nuova stringa".lastIndexOf("n", 5); //x = 4

var x = "Una nuova stringa".match("nuova"); //faremo uso di match con le RegExp

// substr() ci consente di estrarre una sottostringa di una lunghezza "a" a partire da una posizione "b". "a" e "b" sono degli interi
//var myVar = "...string exple".substr(a, b);
var x = "Una nuova stringa".substr(4, 5); //x = "nuova"

//substring(): estrae una sottostringa compresa tra due posizioni
var x = "Una nuova stringa".substring(4, 9);    //x = "nuova"

//producono lo stesso risultato
var x = "Una nuova stringa".substring(4, 9);
var y = "Una nuova stringa".substring(9, 4);

/*
-->slice(ha un comportamento diverso da substring)

-->slice() prevede due argomenti, di cui il secondo opzionale, che rappresentano le posizioni estreme della sottostringa da estrarre

-->se uno degli argomenti di substring() è negativo, esso viene trattato come zero, mentre per slice() un valore negativo indica una posizione relativa alla fine della stringa

-->Se il primo parametro di substring() è maggiore del secondo parametro, JavaScript li scambia.

*/
var x = "Una nuova stringa".substring(4, -2);
//la riga di prima equivale a: var x = "Una nuova stringa".substring(0, 4)
var y = "Una nuova stringa".slice(4, -2); //equivale a: var y = "Una nuova stringa".slice(4, 17)

//split senza parametro(separatore) ritorno la stringa completa
//split ritorna un array
var x = "Una nuova stringa".split();
//x == ["Una nuova stringa"]

//si passa il separatore a split come parametro
var x = "Una nuova stringa".split("n");// ["U", "a ", "uova stri", "ga"]

//Per ottenere l’array dei caratteri di una stringa possiamo passare a split() la stringa vuot
var x = "Una nuova stringa".split("");
//x == ["U", "n", "a", " ", "n", "u", "o", "v", "a", " ", "s", "t", "r", "i", "n", "g", "a"]

//il secondo parametro specifica la dimensione dell'array che split dovrebbe ritornare
var x = "Una nuova stringa".split("", 5);
//x == ["U", "n", "a", " ", "n"]

//trim(): elimina gli spazi iniziali e finali di una stringa.
//startsWith() e endsWith(): verificano se una stringa inizia o finisce con la stringa specificata come argomento:
var x = "   Una nuova stringa   ".trim();   //x == "Una nuova stringa"
var y = "Una nuova stringa".startsWith("Una");  //true
var z = "Una nuova stringa".endsWith(".");	    //false

//String e HTML
var x = "Una nuova stringa".anchor("test");
var y = "Una nuova stringa".italics();
var z = "Una nuova stringa".bold();
//x == "<a name='test'>Una nuova stringa</a>"
//y == "<i>Una nuova stringa</i>"
//z == "<b>Una nuova stringa</b>"

//==========================template string===============================
    //template string permettono di risolvere i problemi di composizione di una stringa complessa con estrema semplicità. Una template string è una sequenza di caratteri delimitata da backtick (`). per digitare backtrick sulla tastiera italiana, faccio ALT+96
    var messaggio = `Questo è un messaggio!`;

    //espio di String Template
var messaggio = `Attenzione!\nIl valore inserito ${valore} non è valido perché esso deve essere compreso tra ${valoreIniziale} e ${valoreFinale}.\nSi prega di riprovare.`;

var somma = `La somma di ${a} e ${b} è ${a+b}`;

//Tagged Template String: 
    //sono delle template string precedute da un tag scelto dal programmatore. In sto caso, il tag è: maiuscola
    
    //maiuscolo: indica che sulla template string sarà effettuata una elaborazione definita da una funzione con lo stesso nome. Infatti, il nome del tag corrisponde a una funzione.

    //il primo parametro della funzione rappresenta un array di stringhe, ciascuna rappresentante la sottostringa della template string che separa due espressioni. Ad essere precisi l’array conterrebbe quattro stringhe, dal momento che nel nostro caso l’ultimo elemento è rappresentato da una stringa vuota.
    //strings:Array[4]
    //0: "La somma di "
    //1: " e "
    //2: " è "
    //3: ""
var somma = maiuscolo`La somma di ${a} e ${b} è ${a+b}`;
function maiuscolo(strings, a, b, c) {
	return (`${strings[0]}${a}${strings[1]}${b}${strings[2]}${c}`).toUpperCase();
}


//Encoding delle URL con le template string
    //La possibilità di modificare l’output di una template string tramite un tag si presta a diverse applicazioni. A titolo d’esempio delle sue potenzialità riportiamo la seguente funzione che implementa un tag che assicura la validità nella costruzione di un URL:
function safeUrl(strings, protocol, params) {
	return `${protocol}${strings[1]}${encodeURIComponent(params)}`;
}
var protocol = "http";
var params = "a:b";
console.log(safeUrl`${protocol}://www.html.it/page?x=${params}`);