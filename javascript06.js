//41) OBJECT REFLECT======================================================
/*
    ==> reflect: è un oggetto globale che consente di analizzare e 
    manipolare(definire una nuova prop, eliminare una prop esistente, 
    eseguire una funzione con un particolare valore per THIS, o verif se 
    un ogg ha una determinata prop) in modo automatico le proprieta degli 
    oggetti JS (variabili, funzioni...).
*/
var myObject = Object.create(null);
myObject.name = "objName";
console.log(myObject.hasOwnProperty(myObject, "name")); //genera un eccezione in qto, myObject non erede di nessun prop/metodi di Object. qdi, per myObject, non è def un metodo "hasOwnProperty(...)"
 
//modo giusto:
var myObject = Object.create(Object.prototype);
myObject.name ="objName";
console.log(myObject.hasOwnProperty(myObject, "name")); //true

//per non redef myObject, possiamo fare: COMPLICATO
Object.prototype.hasOwnProperty.call(myObject, "name"); //name

//facendo uso dell'Object reflection, abbiamo:
Reflect.getOwnPropertyDescriptor(myObject, "name");
//alternativa: MOLTO MEGLIO :D
Reflect.has(myObject, "name"); //TRUE: Il metodo restituisce true se l’oggetto ha la proprietà specificata come secondo parametro, oppure false in caso contrario. A differenza del metodo Reflect.hasOwnProperty(), Reflect.has() verifica l’esistenza della proprietà risalendo la catena dei prototipi, tenendo in considerazione quindi anche le proprietà ereditate

var myObject = {id: 123, name: "objName"};
console.log(Reflect.ownKeys(myObject)); //["id", "name"] 
//Reflect.ownKeys(nomeVariabile) ritorna l'array contenente i nomi delle PROP NON DERIVATE appartenenta all'oggetto "nomeVariabile"

//REFLECT permette di: gestire le prop di 1 ogg
var myObject = {};
Reflect.defineProperty(myObject, "name", { //def prop "name"
    value: "objName",
    writable: true,
    configurable: true,
    enumerable: true
});

var myObject = {name: "objName"};
console.log(Reflect.get(myObject, "name"));//objName: //ricava il valore di 1 prop.

var myObject = {name: "objname"};
Reflect.set(myObject, "name", "nuovoName"); //set a new name for the "name" prop
console.log(myObject.name); //nuovoName


var myObject = {name: "Mario", cognome: "Rossi"};
console.log(Reflect.deleteProperty(myObject, "cognome")); //true sse la prop cognome fa parte delle prop di myObject

//REFLECT permette di : gestire prototipi ed estensibilità:
var myObject = {name: "objName"};
console.log(Reflect.getPrototypeOf(myObject)); //Object {}
//Reflect.getPrototypeOf(myObject) <=> Object.getPrototypeOf(myObject)

var ogg1 = {name: "objName"};
var ogg2 = {id: 123};
 if (Reflect.setPrototypeOf(ogg2, ogg1)) {//assegna il prototipo di ogg1 a ogg2
    console.log(ogg2.name); //objName
 }
 //NOTA: non si puo assegnare il prototipo di un ogg complesso a un oggetto primitivo(number, boolean, string, NaN, undefined). viene sollevata un eccezione: TypeError. Espio:
 Reflect.setPrototypeOf(newObject, true); //Uncaught TypeError:...

 var myObject = {
    name: "objName"
 };
 Reflect.preventExtensions(myObject);
 myObject.id = 123;
 console.log(myObject); //Object {name: "objName"}: il tentativo di aggiungere la proprietà "id" a "myObject" non ha avuto successo

 var myObject = {name: "objName"};
Reflect.preventExtensions(myObject);
console.log(Reflect.isExtensible(myObject)); //false: Reflect.isExtensible(myObject) verifica se myObject è extensibile

