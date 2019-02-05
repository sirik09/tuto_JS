// 64) DOM: Document Object Model ================================================
/*
    una prop importante per 1 ogg window è: "document".
    
    --> window.document: rapp il documento html caricato nella finestra corrente e la struttura di questo oggetto è nota con il nome di DOM.

    --> DOM tree: è la composizione gerarchica del DOM (<=> window.document)

    per visualizzare la struttura al albero di un DOM, possiamo usare uno dei vari tools proposti dai BROWSER tra cui: DOM Inspector di firefox

    65) COME SELEZIONARE 1 ELTO DEL DOM? =========================================

    --> getElementById()

    Se nella pagina corrente abbiamo un elemento con un certo valore per l’attributo id, come quello del seguente esempio:
*/  <p id="mioParagrafo">Questo &egrave; un paragrafo</p>
    //possiamo utilizzare il metodo getElementById() dell’oggetto document come mostrato dal seguente codice:
    var p1 = document.getElementById("mioParagrafo"); // p1 = oggetto che rappresenta il nodo di tipo elemento che ha l’attributo id con il valore specificato. Se l’elemento non esiste viene restituito il valore null, mentre se esistono più elementi con lo stesso id viene restituito il primo individuato.
/*
    --> getElementByName() 
        restituisce l’elenco dei nodi della pagina il cui valore dell’attributo name corrisponde a quello del parametro. A differenza di getElementById(), getElementByName() restituisce un elenco di oggetti, ovvero, più precisamente, un NodeList, cioè una struttura dati simile ad un array contenente nodi del DOM
    
    --> getElementsByTagName()
        metodo chi ritorna un array e che permette di visualizzare gli elti di una pagina in base al loro TAG.*/
        var listaParagrafi = document.getElementByTagName("p"); // lista/array dei paragrafi del documento html corrente
/*
    --> getElementByClassName()
        restituisce l’elenco dei nodi a cui è stato assegnato un determinato valore come attributo class.

    --> querySelector()
        offre la possibilità di selezionare gli elementi di una pagina utilizzando i selettori CSS.
            *) querySelector(): ritorna il primo elto trovato
           
            *) querySelectorAll(): ritorna l'elenco di tutti gli elti individuati dal selettore */
var divList = document.querySelectorAll("div.messaggio");//elenco dei DIV di classe "messaggio". Ricordiamo che dovremo aver scritto la classe "messaggio" nel file CSSS
var p = document.querySelector("#mioParagrafo"); // seleziona l'elto con id = "mioParagrafo" quindi è un'alternativa a getElementById()

// 66) Modif gli elti del DOM ====================================================
/*
    una volta individuato l'elto o gli elti presenti su 1 doc html facendo uso dei metodi   
        { document.getElementById(); getElementByName(); getElementByTag();
            getElementByClassName()...querySelector()/querySelectorAll()
        }
    possiamo modificarne il contenuto o altre caratteristiche sfruttando le prop e metodi specificher dei nodi di tipo  elemento.

    --> innerHTML : è una prop che rapp il contenuto di 1 elto ed è accessibile in lettura e in scrittura. ESPIO*/

        var p = document.getElementById("mioParagrafo"); //seleziono il paragrafo con id = "mioParagrafo"
        p.innerHTML("testo del paragrafo selezionato"); // modifico il testo del paragrafo appena selezionato.

    /*  --> hasAttribute(attrName): ritorna TRUE se l'elto ha un attributo di 
            nome "attrName"

        --> hasAttributes(): ritorna TRUE se l'elto ha almeno un attributo            valorizzato
        
        -->getAttribute(attrName): ritorna il valore dell'attributo con nome          "attrName"

        -->setAttribute(attrName, value): imposta un valore per l'attributo con       nome "attrName"
        Espio: come assegnare un 'immagine di default agli elti <img> di una pagina html priva di immagine associata*/
var imgList = document.getElementByTagName("img");
for(let i=0; i<imgList.length; i++){
    if(!imgList[i].hasAttribute("src"))
        imgList[i].setAttribute("src", "default.png");
}
//alcuni tag sono direttamenrte accessibili via javascript come prop dell'elto. tra sti tag accessibili direttamente, abbiamo: name, id, src, href.
//modif dell'espio di prima:
var imgList = document.getElementByTagName("img");
for(let i=0; i<imgList.length; i++){
    if(!imgList[i].src)
        imgList[i].src = "default.png";
}

