// 69) Eventi del DOM (Browser e Device):=========================================
/*
    gli eventi del Browser sono una delle parti più importanti dell’API che riguarda Browser e DOM.

    Gli eventi sono così interessanti perché ci consentono di gestire il comportamento delle nostre applicazioni al verificarsi di una certa interazione dell’utente, oppure di rispondere alle sollecitazioni che vengono da altre applicazioni o dal sistema stesso.

    Per intercettare gli eventi che vengono scatenati, utilizziamo il meccanismo degli handler (o dei listener). Possiamo definire come handler una funzione di callback che viene associata ad un certo evento.

    esistono 3 meccanismi per ASSOCIARE EVENTI E HANDLER:
        1--> via codice: sfruttando la funzione: addEventListener():Best SOlution
        2--> all'interno del markup HTML, sfruttando speciali attributi dei tag 
        3--> nel codice JS, associando specifiche prop degli elti del DOM.

    1) EVENTI + HANDLER VIA CODICE: addEventListener(): metodo esposto dagli elti del DOM e rapp la piu comune tra le modalita usate per associare 1 evento al rispetto handler.*/
elemento.addEventListener(evento, callback, [useCapture]);
/*
    param1 = evento: stringa che def l'evento che vogliamo gestire (ad espio: "click" oppure "load")

    param2 = callback: chiamata a callback che def l'handler vero e proprio

    pram3 = [useCapture]: serve a forzare la prioorità di gestione un certo evento. questo nei casi in cui:
        a) abbiamo associato diversi handler allo stesso evento (allora il primo diventa quello con useCapture = TRUE)
        
        b) serve dare rpiorità all'handler posizionato su un certo livello dell'albero(normalmente gli handler sono eseguiti e propagati dalle FOGLIE VERSO LA RADICE DEL DOM).
        Per default, usecapture = false */
        
//SOLUZIONE MIGLIORE
<a href="#" id="test">test</a>//Nella fase di descrizione dell’elemento (detto “strato di presentazione”) non facciamo nessuna ipotesi sul comportamento associato a questo link. Possiamo invece definire una funzione di callback che gestisca l’evento click sul link e associarla all’evento direttamente da codice (a livello di logica applicativa):
/*
    <script>
        // 1) definisce la funzione callback
        function clickOnTest(event){
	        console.log('Click su test');
        }

        // 2) ottiene l'elemento 'test'
        var test = document.getElementById('test');
        
        // 3) associa l'evento click alla callback
        test.addEventListener('click', clickOnTest);
    </script>
*/
//alternativa: ma non è sempre conveniente
test.addEventListener('click', function(event) {
	console.log('Click su test');
});

//vantaggi di addEventListener(param1, param2, param3): Rispetto alle altre modalità addEventListener permette una gestione più raffinata degli handler, consente di definirne e gestirne più di uno per lo stesso evento e funziona con qualunque elemento del DOM (non solo con gli elementi HTML).

//VANTAGGIO IMPORTANTE DI addEventListener(): possiamo rimuovere l'associazione tra un evento e l'handler relativo. removeEventListener(param1, param2, param3)
test.removeEventListener('click', clickOnTest); //smette di gestire il click sul link "test" creato in linea 26 di questo file.

/*
        2) HANDLER ALL'INTERNO DEL MARKUP HTML: HANDLER ASSOCIATI NELL'HTML:
    Possiamo anche inserire la chiamata alla nostra funzione di callback direttamente nella definizione di un tag HTML, utilizzando alcuni speciali attributi. Ecco un esempio:*/
<a href="#" onclick="alert('Ciao mbom')">myLink</a> //SCONSIGLIATO
//alternativa un pochino migliore...
<a href="#" onclick="alert(this.innerHTML)">Ciao</a> //Cliccando sul link otterremo una finestra che riporterà "Ciao" il contenuto dell’elemento! 

// 70) L'oggetto EVENT e this: ===================================================
/*
    Nella gestione di un evento potremmo essere interessati ad ottenere informazioni specifiche su di esso e sull’elemento HTML su cui esso si è verificato. Immaginiamo ad esempio di avere assegnato un unico gestore dell’evento clic a tutti i pulsanti/buttoni di una pagina:*/
var buttons = document.getElementsByTagName("button");
var handler = function(){
    console.log("click...");
};

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", handler);
}
//Come facciamo a sapere quale pulsante è stato cliccato? Un possibile approccio consiste nel far riferimento all’oggetto this all’interno della funzione che gestisce l’evento
var buttons = document.getElementsByTagName("button");
var handler = function(){
    console.log("click su " + this.innerHTML);
};

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", handler);
} //L’oggetto this rappresenta normalmente l’elemento su cui si è verificato l’evento corrente. Tuttavia questo non è sempre vero, come vedremo più avanti quando parleremo del flusso di propagazione degli eventi. Inoltre, l’oggetto this non ci consente di avere informazioni specifiche sull’evento.

//Per il momento segnaliamo la presenza della proprietà target che rappresenta l’elemento su cui si è verificato l’evento, in maniera indipendente da altri fattori come ad esempio il flusso degli eventi e quindi con maggiori garanzie rispetto all’oggetto this. Il gestore dell’evento clic dell’esempio precedente andrebbe dunque riscritto nel seguente modo:

var handler = function (param1) {
    console.log("Click su " + param1.target.innerHTML); // param1 = l’oggetto event associato al clic e la sua proprietà target è il pulsante cliccato.
}
//Insieme all’elemento su cui si è verificato l’evento possiamo individuare anche il tipo di evento tramite la proprietà type. Questa proprietà restituisce una stringa corrispondente al nome dell’evento:
var buttons = document.getElementsById("btnClicca");
var handler = function(param1){
    console.log("Evento "+ param1.type);
};
buttons.addEventListener("click", handler);