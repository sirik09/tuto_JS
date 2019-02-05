//45) SERIALIZZAZIONE DEGLI OGGETTI IN JS: JSON===================================
/*
    serializzazione: è la capacità di memorizzare i dati o di rappresentarli in
        mododa poterlu trasferire tra programmi anche in ambito diversi.

    JSON(JavaScript Object Notation)
        un ogg in JS è rappresntato cosi: {nome: "Mario", cognome: "Rossi"}
        l'equivalente JSON è: '{nome: "Mario", cognome: "Rossi"}'

        js: [1, "test", true]
        json: '[1, "test", true]'
*/

//esistono dei "parser" nativi per la serializzazione e la deserializzazione di ogg js. parse() e stringify()
var v1= JSON.parse('{nome: "Mario", cognome: "Rossi"}');// da json a js
var jsonV1 = JSON.stringify({nome: "Mario", cognome: "Rossi"});//da js a json

//46) PRINCIPI DI OOP IN JS=======================================================
//incapsulamento: i membri di oggetti def in JS hanno livello di accesso: PUBLIC.
function persona() {
	this.nome = "";
	this.cognome = "";
	this.email = "";
	this.mostraNomeCompleto = function() {/*...*/};
}
var marioRossi = new persona();
marioRossi.nome = "Mario";
marioRossi.cognome = "Rossi";
marioRossi.email = "mario.rossi@html.it";
//Un tipico membro privato in un oggetto JS è una variabile locale definita nel costruttore:

function persona(nome, cognome) {
	var privNome = nome;
	var privCognome = cognome;
	var privEmail = "";
	this.nome = privNome;
	this.cognome = privCognome;
	this.email = privEmail;
	this.mostraNomeCompleto = function() {
		console.log(this.nome+' '+this.cognome);
	};
}
//fare uso di variab locali all'interno del costruttore di un oggetto ha per vantaggio di poter effettuare dei test/verifiche sui membri o prop che stiamo def

function persona(nome, cognome) {
	var privNome = nome;
	var privCognome = cognome;
	var privEmail = "";
	function isValidEmail(value) {
		return true; // è solo per prova, non verifica nulla
	}
	this.nome = privNome;
	this.cognome = privCognome;
	this.getEmail = function() { return privEmail; };
    this.setEmail = function(value) {
				if (isValidEmail(value)) privEmail = value;
	};
	this.mostraNomeCompleto = function() {
				console.log(this.nome+' '+this.cognome+' '+this.getEmail());
	};
}

function persona(nome, cognome, protectedInfo) {
	var privNome = nome;
	var privCognome = cognome;
	var privEmail = "";
	protectedInfo =  protectedInfo || {};
	protectedInfo.codiceInterno = "12345ABC";
	function isValidEmail(value) {
		return true; // è solo per prova, non verifica nulla
	}
	this.nome = privNome;
	this.cognome = privCognome;
	this.getEmail = function() {return privEmail;};
	this.setEmail = function(value) {
				if (isValidEmail(value)) privEmail = value;
	};
	this.mostraNomeCompleto = function() {
				console.log(this.nome+' '+this.cognome+' '+this.getEmail());
	};
}
function programmatore(nome, cognome) {
	var protectedInfo = {}; // creiamo una oggetto privato per avere un riferimento
	// facciamo in modo che il valore sia impostato dalla classe padre
	persona.call(this, nome, cognome, protectedInfo);
	this.codice = protectedInfo.codiceInterno;
	this.linguaggiConosciuti = [];
}

//EREDITARIETA: JS non supporta l'ereditarieta multipla
function programmatore() { //def il costruttore programmatore
	this.linguaggiConosciuti = [];
}
programmatore.prototype = new persona(); //aggiungo al costruttor programmatore il prototipo di una persona
var marioRossi = new programmatore();
//equivalente a :
function programmatore() { //invochiamo direttamente il costruttore/prototipo di persona in programmatore 
	persona.call(this);
	this.linguaggiConosciuti = [];
}
var marioRossi = new programmatore();


/*Polimorfismo
    overloading, la possibilità di prevedere metodi che manipolano tipi di dato diversi;
    
    polimorfismo parametrico, la possibilità di prevedere tipi generici, non conosciuti a priori;

    polimorfismo per inclusione, la possibilità di avere espressioni il cui tipo può essere rappresentato da una classe e dalle classi da essa derivate.

    Tra l’altro, a differenza dei linguaggi fortemente tipizzati, non è necessario avere due o più definizioni diverse in base al tipo. Ad esempio, mentre in C# dobbiamo ricorrere ad una definizione del genere:

    public string Add(int x, int y){
        return x + y;
    }
    public string Add(string x, string y){
	    return x + y;
    }

    in JavaScript definiamo un solo metodo:

    function Add(x, y) {
        return x + y;
    }
*/

//47) GESTIONE DELLE ECCEZIONI====================================================
//per gestire un error rilevato a RUNTIME, possiamo fare uso del blocco TRY/CATCH
var x = 0;
try {
	func(); //func() non è stata definita, la sua chiamata genererà un’eccezione che verrà catturata e gestita all’interno del blocco catch
	x = x + 1;
} catch(e) {
	console.log(e.message);  // func is not defined
}
console.log(x);  //0

//try...catch prevede anche la closula FINALLY che contiene del codice che viene eseguito in tutti i casi(eccezione sollevata o no).
var x = 0;
try {
	func();
	x = x + 1;
} catch(e) { //l'ogg "e" ha 2 prop: {e.name = tipo errore*** e.message = messaggi}
	console.log(e.message);  // func is not defined
} finally {
	x = x - 1;
}
console.log(x);  // -1

try {
	//Blocco di codice
} catch(e) {
	switch (e.name) {
		case "ReferenceError":
			console.log("Variabile o funzione non definita");
			break;
		case "TypeError":
			console.log("Non è stato utilizzato il tipo di dato previsto");
			break;
		/*...*/
	}
}

//di fronte a certe situazioni, il programmatore può decidere di lanciare un eccezione facendo uso di THROW
function convalidaEmail(value) {
	var emailRegExp = /\w+@\w+\.\w{2,4}/i;
	if (emailRegExp.test(value)) {
		return true;
	} else {
		throw new Error("Email non valida!");
	}
}