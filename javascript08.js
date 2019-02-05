//48) DESIGN PATTERN IN JS========================================================
/*
    Design Pattern: 
        rappresentano schemi logici di risoluzione di un problema riusabili e 
        indipendenti dal linguaggio di programmazione ed offrono un modello di 
        riferimento per la realizzazione di componenti software facilmente 
        manutenibili.
    
    I design Pattern sono raggrupati in 3 principali categorie:
        a)Pattern Creazionale: 
            si occupa della creazione di classi e oggetti; anche se a prima vista 
            può sembrare un problema banale, in applicazioni complesse può 
            risultare utile controllare il modo in cui vengono creati gli oggetti.
                --> SINGLETON PATTERN
                --> FACTORY PATTERN

        b)Pattern Strutturali:
            L’obiettivo dei pattern strutturali è di fornire un modo per gestire 
            le relazioni tra gli oggetti, per rendere scalabile l’architettura di 
            un’applicazione, cioè perché variazioni in una parte 
            dell’applicazione abbiano un impatto minimo nelle altri parti.
                --> MODULE PATTERN
                --> ADAPTER PATTERN
                --> FACADE PATTERN
                --> MVC/MVVM PATTERN

        c)Pattern Comportamentali:
            Il focus di questo tipo di pattern è sulla comunicazione tra gli 
            oggetti di un’applicazione. Tra i pattern di questa categoria vedremo 
            solo:
                --> OBSERVER PATTERN
*/

//49) SINGLETON PATTERN(pattern creazionale): ====================================
/*
    Il Singleton Pattern è un pattern che prevede l’esistenza di un’unica istanza 
    di un oggetto. Per un linguaggio di programmazione basato sulle classi questo 
    significa che una classe può essere istanziata una sola volta e che gli 
    eventuali tentativi di creare una nuova istanza della classe ottengono 
    l’istanza già creata.

    ==**> OGNI OGGETTO IN JS è un SINGLETON. Pero, è accessibile da tutti
*/
//singleton in JS
var singleton = (function(){
	var instance;
	return {
		getInstance: function() {
			if (!instance) {
                instance = { proprieta: "abc", metodo: function() { /*...*/} 
                };
			}
			return instance;
		}
	};
})();
//Ricorriamo ancora una volta ad una espressione IIFE per proteggere l’istanza effettiva del nostro oggetto. Il risultato dell’espressione assegnata alla variabile singleton è un oggetto con un solo metodo getInstance(). Il singleton vero e proprio sarà creato quando sarà invocato questo metodo, il quale si preoccuperà di verificare se esiste già un’istanza dell’oggetto e solo se non esiste la creerà.
//uso del Singleton
var mySingleton = singleton.getInstance();
console.log(mySingleton.proprieta);	 //"abc"

//50) FACTORY PATTERN (pattern creazionale):======================================
/*
    è un pattern creazionale che ha l’obiettivo di semplificare la creazione di 
    oggetti in situazioni in cui abbiamo un’alta varietà di impostazioni iniziali 
    oppure quando l’istanza di oggetto da creare dipende dal contesto in cui ci 
    troviamo.

    immaginando di dover consentire la creazione di veicoli con caratteristiche 
    specificate al momento della creazione. Il seguente codice mostra come può 
    essere risolto il problema sfruttando il Factory Pattern:
*/
var veicoloFactory = {
	creaVeicolo: function(opzioni) {
		var veicolo;
		if (opzioni && opzioni.length) {
			switch (opzioni.tipo) {
				case "auto":
					veicolo = new Automobile(opzioni);
					break;
				case "moto":
					veicolo = new Moto(opzioni);
					break;
				case "camion":
					veicolo = new Camion(opzioni);
					break;
			}
		}
	}
};
//Abbiamo definito un oggetto veicoloFactory che mette a disposizione il metodo creaVeicolo() il cui compito è la creazione di un oggetto-veicolo con le caratteristiche specificate nelle opzioni. In particolare, l’opzione tipo determina il tipo di veicolo che vogliamo ottenere e fa in modo che all’interno del Factory venga invocato un costruttore diverso.