//REFLECT permette di eseguiire funzioni e costruttori:
/*
    Reflect.apply(): consente di invocare una funzione specificando un 
    determinato valore per this.

    Reflect.apply() <=> Function.Prototype.apply(). hanno 3 param:_
        *) la funz da eseguire
        *) il valore da impostare per THIS. (è OPZIONALE)
        *) un array di valori he rapp i param da passare alla funz(opzionale)
*/
function sommaExtra(x, y) {
    return this + x + y;
 }
 var a = Function.prototype.apply.call(sommaExtra, 12, [4, 6]);
 console.log(a); //22
 var b = Reflect.apply(sommaExtra, 12, [4, 6]);
 console.log(b); //22

 /*
    Reflect.constructor(): consente di invocare un costruttore, incluse
    le classi, passando un insieme di argomenti
 
    Reflect.constructor() <=> new Object.create(...)
*/
// Supponiamo di avere la seguente classe che definisce un’automobile
class Automobile {
    constructor(modello, colore) {
       this.modello = modello;
       this.colore = colore;
    }
}
//Ora supponiamo di definire una funzione che genera automobili utilizzando Object.create(), cioè una factory
function produciAuto(modello, colore) {
    var auto = Object.create(Automobile.prototype);
    Automobile.call(auto, modello, colore);
    return auto;
}
//un equivalente della function qua sopra è:
function produciAuto(modello, colore) {
    return Reflect.construct(Automobile, [modello, colore], Automobile);
}
/*
     Il metodo Reflect.construct() prevede tre parametri:

    a) il costruttore o la classe da utilizzare per creare l’oggetto;
    
    b) un array di parametri da passare al costruttore passato in a);
    
    c)una classe o un costruttore il cui prototipo verrà utilizzato per assegnarlo al nuovo oggetto. Questo parametro è opzionale;, e se non viene specificato viene utilzzato lo stesso prototipo del primo parametro.

Alla luce di quanto detto per il terzo parametro, possiamo riscrivere l’ultimo esempio di codice come segue: 

*/
function produciAuto(modello, colore) {
    return Reflect.construct(Automobile, [modello, colore]);
 }

//42) CLASSE PROXY========================================================
/*
 Proxy: è una classe che consente di creare oggetti che hanno la capacita        di modif il comportamente predef di altri oggetti.
Un ogg della classe Proxy può assumere vari tipi di ruolo tra cui:
        ==> Handler: permette di config TRAP per intercettare l'accesso 
        alle sue prop ed eventualmente modif il comportamente predefinito.
*/

// Supponiamo di voler tracciare sulla console ogni accesso alle proprietà di un oggetto. Possiamo definire il seguente handler: 
var handler = {
    get(target, propertyName){ //TRAP
        console.log("lettura di " + propertyName);
        return target[propertyName];
    },
    set(target, propertyName, value){ //TRAP
        console.log("Assegnamento di " + value + " a " + propertyName);
        target[propertyName] = value;
    }
}; /*   Questo handler non è altro che un oggetto con due metodi, 
        get() e set(), che intercettano rispettivamente gli accessi in 
        lettura e scrittura alle proprietà dell’oggetto che vogliamo 
        monitorare. 
        
        I metodi dell’handler sono chiamati TRAP e consentono 
        di intercettare accessi e manipolazioni relative all’oggetto di 
        destinazione, il target.
    */
var persona = {nome: "Mario", cognome: "Rossi"};
//una volta def l'handler, possiamo creare un proxy per 1 ogegtto specificandolo nel costruttore della classe proxy. Espio
var personaProxata = new Proxy(persona, handler);
//da ora in poi, ogni accesso ale prop dell'oggetto personaProxata avra effetto sull'oggetto persona e verra intercettato e loggato in console.

var nome = personaProxata.nome; //console: lettura di nome
personaProxata.nome = "Marco";  //console: Assegnamento di Marco a nome
console.log(persona.nome);      // console: Marco

/*
    oltre a get() et set(), esistono altri metodi(TRAP) per l'handler tra 
    cui:
         setPrototypeOf(), isExtensible(), preventExtensions(), 
         getOwnPropertyDescriptor(), defineProperty(), has(), 
         deleteProperty(), ownKeys(), apply(), construct() 

     Ad esempio, vogliamo che non sia possibile assegnare una stringa 
     vuota o una stringa che contenga dei numeri al nome e cognome di un 
     oggetto che rappresenti una persona. Possiamo allora definire un 
     handler come il seguente:
*/

var validatore = {
    set(target, propertyName, value) {
       if (propertyName == "nome" || propertyName == "cognome") {
          if (value == "") 
            throw new Error("Non è possibile assegnare 1a stringa vuota");
          let hasNumberRegExp = /\d/;
          if (hasNumberRegExp.test(value)) 
            throw new Error("La stringa non può contenere numeri");
       }
       target[propertyName] = value;
    }
 };

 //vediamo come implementare e testare il Proxy
 var personaConValidazione = new Proxy({nome: "Mario", cognome: "Rossi"}, validatore);
