//creare oggetti con Object.create()======================================
/*
    nella sua forma minima, il metodo Object.create() permette di creare 
    oggetti specificando il prototipo di riferimento
*/
var persona = Object.create(null);
/* in sto caso, persona non ha nessuna prop ne metodi, nemmeno quelli eriditati da Object. <=> persona è UN OGGETTO VUOTO al 100% */
//alternativa a: var persona = Object.create(null) è:
var persona = Object.create(Object.prototype);

//Espio con def del costruttore
function persona(nome, cognome) {
	this.nome = (nome || "");
	this.cognome = (cognome || "");
}
persona.prototype.indirizzo = ""; //aggiunto di una prop
persona.prototype.email = "";     //aggiunto di una prop
persona.prototype.mostraNomeCompleto = function() {return this.nome + " " + this.cognome};//non si puo fare uso di arrow function nella def di un oggetto oppure con la NEW
persona.prototype.calcolaCodiceFiscale = function() {/*...*/};

//espio di uso di create su un oggetto generico
var marioRossi = Object.create(persona.prototype);

//espio di uso di create con il costruttore "persona"
var marioRossi = Object.create(
    persona.prototype,
    {
        nome:    { value: "Mario" },
        cognome: { value: "Rossi" }
    }); //Questo assegnamento crea l’oggetto marioRossi basato sul prototipo persona e con le proprietà nome e cognome inizializzate

//decrittori delle proprieta=============================================
/*
    Un descrittore è un oggetto che definisce caratteristiche e modalità di accesso alle proprietà di un oggetto. Possiamo distinguere due tipi di descrittori:

    =>data descriptor: un oggetto che definisce una proprietà specificando una serie di caratteristiche predefinite;
    
    =>accessor descriptor: descrive una proprietà tramite una coppia di funzioni di tipo getter e setter.
    Espio:
*/
var marioRossi = Object.create(
	persona.prototype, {
		nome: {
			value        : "Mario",
			writable     : false,
            configurable : false 
        },
		cognome: {
			value        : "Rossi",
			writable     : false,
            configurable : false 
        },
		indirizzo: {
			value        : "",
			writable     : true,
            configurable : true 
        },
		email: {
            value: "", writable: true, configurable: true
        },
		nomeCompleto: {
			configurable: true,
			get: function() {return this.nome + " " + this.cognome;}
		}
    }
);

/*
    le opzioni disponibili per la definizione di una proprietà tramite un DATA DESCRIPTOR sono:

    ==>writable: boolean: indica se il valore della prop può essere modif
    
    ==>configurable: boolean: indica se il tipo di descrittore può essere modificato e se la prop puo essere rimossa (facendo uso della "delete")

    ==>enumerable:boolean: indica se la prop è accessibile durante un ciclo sulle prop dell'oggetto.

    ==>value: indica il valore della prop
*/

/*
    le opzioni disponibili per la def di 1a prop tramite ACCESSOR DESCRIPTOR sono:

    ==>configurable: boolean: indica se il valore della prop puo essere modificato

    ==> enumerable: boolean: indica se la prop è accessibile durante un ciclo sulle prop dell'oggetto

    ==> get: funzione senza parametri invocata qdo si accede ad un prop solo in LETTURA

    ==> set: funzine chiamata qdo si accede ad 1a prop in SCRITTURA, il nuovo valore della prop viene passato come parametro
*/
var marioRossi = Object.create(
	persona.prototype, {
		nome: {
			value        : "Mario",
			writable     : false,
            configurable : false 
        },
		cognome: {
			value        : "Rossi",
			writable     : false,
            configurable : false 
        },
		indirizzo: {
			value        : "",
			writable     : true,
            configurable : true 
        },
        _email: {//ESPIO CON ACCESSOR DESCRIPTOR
            value: "",
            writable: true, 
            configurable: true 
        },
        email: {
	        get: function() {
			    return this._email;
	        },
	        set: function(value) {
		        var emailRegExp = /\w+@\w+\.\w{2,4}/i;
		        if (emailRegExp.test(value)) {
			        this._email = value;
		        } else {
			        console.log("Email non valida!");
		        }
	        }
        },
        //Facciamo ricorso in questo caso a due proprietà: la prima, _email, intesa per contenere il valore e la seconda, email, definita tramite get e set per gestire l’accesso al valore della proprietà. Nel caso specifico, l’opzione set dell’accessor descriptor verifica che il valore da assegnare sia effettivamente un’indirizzo di email formalmente valido
		nomeCompleto: {
			configurable: true,
			get: function() {return this.nome + " " + this.cognome;}
		}
    }
);