//Un esempio d’uso del metodo creaVeicolo() è mostrato di seguito:
var myAutomobile = veicoloFactory.creaVeicolo({tipo: "auto", colore: "rosso", modello: "berlina"});
//Dall’esterno dell’oggetto Factory non si ha idea del modo in cui viene generato l’oggetto richiesto. Questo fa sì che l’eventuale aggiunta della possibilità di creare un nuovo tipo di veicolo, ad esempio un autobus, non richieda l’utilizzo di un nuovo metodo, ma riutilizza lo stesso metodo creaVeicolo() con la possibilità di specificare un nuovo tipo
var myAutobus = veicoloFactory.creaVeicolo({tipo: "bus", colore: "giallo"});

// 51) MODULE PATTERN: (Pattern Strutturale) =====================================
// 52) MODULI ====================================================================
/* Un modulo JS è un file contenente del codice JS. UN FILE CONTIENE UN SOLO MODULO. In altre parole, per creare un modulo è sufficiente scrivere del codice JavaScript in un file ed esportare uno o più delle funzionalità implementate.

Esempio di modulo che esporta la funzione somma(x, y)
*/

//export fa capire che la funzione somma è anche accessibile anche dall'esterno.
export function somma(x, y){
    return x+y;
}
function prodotto(x, y){ //prodtto non è accessibile dall'esterno
    return x*y;
}

//possiamo EXPORT funzioni, variabili, constanti, classi... 
//Espio: Il modulo dell’esempio qua sotto esporta, oltra alla funzione somma(), la costante pigreco e la classe Circonferenza.
function prodotto(x, y) {
	return x*y;
}

export function somma(x, y) {
	return x + y;
}

export const pigreco = 3.141592;
export class Circonferenza {
	constructor(raggio) {
		this.raggio = raggio;
    }
}

//si puo esportare piu cose contemporaneamente dopo la loro def
function prodotto(x, y) {
	return x * y;
}
function somma(x, y) {
	return x + y;
}
const pigreco = 3.141592;
class Circonferenza {
	constructor(raggio) {
		this.raggio = raggio;
	}
}
export {somma, pigreco, Circonferenza}; //esportiamo la fzione somma, la costante pigreco, la classe Circonferenza

//COME IMPORTARE UN MODULO IN UN ALTRO MODULO JS (****NAMED EXPORT****)?
/*
    dopo aver def un file contenente un UNICO modulo ad espio (creiamo un file contenente le linee 131...143 e lo chiamiamo "mioModulo.js")

    per importare la funzione somma() in un altro modulo, faccio(nel header del nuovo file js):
*/
import{somma} from "mioModulo"; //dopo l'import, posso usare somma() nel nuovo file JS 
//gli elti importati sono aggiunti allo scope del modulo in cui sono importati
console.log(somma(1, 2));

//come importare piu cose?
import {somma, pigreco} from "mioModulo";

//come specificare un "alias"?
import {somma, pigreco as pigrecopiupreciso} from "mioModulo";
var pigreco = 3.14; //In questo caso abbiamo importato la costante pigreco specificando l’alias pigrecopiupreciso, in modo da evitare un conflitto con la variabile pigreco locale al modulo corrente.

//come importare tutti gli elti esportati da un modulo, posso fare:
import * as Matematica from "mioModulo"; //in sto caso devo specificare un alias.
console.log(Matematica.somma(2, 5));

//DEFAULT EXPORT: Con questa modalità definiamo l’elemento rappresentativo del modulo, quello che viene esportato di default se non diversamente specificato. Ad esempio, riprendendo il codice visto prima, possiamo definire la funzione somma() come l’elemento di default del nostro modulo:
function prodotto(x, y) {
    return x*y;
}
export default function (x, y) { //export default: E' POSSIBILE ESPORTARE UN UNICO ELTO COME DEFAULT
    return x + y;
}
const pigreco = 3.141592;
class Circonferenza {
    constructor(raggio) {
        this.raggio = raggio;
    }
}
export {pigreco, Circonferenza};

//come importare un elto di DEFAULT in un altro modulo?
import somma from "mioModulo"; //elto importato senza parentesi graffe