personaConValidazione.nome = ""; //Uncaught Error: Non è possibile assegnare una stringa vuota
personaConValidazione.nome = "Mario1";//Uncaught Error: La stringa non può contenere numeri

/*data Binding: è un meccanismo che lega le prop di 2 ogg in modo che le modif si 
propaghino da uno all'altro. Nel contesto del data Binding, si parla di oggetto 
che fornisce dati (DATA SOURCE OBJECT) e di un ogg che li riceve(DATA TARGET 
OBJECT). 

L’esempio tipico di applicazione del data binding è quello che associa una 
proprietà di un oggetto con un elemento dell’interfaccia grafica, come ad esempio 
una casella di testo. Vediamo come sfruttare la classe Proxy per implementare il 
meccanismo di data binding

Definiamo una classe Binder con un metodo bindTo() come mostrato di seguito*/
class Binder{
    bindTo(dataSourceObj, dataSourceProperty, dataTargetObj, dataTargetProperty){
        var bindHandler = {
            set: function(target, property, newValue){
                if(property == dataSourceProperty){
                    target[dataSourceProperty] = newValue;
                    dataTargetObj[dataTargetProperty] = newValue;
                }
            }
        };
        return new Proxy(dataSourceObj, bindHandler);
    }
}

//possiamo usare la classe Binder come segue:
var persona = {nome: "Mario", cognome: "Rossi"};
var txtNome = document.getElementById("txtNome");
var binder = new Binder();
var personaConBinding = binder.bindTo(persona, "nome", txtNome, "value");
setTimeout(function() {
    personaConBinding.nome = "Marco";
}, 5000);

/*
    Abbiamo creato il proxy dell’oggetto persona utilizzando il metodo bindTo() 
    della classe Binder. Nella chiamata al metodo bindTo() abbiamo specificato 
    che vogliamo mettere in relazione la proprietà nome dell’oggetto persona con 
    la proprietà value dell’elemento txtNome. In questo modo, ogni modifica alla 
    proprietà nome dell’oggetto personaConBinding si rifletterà automaticamente 
    sia sull’oggetto originario persona, sia sulla casella di testo.
*/

//43) SYMBOL======================================================================
/*
symbol è un tipo di dato (come lo è anche Number, String, Boolean ecc...) che non 
prevede una sintassi letterale.
*/
var x = Symbol(); 
console.log(x);	//risultato: Symbol()
console.log(typeof x);	//risultato: symbol
//tutti gli ogg Symbol creati hanno valore dei valori diversi gli uni con gli altri
console.log(Symbol() === Symbol());	//risultato: false

var x = Symbol("mioSimbolo"); //def di un ogg Symbol con la sua "descrizione"
console.log(x.toString() === "Symbol(mioSimbolo)"); //risultato: true

//Un modo per ottenere simboli riutilizzabili, cioè richiamabili con una descrizione consiste nell’utilizzare il metodo for().PERO DEF UN SYMOL CON IL FOR LO RENDE ACCESSIBILE DA TUTTI, è COME UNA VARIABILE GLOBALE. 
var x = Symbol.for("mioSimbolo");
var y = Symbol.for("mioSimbolo");
console.log(x === y); // risultato: true. qdi il fatto di def un ogg Symbol facendo uso di "for" ci consente di poter confrontare ogg Symbol
console.log(Symbol.for("symbol2") === Symbol.for("Symbol2"));	//TRUE

//keyFor(...) permette di recuperare la descrizione di un simbolo
var x = Symbol.for("mioSimbolo");
console.log(Symbol.keyFor(x)); //risultato: mioSimbolo

//44) UTILIZZARE IL TIPO SYMBOL===================================================

//=============> Supponiamo di voler identificare un oggetto in maniera univoca assegnando un valore alla sua proprietà id:
var item = { descrizione: "Prodotto A", prezzo: 24.5 };
item.id = nuovoId();
//L’approccio classico consiste nel prevedere una funzione, nuovoId() nel nostro esempio, che gestisca un contatore globale da incrementare ad ogni nuova richiesta per un nuovo identificatore. Con i simboli possiamo evitare il ricorso a questa funzione scrivendo semplicemente:
item.id = Symbol();

