"use strict";

//=====================================================REGULAR EXPRESSIONS
    //RegExp: in JavaScript quindi è un oggetto, con delle proprietà e metodi che consentono di gestire testi, individuare ed eventualmente sostituire stringhe all’interno di altre stringhe.

//come creare RegExp in js?
var x = new RegExp("abc");
//alternativa:
var y = /abc/;
    //x e y hanno lo stesso risultato: quello della ricerca delle istanze di "abc" dentro altre stringhe

    //x o y può essere utilizzata per ricercare o sostituire la sottostringa abc all’interno di una stringa.

//proprietà dei RegExp:
var y = /[a-z]+\w*/ig;  //definiamo ignorecase e global come proprietà
    y.global;           //questa prop vale TRUE essendo definita in y
    y.ignoreCase;       //questa prop vale TRUE essendo definita in y
    y.multiline;        //questa prop val FALSE non essendo definita in y

//metodi dei regexp:
    //-->metodo test()
    var y = /\d/; //ricerca di una cifra in una stringa
    y.test("str1nga"); // da TRUE dato che "str1nga" contiene almeno una cifra
    y.test("stringa"); //da false. non ci sono cifre in "stringa"

    //-->metodo exec(): a differenza di test() che ritorna un booleano, exec ritorna un array con la sottostringa trovata oppure null in caso di esito negativo

    var y = new RegExp("\d");
    y.exec("str1nga");      //["1"]
    y.exec("stringa");      //null

    //È importante notare che l’esecuzione dei metodi test() ed exec() su un’espressione regolare con modificatore global attivo aggiorna la proprietà lastIndex dell’oggetto RegExp. Tale proprietà contiene l’indice all’interno della stringa da cui partire per la ricerca. Dopo l’eventuale individuazione di una sottostringa questa proprietà viene aggiornata con l’indice che punta al resto della stringa. Questo comporta che l’eventuale riesecuzione di test() o exec() sulla stessa espressione regolare permette di individuare eventuali successive occorrenze di sottostringhe.

    var y = /\d/g;
    y.exec("str1ng4");	//["1"] lastIndex passa da 0 a 4
    y.exec("str1ng4");	//["4"] lastIndex passa da 4 a 7
    y.exec("str1ng4");	//null dato che la ricerca si fa su una parte non esistente di "str1ng4". abbiamo superato la dimensione della detta stringa dovuto all'update di lastIndex() applicando exec opp test su una RegExp che ha come modificatore "global".

//search, replace, split, match, ricerca e parsing:
    //--> alcuni metodi della classe String accettano le RegExp

    //--> search(): ritorna l'indice della prima occorrenza di una stringa
    var x = "str1nga".search(/\d/); // ritorno 3. se non viene trovata una corrispondenza, viene ritornato -1
    var x = "str1nga".split(/\d/); //["str", "nga"]
    var x = "str1ng4".replace(/\d/, "NUMERO"); //strNUMEROngNUMERO
    var x = "str1ng4".match(/\d/g); //["1", "4"]: match permette di ottenere un array con le sottostringhe individuate da una RegExp

    /*
    in genere, le RegExp sono usate per validare gli input dell'utente.
    alcuni esempi sono:
    
    Email:              /\w+@\w+\.\w{2,4}/i
    IP addr:            /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/
    tag HTML <div>:     /<div\b[^>]*>(.*?)<\/div>/i
    valori esadecimali :/[a-f0-9]+/i
    URL:       (https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?
    
    */

//======================================================Date e Orari in JS
    //i vari modi per creare un istanza di una data sono:
    //attenzione al mese: i suoi valori sono in [0...11]
    var w = new Date();
    var x = new Date(1379989986515); //num di milliseconda passate dal 01/01/1970
    var y = new Date("01/01/2013 15:30");
    var z = new Date(2013, 1, 1, 15, 30, 0, 0);//aaaa, mm, gg, hh, min, ss
        //z = 1 fevrier 2013; 15h30

    // come scomporre una data?
        /* si usa sti metodi su un'istanza di Date.
            getFullYear() 	Restituisce l’anno rappresentato con quattro cifre
            getMonth() 	Restituisce il mese (da 0 a 11)
            getDate() 	Restituisce il giorno del mese (da 1 a 31)
            getDay() 	Restituisce il giorno della settimana (da 0 a 6)
            getHours() 	Restituisce l’ora
            getMinutes() 	Restituisce i minuti
            getSeconds() 	Restituisce i secondi
            getMilliseconds() 	Restituisce i millisecondi
*/
var oggi = new Date();
var giorno;
switch(oggi.getDay()){
    case 0: giorno = "domenica"; break;
    case 1: giorno = "lunedì"; break;
    case 2: giorno = "martedì"; break;
    case 3: giorno = "mercoledì"; break;
    case 4: giorno = "giovedì"; break;
    case 5: giorno = "venerdì"; break;
    case 6: giorno = "sabato"; break;
}
console.log("Oggi è "+giorno);

//alternativa:
var oggi = new Date();
var giorni = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì",                  "venerdì", "sabato"];
console.log("Oggi è " + giorni[oggi.getDay()]);

//alternativa ultra compatta:
var giorno = ["domenica", "lunedì", "martedì", "mercoledì","giovedì",                   "venerdì","sabato"][new Date().getDay()];
console.log("Oggi è " + giorno);

//come modificare un oggetto di tipo Date?

/*
    setFullYear() 	Imposta l’anno di una data
    setMonth() 	    Imposta il mese di una data
    setDate() 	    Imposta il giorno del mese di una data
    setHours() 	    Imposta l’ora di una data
    setMinutes() 	Imposta i minuti di una data
    setSeconds() 	Imposta i secondi di una data
    setMilliseconds() 	Imposta i millisecondi di una data
    setTime() 	    Imposta data e ora specificandola in millisecondi                      rispetto al 1 Gennaio 1970
*/
var data = new Date();
data.setFullYear(data.getFullYear() + 1);
console.log(data);

var data = new Date(2013, 11, 25); //25 decembre 2013
data.setDate(data.getDate() + 10); //add 10 days => new date is: 2014, 00, 04 <=> 04 Janvier 2014
console.log(data); // Sat Jan 04 2014 ...

//come confrontare 2 date?
var scadenza = new Date(2013, 11, 10); //10 dec 2013
var oggi = new Date();
if (oggi < scadenza) messaggio = "Non ancora scaduto!";
if (oggi > scadenza) messaggio = "Scaduto!";
console.log(messaggio);

//how to get UTC time?
var oggi = new Date();
console.log(oggi.getUTCHours());
//alternative:
var oggiUTC = new Date().getUTCHours();

//getTimezoneOffset(): da la differenza tra l'ora UTC e l'ora in locale.
var oggi = new Date()
var differenza = oggi.getTimezoneOffset(); //differenza avrà valore negativo o positivo a seconda se l’ora locale è rispettivamente maggiore o minore dell’ora UTC.

//rappresentare la data come stringa:
/*
    toDateString() 	Converte la componente data in stringa, escludendo l’ora
    
    toISOString() 	Converte una data in stringa in formato ISO
    
    toLocaleDateString() 	Converte la componente data in stringa, escludendo l’ora, secondo le impostazioni locali
    
    toLocaleTimeString() 	Converte la componente ora in stringa, escludendo la data, secondo le impostazioni locali
    
    toLocaleString() 	Converte una data in stringa secondo le impostazioni locali
    
    toString() 	Converte una data in stringa
    
    toTimeString() 	Converte la componente ora in stringa, escludendo la data
    toUTCString() 	Converte una data UTC in stringa
*/