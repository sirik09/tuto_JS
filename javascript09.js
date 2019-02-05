// 58) BROWSER API: (L'oggetto Window)============================================
/*
    generalmente i nostri progetti sono eseguiti all’interno sistemi ospite con i quali interagire grazie a insiemi di oggetti che espongono interfacce standard, meglio note come API. L'ambito principale per noi sarà il BROWSER.

    In questa sezione esploreremo quindi le principali API che consentono a JavaScript di interagire con l’ambiente che lo ospita, iniziando dal Web.

Browser API: 
    L’interazione del nostro codice JS con il browser viene realizzata tramite un’API che, grazie ad alcuni oggetti, consente di acquisire informazioni sull’ambiente di esecuzione, di usufruire di alcune funzionalità e di effettuare specifiche impostazioni

l'oggetto WINDOW: 
    è ogg principale per l’interazione con il browser. Esso rappresenta una finestra che contiene un documento HTML. Quindi ciascuna finestra o tab ha associato un proprio oggetto window e, allo stesso modo, a ciascun frame definito in una pagina HTML corrisponde un oggetto window.

    Window rappresenta anche il contesto di esecuzione globale per JavaScript, cioè l’oggetto all’interno del quale vengono definite variabili e funzioni globali. Esso è inoltre l’oggetto associato alla parola chiave this quando non esiste un contesto specifico.

    Qualsiasi variabile o funzione definita nel contesto globale diventa di fatto proprietà o metodo dell’oggetto window. Quindi, ad esempio, date le seguenti definizioni:
*/
var x = 123;
function somma(a, b){
    return a + b;
}
//possiamo accedere a "x" e "somma(...)", nell’esecuzione del codice all’interno di un browser, sia direttamente che come proprietà dell’oggetto window o dell’oggetto this:
console.log(x); //123
console.log(somma(3, 5)); //8
console.log(window.x); //123
console.log(window.somma(3, 5)); //8
console.log(this.x); //123
console.log(this.somma(3, 5)); //8
//Per lo stesso principio, qualsiasi proprietà o metodo dell’oggetto window è accessibile anche senza fare un riferimento esplicito all’oggetto. Quindi window.metodo() è equivalente alla semplice chiamata metodo()

// 59) Window, Gestire lo schermo del device =====================================
/*
    Alcune proprietà dell’oggetto window ci consentono di ottenere informazioni su diversi aspetti della configurazione corrente del browser
    
    --> Dimensioni della finestra:
        a) innerHeight : Largeur
        b) innerWidth : Longueur
        espio: console.log(innerWidth + "x" + innerHeight);

    --> Info sullo schermo del device: prop screen di window: window.screen.width/height
        a) window.screen.height : largeur ecran
        b) window.screen.width : longueur ecran
        c) window.screen.colorDepth : profondità del colore
        d) window.screen.pixelDepth : profondità del colore    
        
    --> Frame: è un Array di oggetti window che rapp i frame contenuti nella pagina corrente.
*/
for(let i=0; i<frames.length; i++){//visualizza gli indirizzi dei frame contenuti nella pagina corrente
    console.log(frames[i].location.href); 
}
//Dal momento che con la presenza dei frame si viene a creare una gerarchia di oggetti window, abbiamo la possibilità di navigare in questa gerarchia tramite le proprietà PARENT e TOP: la prima rappresenta l’oggetto genitore della finestra o frame corrente, mentre la seconda indica la finestra radice della gerarchia.

// 60) Creare finestre di POP-UP e finestre di dialogo: ==========================
    //-->alert(...): visualizza una finestra "modale" con un messaggio ed un pulsante ok.
window.alert("Hello World!");

    //--> boolean confirm(...): visualizza una finestra modale con un messaggio e 2 pulsanti (OK ed Annulla). 
        //ritorna true se viene scelto OK
        //ritorna false se viene scelto Annulla.
if(window.confirm("Confermi l'eliminazione ?")){
        //...
}

    //--> prompt(...): richiede l'inserimento di un valore (string, numb, NaN, undefined...) all'utente e restituisce il valore inserito.
var nome = window.prompt("Inserisci il tuo nome: ");
if(nome != null){
    //...
}

    //--> open(...): apre una nuova finestra/tab. Attraverso i param OPZIONALI del metodo, è possibile indicare l'URL della pagina da caricare ed eventualmente impostazioni di visualizzazione della finestra
window.open("http://www.html.it", "myWindow"); //cioe:
window.open("URL", "nome_della_finestra o dell'oggetto window aperto");
/*
     È prevista la possibilità di specificare come nome(secondo parametro) i seguenti valori predefiniti che determinano la modalità di visualizzazione della finestra rispetto alla gerarchia di oggetti window eventualmente esistente:
        _blank : apre una nuova finestra
        _parent : sostituisce la finestra o il frame genitore della finestra corrente
        _self : sostituisce il contenuto della finestra of del frame corrente
        _top : sostituisce il contenuto della radice della gerarchia di oggetti window.

    é possibile specificare un terzo parametro nel metodo open("url", "param2", "param3").
        --> param3 : conterra una stringa di opzioni separate da ",". Espio:
*/
window.open("http://www.html.it", "myWindow", "menubar=no, toolbar=no, status=no, height=400, width=600, top=150, left=150");

/*le opzioni def nel param3 indicano che la nuova finestra: 
    --> non deve avere la barra dei menu
    --> non deve avere la barra degli strumenti
    --> non deve avere la barra di stato
    --> vengono poi specificate le dimensioni della nuova finestra in pixel e la sua posizione sullo schermo

    --> close() : è un metodo che ci permette di chiudere la finestra(oggetti window creato con la open(...)) 
*/