/*CONSIGLIO: In linea di massima, quando è possibile, è sempre preferibile accedere alle proprietà dell’elemento invece che all’attributo corrispondente. I casi in cui è necessario accedere agli attributi sono:
    --> quando non è prevista una corrispondente proprietà (ad esempio, in presenza di attributi custom);
    --> quando vogliamo accedere ai valori originali di quegli elementi che prevedono un’interazione con l’utente.
*/

// 67) Navigare i nodi del DOM: ==================================================
/*
    Alcuni metodi del DOM ci conssentono di analizzare e muoverci all'interno della struttura di 1 doc html.

        --> childNodes(): contiene l'elenco dei nodi figli dell'elto corrente sotto forma di NodeList. Espio: consideriamo la div seguente:
*/
<div id="mainDiv">
	<h1>Titolo</h1>
	<p>Un paragrafo</p>
	<p>Un altro paragrafo</p>
</div>
//Possiamo scoprire il contenuto degli elementi figli del <div> principale utilizzando il seguente codice JavaScript:
var div = document.getElementById("mainDiv");
for(let i=0; i<div.childNodes.length; i++){
    console.log(div.childNodes[i].innerHTML); //stampa sulla console il contenuto di ogni nodo figlio del nodo con id = "minDiv"
}
/*
    --> document.firstChild(): ritorna il primo figlio del nodo corrente
    --> document.lastChild(): ritorna l'ultimo figlio del nodo corrente
    --> parentNode(): ritorna il nodo parente del nodo corrente(RISALENDO DI UN PASSO NELLA STRUTTURA DEL DOM)
    --> nextSibling() e previousSibling(): ritornano i nodi fratelli del nodo corrente.

    --> come ottenere tutti i nodi fratelli del del nodo corrente?
*/
var me = document.getElementById("mainDiv");
var allSiblings = me.parentNode.childNodes;
var mySiblings = []; //conterra alla fine del ciclo tutti i nodi fratelli di "me"
for(let i=0; i<allSiblings.length; i++){
    if(allSiblings[i] !== me)
        mySiblings.push(allSiblings[i]);
}

//alternativa:
var me = document.getElementById("mainDiv");
var allSiblings = me.parentNode.childNodes;
var mySiblings = [];
[].forEach(allSiblings, function(el){
    if(el !== me)
        mySiblings.push(el);
});

// 68) DOM: aggiungere/rimuovere elti ============================================
/*
    oltre a modif il contenuto HTML e gli attributi di un elto, il DOM ci consente di modif la struttura di un doc. POssiamo ad espio creare elti e attributi ed aggiungerli al DOM avendo 1 effetto immediato sulla pagina HTML.*/
var mainDiv = document.getElementById("mainDiv");
var img = document.createElement("img");
var srcAttr = document.createAttribute("src");
srcAttr.value = "default.png";
img.setAttributeNode(srcAttr);
mainDiv.appendChild(img);
/*
    1--> Abbiamo utilizzato il metodo createElement() dell’oggetto document, per creare un elemento <img>.
    2--> Poi abbiamo creato l’attributo src con il metodo createAttribute() ed impostato il suo valore.
    3--> Quindi abbiamo associato l’attributo appena creato all’elemento <img> tramite setAttributeNode().
    4--> Infine abbiamo aggiunto l’elemento in fondo all’elenco dei nodi figli del div mainDiv utilizzando il metodo appendChild().

    oltre a appendChild(nomeNodo), possiamo utilizzare i metodi:
        --> insertBefore(param1, param2): inserisce un nodo prima di un altro(ad espio in un elenco): param1 = nodo da inserire | param2 = nodo prima del quale inserire:*/
    document.body.insertBefore(img, mainDiv); //inserisce il nodo IMG prima del node MAINDIV
    document.body.insertBefore(img, mainDiv.nextSibling); //In questo modo chiediamo di inserire il nodo IMG prima del fratello successivo di MAINDIV. Nel caso in cui non esista un fratello successivo, mainDiv.nextSibling = null e il nodo viene aggiunto come ultimo elemento, con lo stesso risultato di appendChild()

//come sostituire un nodo? replaceChild(param1, param2): toglie il nodo param2 e lo sostituisce con il nodo param1
mainDiv.replaceChild(img, mainDiv.firstChild()); //sostituisce il primo figlio di mainDiv con il nodo img

//eliminare nodi ed attributi
mainDiv.removeChild(mainDiv.firstChild()); //rimuove il primo figlio di mainDiv
maibnDiv.removeAttribute("class"); //rimuovere l’attributo class di un elemento