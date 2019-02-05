"use strict";

//=============================================================ARRAY IN JS
var x = new Array();        //x è un array vuoto
var x = new Array(5);       //x è un array di 5 elti undefined
var x = new Array(3, 5, "testo", true); 

//length e le dimensioni dinamiche degli array
var x = new Array(); x.length = 10; //crea un array vuoto poi, ci aggiunge 10 elti undefined

var x = new Array("uno", "due", "tre");
x.length = 5; // x = ["uno", "due", "tre", undefined, undefined]ù
x.length = 2; // x = ["uno", "due"]

//Push e pop, aggiungere o eliminare elementi in stile pila (FIFO)
/*
push() : add un elto alla fine di 1 array e restituisce la nuova lunghezza
pop() : rimuove l’ultimo elto di 1 array e ritorna l’elemento eliminato
*/

var stack = new Array("uno", "due", "tre");
stack.push("quattro");  //["uno", "due", "tre", "quattro"]
var x = stack.pop();    //["uno", "due", "tre"]; x = "quattro"????

/*
shift(): elimina il primo elto di un array e lo aggiorna al chiamante.
unshift(): add un elto nell utlima casella all’array e aggiorna la nuova lunghezza.
*/
var x = new Array("uno", "due", "tre");
var y = x.unshift("zero");  //x = ["zero", "uno", "due", "tre"] ; y = 4
var z = x.shift();          //x = ["uno", "due", "tre"]; z = "zero"

/*
-->Splice: aggiungere o togliere elementi in qualunque posizione dell’array

-->splice(): ha 2 argomenti obbligatori e un numero indefinito di argomenti opzionali.
    primo argomento: indica la posizione dell’array da cui eliminare o aggiungere elementi;
    secondo argomento: indica il numero di elementi da eliminare;
    dal terzo argomento in poi è possibile specificare gli elementi da aggiungere.
*/
var x = new Array("uno", "due", "tre");
var y = x.splice(1, 1, "quattro"); //rm x[1] e add x[1] = "quattro"
// x = ["uno", "quattro", "tre"]
// y = ["due"] <=> elto rimosso dall'array
var z = x.splice(2, 0, "cinque", "sei", "sette");
// x = ["uno", "quattro", "cinque", "sei", "sette", "tre"]
// z = []

//FACCIAMO USO DEL METODO SLICE USATO CON I STRING NEL FILE JAVASCRIPT01.JS PER ESTRARRE ALCUNI ELTI DA UN ARRAY
var x = new Array("uno", "due", "tre", "quattro");
var y = x.slice(1, 3);//rm di 3-1 elti partendo da x[1] elti cad togliamo (x[1], x[2]) 
var y = x.slice(a, b); // rm di b-a elti partendo da x[a]. (supponendo che a < b con a e b positivi)
// y = ["due", "tre"] slice permet d'extraire des elts ds 1 array, mais il exclut l'elt dont la position = param2. dans ce cas, x[3] n'est pas extrait de l'array

//concatenare 2 array
var x = new Array("uno", "due", "tre");
var y = new Array("quattro", "cinque");
var z = x.concat(y);	//["uno", "due", "tre", "quattro", "cinque"]

//Ordinare gli array, sort e reverse
var x = new Array("uno", "due", "tre");
x.sort();		//["due", "tre", "uno"]
console.log("sort: " + x);
x.reverse();	//["uno", "tre", "due"]
console.log("reverse: " + x);
x.sort((a1, a2)=>a1-a2);
console.log("sort(comparator): " + x);//["due", "tre", "uno"]

//Cercare un elemento nell’array:
    //--> indexOf: scandisce l'array partendo dalla prima casella
    //--> lastIndexOf(): scandisce l'array partendo dall'ultima casella.
var x = new Array("uno", "due", "tre");
var y = x.indexOf("due"); // 1. Se l'elto non è trovato, ritorna -1

//Convertire l’array in una stringa: join("separator..opzionale") 
var x = new Array("uno", "due", "tre");
var y = x.join();		//"uno,due,tre" stringa unica
var x = new Array("uno", "due", "tre");
var y = x.join(" E POI ");		//"uno E POI due E POI tre"


//===========================Typed Array, Map e Set(novità di EcmaScript6)
    /*--> Typed Array: strutture dati che consentono la manipolazione efficiente di dati binari. esistono 2 tipi di oggetto:
        *) ArrayBuffer: struttura dati per contenere una generica sequenza di byte
        *) ArrayBufferView: oggetto che fornisce un tipo di dati e una struttura per interpretare i dati binari trasformandoli in un effettivo Typed Array.

        espi:
            Int8Array 	per accedere ai dati come interi a 8 bit
            Uint8Array 	interi a 8 bit sensa segno (unsigned)
            Int32Array 	interi a 32 bit.
    */
var buffer = new ArrayBuffer(256);
var bufferView = new Int32Array(buffer);
buffer = fillBuffer(); // fillBuffer è una funzione generica che si                                 occupa di caricare dati binari nel buffer.
for (var i=0; i<bufferView.length; i++) {
	console.log("Elemento " + i + ": " + bufferView[i]);
}

    //--> Set: è un insieme di dati di qualsiasi tipo.NON AMETTE DUPLICATI
var mySet = new Set();
mySet.add(1); 
mySet.add(2);
mySet.add("ciao");

var l = mySet.size; // 3
var l = mySet.has(2); //true
mySet.delete(1); //elimina 1 dal Set. elimina 1 elto dal Set
mySet.clear();   //cancella tutti gli elti contenuti nel Set

    //--> Map
var myMap = new Map();
myMap.set("nome", "Mario"); //set <=> add
myMap.set(3.14, "Pi greco");
//modo alternativo definizione di una mappa
var myObj = {id: 123, data: "test"};
myMap.set(myObj, "Oggetto");

