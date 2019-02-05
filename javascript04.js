"use strict";
//============================================SCOPE E CLOSURE di variabili
//===============================================SCOPE CHAIN IN JAVASCRIPT

var saluto = "Buongiorno";
var visualizzaSaluto;
function saluta(persona) {
	var nomeCognome = persona.nome + " " + persona.cognome;
	return function() {
		console.log(saluto + " " + nomeCognome);
	};
}
visualizzaSaluto = saluta({nome: "Mario", cognome: "Rossi"});
visualizzaSaluto(); //Buongionro Mario Rossi

//In JavaScript l’accesso allo scope della sua funzione esterna è consentito anche dopo che questa ha terminato la sua esecuzione

//questa parte non funziona bene
var saluto = "Buongiorno";
var visualizzaSaluti;
function saluta(persone) {
	var nomeCognome;
	var saluti = [];
	for (var i in persone) {
		nomeCognome = persone[i].nome + " " + persone[i].cognome;
		saluti.push(function() {
			console.log(saluto + " " + nomeCognome);
		});
	}
	return saluti;
}
visualizzaSaluti = saluta([{nome: "Mario", cognome: "Rossi"},
                           {nome: "Marco", cognome: "Neri"}]);
for (var i in visualizzaSaluti) {
	visualizzaSaluti[i]();
}
//visualizzaSaluti contiene: Buongiorno Marco Neri
//                           Buongiorno Marco Neri

//correggiamo l'errore di sopra qua sotto
var saluto = "Buongiorno";
var visualizzaSaluti;
function saluta(persone) {
	var nomeCognome;
	var saluti = [];
	for (var i in persone) {
		nomeCognome = persone[i].nome + " " + persone[i].cognome;
		// immediately-invoked function expression:IIFE
		saluti.push((function(nc) {
						return function() {
							console.log(saluto + " " + nc); //Buongiorno nome cognome
						};
					})(nomeCognome));
	}
	return saluti;
}
visualizzaSaluti = saluta([{nome: "Mario", cognome: "Rossi"},
                           {nome: "Marco", cognome: "Neri"}]);
for (var i in visualizzaSaluti) { visualizzaSaluti[i](); }
//Buongiorno Mario Rossi, Buongiorno Marco Neri

//==========================================================ARROW FUNCTION
//sono fzione anonime con sintasse concisa. sono usate come funzioni di callBack
var somma = function(x, y){
    return x+y;
}
console.log(somma(1, 2)); //3

//con funzione ARROW abbiamo:
var somma = (x, y) => x+y;
/*
    equivalenti sintassi sono:
    var somma = (x, y) => {return x+y;}; 
    var mult_2 =  x => x*2;
    console.log(mult_2(4)); //8
    var hello = () => "Hello World";
    console.log(hello()); // Hello World
*/
console.log(somma(1, 2)); //3

//ARROW FUNCTION + CALLBACK
var numeri = [18, 12, 10];
numeri.forEach(function(valore){
    console.log(valore);
});// 18, 12, 10

/*
    alternative con ARROW Function sono:
    ATTENZIONE ALLE ARROW FUNCTION CONTENENTE "this"
	SE UNA FUNZIONE CONTIENE "this", ALLORA è MEGLIO IMPLEMENTARLA NORMALMENTE E CHIAMARLA COME AD ESEMPIO NEL ESEMPIO DI PRIMA cioe 
	chiamarla con uso di Call oppure apply oppure bind
*/
var numeri = [18, 12, 10];
numeri.forEach(valore => console.log(valore));

var numeri = {
	x: 12,
	y: 3,
	calcola: function(operazione) {
		var fn;
		switch (operazione) {
			case '+':
				fn = function() { return this.x + this.y};
			break;
			case '-':
				fn = function() { return this.x - this.y};
			break;
			default:
				fn = function() {};
		}
		return fn();
	}
}
console.log(numeri.calcola('+')); //il risultato ottenuto è NaN. 
//Motivo: la parola chiave this utilizzata nelle funzioni anonime definite all’interno del metodo calcola() non sta indicando l’oggetto numeri, ma il loro contesto di esecuzione.
//l’approccio classico per aggirare questo problema consiste nel definire una variabile all’interno dello scope del metodo calcola() ed assegnargli il valore di this. Un metodo alternativo consiste nel chiamare le funzioni utilizzando bind()