// 53) ADAPTER e FACADE PATTERN (pattern Strutturali):============================
/*      I pattern Adapter e Façade permettono di sostituire all’interfaccia               originale di un oggetto, un’interfaccia che risponda meglio alle                  necessità di un progetto.

ADAPTER PATTERN:
        Supponiamo, ad esempio, che il vecchio oggetto da sostituire abbia la seguente struttura:
*/
var vecchioObj = function() {
this.metodo = function (x) { /*...*/};
}; 
//e venga utilizzato nella nostra applicazione nel seguente modo:
var obj = new vecchioObj(); obj.metodo(123);
//Ora immaginiamo che il nuovo oggetto abbia questa struttura:
var nuovoObj = function() {
	this.nuovoMetodo = function(x) { /* ... */};
};

//Per evitare di dover sostituire dappertutto la creazione del nuovo oggetto e la chiamata a metodo() con la chiamata a nuovoMetodo(), creiamo un adapter come il seguente:

//1) definiamo il nuovo oggetto/metodo...
//2) redefiniamo il vecchio oggetto/metodo a partire dal nuovo oggetto/metodo...
var vecchioObj = function() {
	var myObj = new nuovoObj();
	this.metodo = myObj.nuovoMetodo;
};

/*
FACADE PATTERN:
    ha l’obiettivo di fornire un’interfaccia di alto livello per una funzionalità,nascondendo la complessità sottostante.

    Supponiamo ad esempio che per effettuare una certa elaborazione bisogna coinvolgere diversi oggetti invocando determinati metodi e controllando i rispettivi esiti. Adottando il Pattern Façade costruiremo un metodo di semplice invocazione che si occupa di svolgere la parte complessa coordinando gli oggetti coinvolti. ESPIO:
*/
//cilindro è un oggetto "complesso" composto da altri oggetti (cerchio e rettangolo)
var cilindro = function() {
	this.calcolaArea = function(raggio, altezza) {
		var areaBase = cerchio.calcolaArea(raggio);
		var circonferenzaBase = cerchio.calcolaCirconferenza(raggio);
		var areaLaterale = rettangolo.calcolaarea( circonferenzaBase, altezza);
		return (areaBase * 2) + areaLaterale;
	};
}

// 54) MVC/MVVM PATTERN: (Pattern Strutturali): ==================================
/*
    Model:  
        Rappresenta i dati da gestire tramite l’interfaccia utente

    View: 
        Corrisponde all’insieme degli elementi dell’interfaccia utente che mostrano i dati del Model, cose come label, caselle di testo, immagini, etc.

    Controller
        È il componente che fa da collante tra il Model e la View e definisce le funzionalità dell’applicazione; in pratica il Controller implementa la relazione tra il Model e la View.

    Per fissare meglio le idee, immaginiamo di dover creare un’interfaccia Web per la gestione di dati anagrafici. I ruoli del pattern MVC andranno così suddivisi:

    --> il Model sarà costituito dall’oggetto che rappresenta una persona;
    --> la View dall’HTML che mostra i dati della persona e ne permette l’interazione con l’utente, come ad esempio il salvataggio dopo una modifica;
    il Controller da un oggetto che si occuperà di fornire i dati da mostrare alla View e di gestire i comandi impartiti dall’utente.

    Alla luce di queste considerazioni, possiamo scrivere il seguente codice HTML per l’interfaccia Web:

<label for="txtNome"><input id="txtNome" type="text" value=""/><br/>
<label for="txtCognome"><input id="txtCognome" type="text" value=""/><br/>
<button id="btnSalva"/>Salva</button><br/>

tutto quanto scritto qua sopra sarà gestito da codice JS:
*/

var model = { nome: "Mario", cognome: "Rossi" };
var view = {
		txtNome: document.getElementById("txtNome"),
		txtCognome: document.getElementById("txtCognome"),
		btnSalva: document.getElementById("btnSalva")
};
var controller = {
	init: function() {
		view.txtNome.value = model.nome;
		view.txtCognome.value = model.cognome;
		view.btnSalva.onclick = controller.salva;
	},
	salva: function() {
		model.nome = view.txtNome.value;
		model.cognome = view.txtCognome.value;
		//invia il model al server
		invia(model);
	}
};
/*Per la definizione dell’oggetto view abbiamo fatto ricorso all’oggetto "document", che fa parte del DOM (Document Object Model = il modello a oggetti delle pagine HTML) . Per il momento ci basta sapere che tramite il metodo getElementById() di questo oggetto abbiamo accesso agli elementi definiti nella pagina HTML che rappresenta la nostra interfaccia Web.

L’oggetto controller ha due metodi:

init(), che inizializza la view associando a ciascun elemento grafico il corrispondente valore dell’oggetto model;
salva(), che assegna all’oggetto model i valori prelevati dall’oggetto view ed invia il model al server tramite un’ipotetica funzione invia().

Notiamo che la funzione init() si occupa anche di assegnare al click sul pulsante btnSalva l’esecuzione del metodo salva() del controller.
*/