// 61) Gestione dei timer, setInterval e setTimeout ==============================
/*
    studieremo metodi di "window" che ci consentono di gestire attivita differite nel tpo sfruttando i timer del client:

    --> setInterval(): esegue una fzione periodicamente in base ad 1 intervallo di tpo specificato

    --> setTimeout(): esegue una fzione dopo un certo numero di millisecondi

    --> clearInterval(): azzera 1 timer creato con setInterval()
    --> clearTimeout(): azzera 1 timer creato con setTimeout()
*/
var myTimer = setTimeout(function(){console.log("test");}, 5000); //Dopo 5000 ms (5 secondi), viene stampato sulla console : "test"
clearTimeout(myTimer); // ferma l'esecuzione della funzione passata al timer.
//L'ESECUZIONE PROGRAMMATA DI UN FUNZIONE CON setTimeout() AVVIENE UNA VOLTA SOLA

var x = 0;
var myTimer = setInterval(function(){x++; console.log(x); }, 1000);//esegue periodicamente la funzione passata come param ogni 1000 ms (1s).
clearInterval(myTimer); // ferma l'esecuzione periodica programmata ogni 1000ms

// 62) Controllo della navigazione HISTORY E LOCATION ============================
/*
    l'ogg WINDOW fornisce anche dei metodi per gestire l'historik de navigation, et la location:
        --> history: è un ogg che tiene traccio delle pagine visitate dall'utente all'interna di una finestra durante una sessione de navigazione.
        
            *) history.length() : numero di pagine visitate
            *) possiamo andare avanti/indietrio nello storico delle pagine visitate con  forward()/back()
*/

window.history.forward();
window.history.back(); //carica la pagina anteriore a quello corrente
window.history.go(-3);  //ci posiziona sulla terzultima pagina visitata dall'utente

/*
    Per controllare l’URL del documento caricato nella finestra corrente utilizziamo la proprietà location. Questa proprietà è un oggetto che ci permette di sezionare gli elementi che compongono l’URL del documento, consentendoci di ricavare:

    il nome del server
    la porta HTTP eventualmente utilizzata
    i parametri eventualmente passati e altre informazioni.

Per spiegare le varie informazioni che possiamo recuperare tramite le proprietà dell’oggetto location, prendiamo in considerazione questo URL:
    http://www.html.it:8080/articoli/articolo.php?id=123#paragrafo
    
    Nella seguente tabella riportiamo i risultati ottenuti accedendo alle diverse proprietà dell’oggetto location quando la pagina caricata è quella corrispondente all’URL specificato:

        window.location.href 	http://www.html.it:8080/articoli/articolo.php?id=123#paragrafo
        
        window.location.protocol 	http:

        window.location.hostname 	www.html.it

        window.location.host 	www.html.it:8080

        window.location.origin 	http://www.html.it:8080

        window.location.port 	8080

        window.location.pathname 	/articoli/articolo.php

        window.location.search 	?id=123

        window.location.hash 	#paragrafo
*/
function getParameters() {
	var paramData = [];
	var parameters = {};
	var param;
	if (window.location.search.length > 0) {
		paramData = window.location.search.split("?")[1].split("&");
		for(var i = 0; i < paramData.length; i++) {
			param = paramData[i].split("=");
			parameters[param[0]] = param[1];
		}
	}
	return parameters;
}
//In questo esempio abbiamo definito una funzione che restituisce i parametri presenti nell’URL della pagina corrente. La funzione accede alla proprietà search dell’oggetto location e genera un oggetto con proprietà corrispondenti ai nomi dei parametri. In corrispondenza di un URL analogo al seguente:
//http://www.html.it/articoli/articolo.php?id=123&x=567
//otteniamo: {id: 123, x: 567}

//L’accesso alle proprietà dell’oggetto location non è però in sola lettura. Possiamo impostare dinamicamente le varie parti dell’URL ed ottenere di conseguenza la navigazione ad un altro URL. Ad esempio, la seguente istruzione cambia la pagina corrente:

window.location.href = "http://www.html.it";

//Possiamo ottenere lo stesso effetto dell’istruzione precedente utilizzando il metodo assign() dell’oggetto location:

window.location.assign("http://www.html.it");

//L’oggetto location prevede anche il metodo reload() per ricaricare la pagina corrente. Normalmente la pagina viene caricata dalla cache, anche se ciò dipende dalle impostazioni del browser. Se vogliamo forzare il caricamento dal server possiamo passare il valore true come parametro:

window.location.reload(true);

//Il metodo replace(), infine, consente di caricare un nuovo documento al posto di quello attualmente presente nella finestra corrente:

window.location.replace("http://www.html.it");

//A differenza di assign(), però, questo metodo sostituisce anche il vecchio documento presente nella history. In altre parole, utilizzando replace() non avremo più traccia del vecchio documento nella history del browser

// 63) Informazioni sul browser, l'oggetto navigator =============================
// --> window.navigator: è una prop di 1 ogg window che ci consente di ricavare alcune info sul browser corrente e su alcune sue impostazioni

// --> come identif il browser? 2window.navigator.userAgent
function getBrowserName() {
    var browserNames = ["Chrome", "Firefox", "MSIE", "Opera", "Safari"];
    for(var i in browserNames) {
        if (window.navigator.userAgent.indexOf(browserNames[i]) > -1) 
            break;
    }
    return browserNames[i];
  }//Considerato il numero crescente di browser, a cui contribuiscono anche le versioni mobile, ed il loro frequente aggiornamento, questa tecnica non è più affidabile. UN MODO MIGLIORE DI DET ALCUNE FUNZIONALITA SUPPORTATE DA UN BROWSER SONO:
console.log(window.navigator.cookieEnabled); //boolean
console.log(window.navigator.onLine); //boolean
console.log(window.navigator.language);