//Un altro possibile utilizzo è nella definizione di enumerazioni.
var giorniDellaSettimana = {
	lunedi:    1,
	martedi:   2,
	mercoledi: 3,
	giovedi:   4,
	venerdi:   5,
	sabato:    6,
	domenica:  7
};

function isGiornoLavorativo(giorno) {
	return (giorno != giorniDellaSettimana.sabato && giorno != giorniDellaSettimana.domenica);
}
console.log(isGiornoLavorativo(giorniDellaSettimana.lunedi)); //true
console.log(isGiornoLavorativo(giorniDellaSettimana.sabato)); //false
//Essa restituisce true o false in base al fatto che il valore dell’enumerazione rappresenta un giorno lavorativo o meno. Nulla vieta però di passare alla funzione direttamente un numero o il risultato di una somma
console.log(isGiornoLavorativo(3));    // true
console.log(isGiornoLavorativo(2+5));  //false

//alternativa MIGLIORE:
var giorniDellaSettimana = {
	lunedi:    Symbol(),
	martedi:   Symbol(),
	mercoledi: Symbol(),
	giovedi:   Symbol(),
	venerdi:   Symbol(),
	sabato:    Symbol(),
	domenica:  Symbol()
};//Questo fa sì che a ciascun elemento dell’enumerazione venga assegnato un valore univoco ed è solo quel valore che rappresenta quello specifico giorno della settimana. Siamo "costretti" quindi ad utilizzare esclusivamente gli elementi dell’enumerazione per fare riferimento ai giorni della settimana.

/*=============> un altro utilizza di Symbol è: def le prop di un ogg senza il rischio di collisione di nomi.
    Supponiamo di avere necessità di aggiungere a runtime una proprietà ad un oggetto esistente, ad esempio per assegnare un valore che riutilizzeremo in un altro punto dell’applicazione

*/
var item = new Item();
item.dataControllo = new Date();
/*
    In questo esempio creiamo la proprietà dataControllo e le assegniamo la data e ora corrente. Ma siamo sicuri che l’oggetto item non avesse già la proprietà dataControllo? E se anche non l’avesse, come facciamo a garantirci che non ci siano conflitti di nome in eventuali future evoluzioni della struttura dell’oggetto item? Cioè, se la definizione della struttura dell’oggetto item non è sotto il nostro controllo, come possiamo assicurarci che in futuro non venga aggiunta una proprietà dataControllo?

In queste situazioni è meglio ricorrere ai simboli:
*/
var item = new Item();
var dataControllo = Symbol();
item[dataControllo] = new Date();

/*
     la nuova proprietà non sarà visibile nell’elenco delle proprietà dell’oggetto accessibile tramite Object.getOwnPropertyNames(). Questo ci garantisce che eventuali routine di metaprogrammazione sulle proprietà continuino a funzionare correttamente.

Possiamo comunque accedere alle proprieta definite tramite simboli sfruttando il metodo Object.getOwnPropertySymbols():
*/
var props = Object.getOwnPropertySymbols(item);
console.log(props.length);    // risultato: 1
console.log(item[props[0]]);  // risultato: valore della data assegnata

/*
=============> Symbol.iterator(altra utilità di SYMBOL):  permette di rendere iterabile una collezione di valori, cioè è possibile esplorare la collezione di valori tramite un ciclo for…of.
    Supponiamo di avere il seguente costruttore che utilizziamo per memorizzare un elenco indefinito di valori:
*/
function Collection(){};
var collection = new Collection();
collection[0] = 123;
collection[1] = "test";
collection[2] = 222;
//Per elencare sulla console il contenuto della collezione dovremmo ricorrere al metodo Object.getOwnPropertyNames() per accedere alle proprietà dell’oggetto e visualizzarne il valore
var props = Object.getOwnPropertyNames(collection);
for (var i = 1; i < props.length; i++ ) {
	console.log(collection[props[i]]);
}
//semplifichiamo quest'operazione con uso di Symbol.iterator
function Collection() {}; //constructor
Collection.prototype[Symbol.iterator] = function() {
	var self = this;
	var i = 0;
	return {
		next: function() {
			if (self[i] !== undefined) {
				return { value: self[i++] };
			} else {
				return { done: true };
			}
		}
	}
}

//uso 
for (var x of collection) {
	console.log(x);
}