//versione corretta:
var numeri = {
	x: 12,
	y: 3,
	calcola: function(operazione) {
		var fn;
		switch (operazione) {
			case '+':
				fn = () => this.x + this.y;
				break;
			case '-':
				fn = () => this.x - this.y
				break;
			default:
				fn = () => {};
		}
		return fn();
	}
}
numeri.calcola('+');

//limitazioni delle ARROW FUNCTION:
// non possono essere utilizzati nel costruttore di oggetto. non possono essere utilizzate con "new",non possono essere utilizzate per la def di metodi di un oggetto. Espio:
var obj = {
	x: 123,
	mostraValoreFunc: function() { console.log(this.x); },
	mostraValoreArrow: () => console.log(this.x)
};
obj.mostraValoreFunc()  //123
obj.mostraValoreArrow() //undefined. Quindi non si puo le arrow nel COSTRUTTORE di un oggetto né con NEW

//===========================================================OGGETTI IN JS
//un oggetto è un contenitore di proprieta, cioe di elti caratterizzati da un nome ed un valore. espi di oggetti:
var persona = {
	nome:"Mario",
	cognome: "Rossi"
};

var persona1 = new Object({
	nome: "Mario",
	cognome: "Rossi"
});

persona1.indirizzo = "Via Garibaldi 50 - Roma"; //posso aggiungere una prop(indirizzo in sto caso) a un oggetto gia definito.

delete persona1.cognome; //posso eliminare una prop.
var nomiTot = x => (x.nome+" "+ x.cognome); //Mario undefined

//================================costruttori e creazione di oggetti in JS
//per evitare di dover ridefinire oggetti che hanno la stessa struttura, possiamo usare un costruttore che sara REUTILIZZABILE.
//COSTRUTTORE: è una fzione JS invocata mediante la "new". espio:
function Persona(){
	this.nome = "";
	this.cognome = "";
	this.indirizzo = "";
	this.email = "";
	this.mostraNomeCompleto = function(){
		return this.nome+" "+this.cognome;
	},
	this.calcolaCodiceFiscale = function(){
			//codice che elabora il codice fiscale
	}
}
var marioRossi = new Persona();
marioRossi.nome ="Mario"; marioRossi.cognome ="Rossi"; //....

//possiamo specificare alcuni param nella def del costruttore:
function Persona(nome, cognome){
	'use strict'
	this.nome = nome;
	this.cognome = cognome;
	this.indirizzo = "";
	this.email = "";
	//...
}
var marioRossi = new Persona("mario", "rossi");

//===============================================================PROTOTIPI
//come modificare la struttura di una variab(creata a partire da 1 costruttore)? 
//modifico SOLO la var marioRossi aggiungendo un tel:
var marioRossi = new Persona("Mario", "Rossi");
marioRossi.telefono = "0612345678"; //prototipo = Object

//come fare per modif la struttura di tutte le variab def a partire dal costruttore Persona...? basta fare:
Persona.prototype.telefono = "0612345678"; //prototipo = prototype. 
//quest'operazione aggiunge la prop telefono(con valore di default = 0612345678) a tutti gli oggetti Persona.

//quindi per aggiungere prop agli oggetti in JS, basta aggiungere la detta prop al prototipo dell'oggetto in questione. 
//se l'oggetto è def o creato in modo letterale(var myval = {nome: "Mario", cognome: "Rossi"};)allora, il suo prototipo è Object.
//se l'oggetto è def o creato tramite un metodo (costruttore), allora il suo prototipo sarà: NomeFunzione.prototype

//================================================EREDITARIETA PROTOTIPALE
/*
anche gli oggetti predefiniti(String, Number...) in JS hanno un prototipo
di riferimento la cui gestione è analoga alla gestione dei prototipi degli oggetti creati tramite un costruttore.
	Ad espio se vogliamo rendere disponibile una funzionalità a tutti gli oggetti def con: new String();... possiamo: 
*/
String.prototype.padLeft = function(width, char){
	var result = this;
	char = char || " "; //viene scelto " " sse char è null
	//ricordo che y = p1 || p2; <=> y = p2 sse p1 == null
	if (this.length < width)
		result = new Array(width - this.length + 1).join(char) + this;
	return result;	
};

/*
	grazie a questa def, possiamo usare il metodo padLeft(...) come se fosse un metodo predefinito del tipo String. Espio:
*/
console.log("abc".padLeft(10, "x"));