/*MVVM = MODEL VIEW VIEW-MODEL
    Una variante del pattern MVC è MVVM, Model View ViewModel. Questo pattern propone un ruolo più attivo della View rispetto a MVC: la View è in grado di gestire eventi, eseguire operazioni ed effettuare il data-binding. In questo contesto, quindi, alcune delle funzionalità del Controller vengono inglobate nella View, la quale si appoggia su un’estensione del Model: il ViewModel
*/

//PATTERN OBSERVER (Pattern Comportamentale): ===================================
/*
    Observer: 
        è un ogg che vuole essere avvisato del verificarsi di certe variazioni di stato di un altro oggetto (observable). Per far ciò si registra (subscribe) per ricevere notifiche di queste variazioni.

        In base alla definizione classica del pattern, l’observer deve avere la possibilità di annullare la registrazione(subscribe) se non è più interessato all’osservazione dell’observable.

        Supponiamo che un oggetto abbia il compito di propagare messaggi che possono interessare altri oggetti.
        --> OBSERVABLE: è l'ogg che propaga un messaggio.
        --> OBSERVER: sono ggetti interessati ai messaggi. Observer si REGISTRA presso OBSERVABLE.

L’observable implementerà i metodi per registrare e annullare la registrazione ed un metodo per inserire un nuovo messaggio:
*/

var centraleMessaggi = function() {
	this.listaObserver = [];
};
centraleMessaggi.prototype = {
	subscribe: function(callback) { //aggiung "callBack" alla lista degli observer
		this.listaObserver.push(callback);
	},
	unsubscribe: function(callback) { //rm "callBack" dalla lista degli observer
		for (var i = 0; i < this.listaObserver.length; i++) {
			if (this.listaObserver[i] === callback) {
				this.listaObserver.splice(i, 1); //rm one object which is on pos = i
				return;
			}
		}
	},
	nuovoMessaggio: function(msg) {
		for (var i = 0; i < this.listaObserver.length; i++) {
			this.listaObserver[i](msg);
		}
	}
};
//I metodi subscribe() e unsubscribe() aggiungono e tolgono rispettivamente dall’array listaObserver l’elemento passato come parametro. Nello specifico si tratta di una funzione da eseguire nel momento in cui arriva un nuovo messaggio.

//La notifica dell’arrivo di un nuovo messaggio viene fatta dal metodo nuovoMessaggio() che si occupa di scorrere l’elenco delle funzioni presenti in listaObserver ed eseguirle passando il nuovo messaggio.

//L’observer che vuole ricevere la notifica dell’arrivo di un nuovo messaggio dovrà quindi invocare il metodo subscribe() passando la funzione di callback da eseguire al verificarsi dell’evento
var cm = new centraleMessaggi();
cm.subscribe(function(msg) {
	//...
});

cm.nuovoMessaggio("Questo è un nuovo messaggio!");

/*DECORATOR PATTERN: =============================================================
    è una porzione di codice che viene arricchita da un'altra porzione di codice prima e/o dopo

*/
function logDecorator(myFunct){
    return function(){
        console.log("Inizio esecuzione");
        var result = myFunct.apply(this, arguments);
        console.log("Fine esecuzione");
        return result;
    };
}
//Essa prende in input una FUNZIONE e restituisce una nuova funzione che esegue quella in input arricchendola con la scrittura di messaggi sulla console. La funzione logDecorator() è un decorator. Supponiamo che myFunct fosse:
function somma(x, y){ return x+y;}
var sommaConLog = logDecorator(somma);
console.log(sommaConLog(2, 3));
//Inizio esecuzione
//Fine esecuzione
//5
//Il principale vantaggio dell’applicazione di questo pattern consiste nel separare la logica di più attività componendo più funzioni. Nel nostro esempio abbiamo separato la logica della somma di due numeri da quella della scrittura di un log sulla console, semplificando la comprensione del codice e di conseguenza la manutenibilità