myMap.delete(3.14); //delete la coppia che ha come chiave 3.14
console.log(myMap.has(3.14));	//false
console.log(myMap.size);		//2
console.log(myMap.get("nome"));	//'Mario'
console.log(myMap.get(myObj));	//'Oggetto'

    //--> WeakMap : sono mappe particolari. ammettono come chiave SOLO OGGETTI. viene utilizzata per la gestione del DOM

//==========================================================Funzioni in JS
var somma = function(x, y) {
	return x + y;
};

var z = somma(4, 8);
console.log(z);	// 12

//IIFE: Immediately-Invoked Function Expression oppure: Self Executing Anonymous Function
(function(x, y) {
	return x + y;
}(4,8));

//proprieta e metodi di una funzione:
var somma = function Sum(x, y) {
	return x + y;
};
console.log(somma.name);	// stampa "Sum": proprieta
console.log(somma.length);	// stampa 2;: proprieta

//======================================================Funzioni CALLBACK
/*
le funzioni JS sono OGGETTI DI PRIMA CLASSE. Possono essere passate come parametri di un'altra funzione. 
La funzione passato come parametro è detta FUNZIONE DI CALLBACK o callback
*/
//func è la callback
function calcola(func, arg1, arg2) {
	return func(arg1, arg2); //chiamo la callBack con in param args1/2
}

console.log(calcola(somma, 13, 25));	// 38
//con var  somma = function(x, y){
//   return x+y;
//}

//PRIMA DI USARE UNA CALLBACK, devo verificare che la callback sia veramente una funzione. donc, si mon IF  est vrai, alors on peut appeler la callback (comme fait dans la return)
function calcola(func, arg1, arg2) {
	if (func && typeof func === "function") {
		return func(arg1, arg2);
	}
}

var numeri = [11, 3, 24];
numeri.forEach( function(valore, indice) {
	                console.log(valore);
                }
              );

//alternativa:
function stampaValore(valore, indice) {
	console.log(valore);
}
var numeri = [11, 3, 24];
numeri.forEach(stampaValore);

/*
Per ordinare ad esempio un array di oggetti dobbiamo ricorrere ad un funzione di callback da passare al metodo sort() che verrà internamente utilizzata per stabilire il criterio di confronto tra gli elementi dell’array
*/
var persone = [
    {nome:"Mario", cognome:"Rossi", professione:"impiegato"},
    {nome:"Guiseppe", cognome:"Verdi", professione:"operaio"},
    {nome:"Marco", cognome:"Neri", professione:"insegnante"}
];
persone.sort((p1, p2)=>{
    if(p1.cognome < p2.cognome)
        return -1;
    else if(p1.cognome > p2.cognome)
        return 1;
    else
        return 0;
});
//equivalenti
persone.sort(function(a, b) {
     	if (a.cognome < b.cognome) return -1;
     	if (a.cognome > b.cognome) return 1;
     	return 0;
});

//===================funzione che ritorna come risultato un'altra funzione
var incrementatore = function(incremento) {
	return function(valore) {
		return incremento + valore;
	};
};

/*
incrementatore è una variab che corrsiponde a un funzione anonima che restituisce un'altra funzione.
la funzione incrementatore genera una funzione che incrementa un valore numerico di un numero predefinito
*/
var incrementaDiCinque = incrementatore(5);
//A questo punto possiamo utilizzare la funzione incrementaDiCinque() per aumentare di cinque unità il valore passato come parametro:
console.log(incrementaDiCinque(4));  // 9
console.log(incrementaDiCinque(16)); // 21


//==============================================this+contesto d'esecuzione
var persona = {
    nome:"Mario",
    cognome:"Rossi",
    nomeCognome: function(){
        return this.nome+" "+this.cognome;
    }
};

//saluta() prende come param una funzione (nomePersona) e la esegue nel //proprio contesto di esecuzione.
function saluta(nomePersona){
    console.log("Buongiorno "+ nomePersona());
}

//nomePersona() essendo fuori dal suo "scope", la chiamata di saluta() 
//produce:"Buongiorno undefined undefined" invece di "Buongiorno Mario Rossi"
//per fare in modo che la callback restituisce il valore atteso:"Mario Rossi", possiamo fare uso di CALL opp APPLY opp BIND: permettono di specificare il significato che vogliamo associare a "this"

//call(): si usa con un numero def di parametri
var obj = {name:"Niladri"};
var greeting = function(a,b,c){
    return "Welcome "+this.name+" to "+a+" "+b+" in "+c;
};
console.log(greeting.call(obj,"Newtown","KOLKATA","WB"));
// returns output as welcome Niladri to Newtown KOLKATA in WB

//apply(): si usa qdo i param da passare alla funzione sono 1 array
var obj = {name:"Niladri"};

var greeting = function(a,b,c){
    return "welcome "+this.name+" to "+a+" "+b+" in "+c;
};
// array of arguments to the actual function
var args = ["Newtown","KOLKATA","WB"];  
console.log("Output using .apply() below ")
console.log(greeting.apply(obj,args));

/*  The output will be 
    Output using .apply() below
    welcome Niladri to Newtown KOLKATA in WB 
*/

//Alternativa a call/aplly: bind(): usa una fzione.
var obj = {name:"Niladri"};
var greeting = function(a,b,c){
    return "welcome "+this.name+" to "+a+" "+b+" in "+c;
};
//creates a bound function that has same body and parameters 
var bound = greeting.bind(obj); 
console.dir(bound); //returns a function
console.log("Output using .bind() below ");
console.log(bound("Newtown","KOLKATA","WB")); //call the bound function

/*  the output will be 
    Output using .bind() below
    welcome Niladri to Newtown KOLKATA in WB 
*/