//uso di Object.create() per la creazione di 1 costruttore per un oggetto derivato da "persona"
function programmatore(nome, cognome){
    persona.call(this, nome, cognome);
    this.linguaggiConosciuti = []
}
programmatore.prototype = Object.create(persona.prototype);
//Come possiamo vedere, abbiamo invocato la funzione che definisce il costruttore di persona tramite il metodo call() in modo tale da mappare un’istanza dell’oggetto persona sull’oggetto programmatore. In pratica, l’effetto che otteniamo è l’esecuzione del corpo della funzione persona() all’interno della funzione programmatore(), riportando di fatto su programmatore le inizializzazioni previste per persona. Aggiungiamo quindi a programmatore una nuova proprietà linguaggiConosciuti. Infine, tramite Object.create(), impostiamo il prototipo di programmatore facendolo puntare a quello di persona

//39: DIFFERENZE TRA PROG OGG(JAVA/C#) E PROG OGG PROTOTIPALE(JS)=========
//dopo tante discussioni, è stato deciso che si puo definire qualcosa piu o meno vicino ad una classe in JS. espio:
class persona {
	constructor(nome, cognome) { //costruttore
		this.nome = nome;
		this.cognome = cognome;
		this.email = "";
		this.indirizzo = "";
	}
	mostraNomeCompleto() { //method
		return this.nome + " " + this.cognome;
	}
}
//uso:
var marioRossi = new persona("Mario", "Rossi");

//espio piu completo:
class persona {
	constructor(nome, cognome) {
		this.nome = nome;
		this.cognome = cognome;
		this._email = "";
		this.indirizzo = "";
	}
	mostraNomeCompleto() {
		return this.nome + " " + this.cognome;
	}
	get email() { return this._email; }
	set email(value) {
		var emailRegExp = /\w+@\w+\.\w{2,4}/i;
		if (emailRegExp.test(value)) {
			this._email = value;
		} else {
			console.log("Email non valida!");
		}
	}
}

//espio di ereditarieta in JS
class programmatore extends persona{
    constructor(nome, cognome){
        super(nome, cognome);
        this.linguaggiConosciuti = [];
    }
    //eventuali metodi sotto
}

//40 REFLECTION IN JS=====================================================
//==>reflection: è la capacita di analizzare a runtime la struttura degli elti e dei dati di un programma. espio:
var persona = {
	nome: "Mario",
	cognome: "Rossi",
	mostraNomeCompleto: function() {
		return this.nome + " " + this.cognome;
	}
};
//possiamo elencare i membri di persona con un ciclo for..in opp for..of
var p;
for(p in persona) 
    console.log(p);//Il risultato che otterremo sarà l’elenco dei nomi delle proprietà e dei metodi dell’oggetto persona.ad ogni ciclo otteniamo il nome del membro di un oggetto

for (p in persona) 
    console.log(persona[p]); //elenca i valori associati a ciascun membro

//for...of: consente di accedere ad ogni ciclo direttamente al valore del membro dell’oggetto su cui stiamo iterando.

for (p in persona) {
    if (typeof persona[p] == "function") 
        console.log(p);
}//stampa soltanto i metodi di un oggetto di tipo persona

for (p in persona) {
	if (typeof persona[p] != "function") console.log(p);
}//stampa solo le prop di un oggetto di tipo persona.
                
            /*NOTA: Oltra a function, tra i possibili valori restituiti 
            dall’operatore typeof abbiamo undefined, object, boolean, number e string, il cui significato è abbastanza evidente*/

var x = 'nomeProprioeta' in oggetto; //verifica a runtime se "nomeProprieta" è una prprieta dell'oggetto "oggetto". x = true se l'espressione è vera. altrimenti, x = false
if('nome' in persona) {
    console.log(persona.nome);
} else {
    console.log("L'oggetto persona non contiene una proprietà 'nome'");
}

//1 moyen de faire la difference entre les methodes et prop d'une classe base et celles d'une classe derivée, on peut use:
for (p in persona) {
	if (typeof persona[p] != "function" && persona.hasOwnProperty(p))
		console.log(p);
} //stampa i nomi delle prop non derivate da un prototipo

var y = marioRossi instanceof persona; // y = true sse marioRossi è un oggetto vero e proprio della classe persona. se marioRossi è un oggetto appartenente ad una classe derivata da persona, allora, y = false.