//Decorator in ECMAScript=========================================================
//un decorator è un'espressione che def una funz preceduta da "@" e puo essere applicata ad 1a classe o ai suoi mbri

function myLog(target){
    console.log("Inizio esecuzione");
    var result = target.apply(this, arguments);
    console.log("Fine esecuzione");
    return result;
}

class MyMath{
   
    constructor(){
        /*...*/
    }
    @myLog //indico che vorrei utilizzare myLog ad ogni invoacazione di somma()
    somma(x, y){
        return x+y;
    }
}

//applicazione:
var math = new MyMath();
math.somma(2, 3);
//Inizio esecuzione
//Fine esecuzione
//5

/*vengono passati 3 parametri ad n deconrator
    --> target: è la funzione/membro sul quale viene applicato il decorator

    --> name: è il nome del decorator

    --> descriptor: è il descrittore del membro(è l'oggetto utilizzato per def una prop con "Object.defineProperty()".

    Espio: decorator che trasformi un membro di una classe in sola lettura potremmo procedere nel seguente modo: 
*/
function readOnlyDec(target, name, descriptor){
    descriptor.writable = false;
    return descriptor;
} //abbiamo restituito il descrittore stesso, buona pratica da mantenere per supportare correttamente l’applicazione di più decorator sullo stesso membro.

//espio d'uso di readOnly()
class myMath{
    @readOnlyDec, @myLog
    somma(x, y){ return x+y;}
}

//DECORATOR FACTORY: è una funzione che ritorna un decorator

//ecco una classe MyMath con il metodo somma() in cui ci assicuriamo del tipo di dati della funzione somma()
class MyMath {
    somma(x, y) {
       let result;
       if (typeof x === "number" && typeof y === "number") {
          result = x + y;
       } else {
          throw new Error("Il tipo dei parametri deve essere numerico");
       }
       return result;
    }
}

//un'alternativa molto piu mantenibile è:
class MyMath{
    @validate([ //decorator con input un ARRAY di criteri di validazione
        {type: "number"}, //tipo del param1 di somma
        {type: "number"}  //tipo del param2 di somma  
    ])
    somma(x, y){
        return x+y;
    }
}

//primo esempio di DECORATOR FACTORY:
    // Nell’esempio abbiamo immaginato un decorator validate che prende in input un array di criteri di validazione. Ciascun elemento dell’array corrisponde nell’ordine a ciascun parametro previsto dal metodo somma(). Ciascun criterio di validazione è rappresentato da un oggetto con la proprietà type che esprime il tipo previsto per il relativo parametro.

    //La nostra idea è che il decorator si occupi di verificare se ciascun parametro passato al metodo somma() sia del tipo previsto. Ci troviamo tuttavia di fronte ad una interessante novità rispetto agli esempi di decorator visti finora: questo decorator ha dei parametri. Da quel che sappiamo finora, ad un decorator vengono soltanto passate le tre informazioni relative al membro a cui è associato. Come facciamo a gestire questi nuovi parametri?

    //La soluzione consiste nel ricorrere ad un decorator factory, cioè una funzione che restituisce un decorator. Infatti, se ricordiamo la definizione di decorator, abbiamo detto che esso è una qualsiasi espressione che restituisce una funzione. Quindi non ci resta che provare a scrivere una funzione che prende in input i criteri di validazione e restituisce una nuova funzione che li applica ai parametri passati al metodo somma(). Il seguente codice potrebbe fare al caso nostro: 
function validate(criteriValidazione){ //criteriValidazione <=> array
    return function decorator(target, name, descriptor) {
        for(let i = 0; i< arguments.length; i++){
            if(typeof arguments[i] !== criteriValidazione[i].type)
                throw new Error("tipo di paramtero errato!");
        }
        descriptor.value = function(){
            return target.apply(this, arguments);
        }
        return descriptor;
    }
} //In questo modo abbiamo mantenuto la semplcità del codice del metodo somma() e creato un decorator che può essere riutilizzato in altri contesti analoghi.
