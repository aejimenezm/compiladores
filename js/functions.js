var file = document.getElementById("fileForUpload"),
    txtarea = document.getElementById("fileContents"),
    produccion = [],
    grammar = [],
    grammar1 = [],
    arrayOfLines = [],
    vari = [],
    preProd = [],
    prod2d = [],
    prod = [],
    preTerminales = [],
    terminales2 = [],
    terminales = [],
    termBit = [],
    txtvariables = document.getElementById("variables"),
    txtterminales = document.getElementById("terminales"),
    uniqueProd = [],
    uniqueVari = [],
    uniqueTerm = [],
    caracteres = [],
    tabla = '',
    result = {},
    fun1 = [],
    produk = [],
    bita = [],
    fPrimero = [],
    fSiguiente = [],
    funcPrim = [],
    funcSig = [],
    // regExp = /\-([^-]+)\-/, 
    // regExp2 = /\-([^-])\-/g,
    regExp = /\~([^~]+)\~/,
    regExp2 = /\~([^~])\~/g,
    regExp3 = /\~([^~]*)\~$/g,
    regexVar = /\d/g;

// regExp3 = /\-([^-])\-/;

// function makeTableHTML(myArray) {
//     var result = "<table border=1>";
//     for(var i=0; i<myArray.length; i++) {
//         result += "<tr>";
//         for(var j=0; j<myArray[i].length; j++){
//             result += "<td>"+myArray[i][j]+"</td>";
//         }
//         result += "</tr>";
//     }
//     result += "</table>";

//     return result;
// }

function load() {
    file.value = ''; //for IE11, latest Chrome/Firefox/Opera...
    txtarea.innerHTML = "Contenido del archivo...";
    grammar = [];
    arrayOfLines = [];
    vari = [];
    preProd = [];
    prod2d = [];
    prod = [];
    preTerminales = [];
    terminales2 = [];
    terminales = [];
    uniqueProd = [];
    uniqueVari = [];
    uniqueTerm = [];
    caracteres = [];
    // console.clear();
    document.addEventListener('contextmenu', event => event.preventDefault());
}

function rst() {
    location.reload(true);
    if (document.getElementById("runbtn").disabled = true)
        document.getElementById("runbtn").disabled = false;
    // console.clear();
}

function limpiarlista(nomlista) {
    varroot = document.getElementById(nomlista);
    while (varroot.firstChild) {
        varroot.removeChild(varroot.firstChild);
    }
}

function notificar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function processFile() {
    var file = document.getElementById("fileForUpload").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var contents = evt.target.result;
            txtarea.innerHTML = contents;
            // alert( "Got the file.\n" 
            // +"name: " + file.name + "\n"
            // +"type: " + file.type + "\n"
            // +"size: " + file.size + " bytes\n"
            // + "starts with: \n" + contents
            // );  
            notificar();
        }
        reader.onerror = function (evt) {
            txtarea.innerHTML = "error reading file";
        }
    }
    document.getElementById("runbtn").disabled = false;
}

// function reg() {
//     var regExp2 = /\-([^-]+)\-/;
//     var matches = "I expect five hundred dollars '$500'.";
//     matches = matches.replace(/'/g,"-");
//     // alert(matches);
//     var matches2 = regExp2.exec(matches);
//     //matches[1] contains the value between the parentheses
//     alert(matches2[1]);
// }
function sum(num) {
    if (num === 0) {
        return 0;
    } else {
        return `num -> ${num + sum(--num)}`
    }
}

function primero(el, listaVar) {
    // debugger;
    funcPrim = [];
    if (el in result) {
        for (var j in result[el]) {
            var elemento = result[el][j].charAt(0);
            var largo = result[el][j].length;
            var element = "";
            for (var k = 0; k < largo; k++) {
                element += result[el][j].charAt(k);
            }
            if (listaVar.includes(elemento)) {
                funcPrim = primero(elemento, listaVar);
            }
            else if ((terminales2.includes(elemento)) && (elemento != 'e')) {
                funcPrim.push(elemento);
                if (result[el].includes('e')) {
                    funcPrim.push('e');
                }
            }
            else if (terminales2.includes(element)) {
                funcPrim.push(element);
                if (result[el].includes('e')) {
                    funcPrim.push('e');
                }
            }
        }
    }
    else {
        // console.log(`${el} NO está en result`);
    }
    var nFuncPrim = [...new Set(funcPrim)]
    if (nFuncPrim.includes("e")) {
        var posE = nFuncPrim.indexOf("e");
        // console.log(`e esta en la pos: ${posE}`);
        nFuncPrim.splice(posE, 1);
        nFuncPrim.push("e");
    }
    // console.log(nFuncPrim);
    return nFuncPrim;
}

function siguiente(el, listaVar) {
    // debugger;
    if (el in result) {
        for (var i in result) {
            if ((funcSig[el] == null) || (funcSig[el] == undefined) || (funcSig[el] == "")) {
                funcSig[el] = [];
            }
            for (var j in result[i]) {
                var pCadena = result[i][j].indexOf(el);
                // if (pCadena!=-1){
                //     console.log(`${el} está en ${i}`)
                // }else{
                //     console.log(`${el} NO está en ${i}`)
                // }
                if (pCadena != -1) {
                    var pCadena2 = pCadena + 1;
                    var subToken = result[i][j].substring(pCadena2);
                    if (!isNaN(subToken)) {
                        subToken = subToken.substring(1);
                    }
                    if (terminales2.includes(subToken[0])) {
                        funcSig[el].push(subToken[0], "$");
                    }
                    else if (((subToken[0] == null) || (subToken[0] == "")) && (i != el)) {
                        if (Array.isArray(funcSig[el]) && funcSig[el].length) {

                        } else {
                            funcSig[el] = funcSig[i];
                        }
                    }
                    else if (((subToken[0] == null) || (subToken[0] == "")) && (i == el)) {

                    } else if (listaVar.includes(subToken[0])) {
                        var sigVar = subToken[0];
                        if (!isNaN(subToken[1])) {
                            sigVar = subToken.substring(0, 2);
                        }
                        var posSigVar = listaVar.indexOf(sigVar);
                        if (sigVar == i) {

                        } else {
                            funcSig[el] = fPrimero[posSigVar].concat(siguiente(sigVar, listaVar));
                        }
                    }
                }
            }
        }
    }
    if (funcSig[el].includes("e")) {
        var posE = funcSig[el].indexOf("e");
        funcSig[el].splice(posE, 1);
    }
    return funcSig[el];
}

// function siguiente(el){
//     var funcSig = [];
//     for (var i in result){
//         for (var j in result[i]){
//             var posi = result[i][j].indexOf(el)
//             // console.log(posi);
//             var sub = result[i][j].substring(posi)
//             // console.log(sub);
//             if (sub.includes(el)) {
//                 var ele = sub.replace(el,"");
//                 // console.log(ele);
//                 if (terminales2.includes(ele)) {
//                     funcSig.push(ele);
//                 } 
//                 // else{
//                 //     funcSig.push(`${sub} no esta`)
//                 // }
//             }else{
//                 // funcSig.push(`${sub} no esta`)
//             }
//         }
//     }
//     funcSig.push('$');
//     return funcSig;
// }

function valCadena() {
    // var pila = [
    // ["","","","","S","$"],
    // ["","","","T","S1","$"],
    // ["","","F","T1","S1","$"],
    // ["","","a","T1","S1","$"],
    // ["","","","T1","S1","$"],
    // ["","","","e","S1","$"],
    // ["","","+","T","S1","$"],
    // ["","","","T","S1","$"],
    // ["","","F","T1","S1","$"],
    // ["","","a","T1","S1","$"],
    // ["","","","T1","S1","$"],
    // ["","*","F","T1","S1","$"],
    // ["","","F","T1","S1","$"],
    // ["","","a","T1","S1","$"],     
    // ["","","","T1","S1","$"],
    // ["","","","e","S1","$"],
    // ["","","","","S1","$"],
    // ["","","","","e","$"],
    // ["","","","","","$"]                       
    // ];
    // console.log(pila);
    // console.log(pila[0].length);

    // var entCadena = [
    // ["a","+","a","*","a","$"],
    // ["a","+","a","*","a","$"],
    // ["a","+","a","*","a","$"],
    // ["a","+","a","*","a","$"],
    // ["","+","a","*","a","$"],
    // ["","+","a","*","a","$"],
    // ["","+","a","*","a","$"],
    // ["","","a","*","a","$"],
    // ["","","a","*","a","$"],
    // ["","","a","*","a","$"],
    // ["","","","*","a","$"],
    // ["","","","*","a","$"],
    // ["","","","","a","$"],
    // ["","","","","a","$"],
    // ["","","","","","$"],
    // ["","","","","","$"],
    // ["","","","","","$"],
    // ["","","","","","$"],
    // ["","","","","","$"]
    // ];

    // var prueba = ["","","$"];
    // var cadenita = "hola";
    // var caden = cadenita.split("");
    // for (var i in caden){
    //     prueba.push(caden[i]);
    // }

    var prePila = ["$"],
        preCadena = [],
        preRazon = [],
        bandera = 0;
    var pila = [],
        entCadena = [],
        razon = [[""]];

    for (var i in produk) {
        for (var j in produk[i]) {
            if (produk[i][j].includes("→")) {
                var p = produk[i][j].indexOf("→");
                var p1 = p + 2;
                bita[i][j] = produk[i][j].substring(p1);
            }
            else {
                bita[i][j] = produk[i][j];
            }
        }
    }

    // console.log(bita);

    // console.log(entCadena);
    var cadena = document.getElementById("cadena").value;
    var subcadena = "";
    // console.log("cadena:");
    if (cadena.includes("$")) {
        var indice = cadena.indexOf("$");
        subcadena = cadena.substring(0, indice + 1);
        // console.log(subcadena);
        var subb = subcadena.split("");
        for (var i in subb) {
            preCadena.push(subb[i]);
        }
    }
    else {
        subcadena = cadena + "$";
        // var sub2 = subcadena.split("");
        // for (var i in sub2){
        //     preCadena.push(sub2[i]);
        // }
        var copy = subcadena;

        subcadena = subcadena.replace(/[a-z]+/g, "#").replace(/[\(|\|\.)]/g, "");
        var letters = copy.split(/[^a-z\.]+/);
        var operators = subcadena.split("#").filter(function (n) { return n });

        for (i = 0; i < letters.length; i++) {
            preCadena.push(letters[i]);
            if (i < operators.length) preCadena.push(operators[i]);
        }
        var filt = [""];
        preCadena = preCadena.filter((el) => !filt.includes(el));

        // console.log(preCadena);
    }
    // console.log(prePila[0]);
    // debugger;
    console.log(preCadena);
    console.log(preCadena[0]);
    var largoCadena = preCadena.length;

    // var prue = "a"
    // var ke = /[A-Z]\d*/g.exec(prue);
    // var to = /\S\d*/g.exec(prue);
    // var n = /[A-Z]\d+/g.exec(prue);
    // console.log(ke);
    // console.log(to);
    // console.log(n);
    // // if((ke==null)||(to==null)||(n==null)){
    // //     if (ke==null) {
    // //         var token=to+n;
    // //     }else if (to==null) {
    // //         var token=ke+n;
    // //     }else if (n==null) {
    // //         var token=to+ke;
    // //     }else if ((ke==null)&&(to==null)){
    // //         var token = n;
    // //     }else if ((ke==null)&&(n==null)){
    // //         var token = to;
    // //     }else if ((to==null)&&(n==null)){
    // //         var token = ke;
    // //     }
    // // }
    // if (ke && ke.length) {   

    // } else {
    //     ke = "";
    // }
    // if (to && to.length) {   

    // } else {
    //     to = "";
    // }
    // if (n && n.length) {   

    // } else {
    //     n = "";
    // }

    // var token = to+ke+n;
    // var uniToken = [...new Set(token)];
    // uniToken.reverse();
    // // prePila.shift();
    // for (var i in uniToken){
    //     prePila.unshift(uniToken[i]);
    // }
    // console.log(prePila);
    // debugger;
    do {
        prePila = prePila.slice();
        preCadena = preCadena.slice();
        preRazon = preRazon.slice();
        if ((prePila[0] == "$") && (bandera == 0)) {
            prePila.unshift(uniqueVari[0]);
            // console.log(`El tope de la pila es ${prePila[0]}`);
            bandera = 1;
        }
        else {
            if ((prePila[0] == preCadena[0]) && (prePila[0] != "$") && (preCadena[0] != "$")) {
                prePila.shift();
                preCadena.shift();
                preRazon = "";
            } else if (prePila[0] == "e") {
                prePila.shift();
                preRazon = "";
                // console.log(pila);
            } else if ((uniqueVari.includes(prePila[0])) && (termBit.includes(preCadena[0]))) {
                var posVar = uniqueVari.indexOf(prePila[0]);
                var posTer = termBit.indexOf(preCadena[0]);
                var sigProd = bita[posVar][posTer];
                preRazon = prePila[0] + "→" + sigProd;
                // Separa el string por variables para que tome en cuenta los "1"
                var ke = /[A-Z]\d*/g.exec(sigProd);
                var t = /\S\d*/g.exec(sigProd);
                var o = /\S\d*$/g.exec(sigProd);
                var n = /[A-Z]\d+/g.exec(sigProd);
                if (ke && ke.length) {

                } else {
                    ke = "";
                }
                if (t && t.length) {

                } else {
                    t = "";
                } if (o && o.length) {

                } else {
                    o = "";
                }
                if (n && n.length) {

                } else {
                    n = "";
                }
                var token = t.concat(ke.concat(o.concat(n)));;
                var filtro = [""];
                for (var i in token) {
                    if (/\S*,/g.test(token[i])) {
                        token.splice(i, 1);
                    }
                }
                token = token.filter((el) => !filtro.includes(el));
                var uniToken = [...new Set(token)];
                if (sigProd == "id") {
                    uniToken = ["id"];
                }
                uniToken.reverse();
                prePila.shift();
                for (var i in uniToken) {
                    prePila.unshift(uniToken[i]);
                }
            }
        }
        pila.push(prePila);
        entCadena.push(preCadena);
        razon.push(preRazon);
    } while (prePila != "$");
    console.log("Pila:");
    console.log(pila);
    console.log("Cadena:");
    console.log(entCadena);
    razon.push("");
    razon.shift();

    var indexLongArray = pila.map(function (a) { return a.length; }).indexOf(Math.max.apply(Math, pila.map(function (a) { return a.length; })));
    var longArray = pila[indexLongArray].length;
    // console.log(longArray);

    var headLog = '<tr class="mdc-data-table__row">';
    headLog += `<th>Pila</th>`;
    headLog += `<th colspan="2">Cadena</th>`;
    headLog += '</tr>'
    document.getElementById("logHeader").innerHTML = headLog;

    var strLog = "";
    for (var i in pila) {
        strLog += '<tr>';
        strLog += '<td class="bPila">' + pila[i] + '</td>';
        strLog += '<td class="bCadena">' + entCadena[i] + '</td>';
        strLog += `<td align="center" class="bRazon">${razon[i]}</td>`;
        strLog += '</tr>';
    }
    // console.log(strLog);

    document.getElementById("logTable").innerHTML = strLog;
}

function run() {
    document.getElementById("runbtn").disabled = true;
    var txtarea = document.getElementById("fileContents");
    grammar1 = txtarea.value;
    grammar = grammar1.replace(/ /g, "");

    // console.log(grammar);
    arrayOfLines = grammar.split('\n');
    arrayOfLinesCopy = arrayOfLines;
    // console.log(arrayOfLines);
    vari = [];
    for (var i = 0; i < arrayOfLines.length; i++) {
        var pos = arrayOfLines[i].indexOf(":");
        vari[i] = arrayOfLines[i].slice(0, pos);
        // console.log(prod[i]+" array "+[i]);
    }
    // console.log(vari);
    // console.log("Lineas sin prod: "+arrayOfLines);
    for (var i = 0; i < arrayOfLines.length; i++) {
        var pos = arrayOfLines[i].indexOf(":");
        // var posP =arrayOfLines[i].indexOf("|");
        preProd[i] = arrayOfLines[i].substring(pos + 1);
        // console.log(terminales[i]+" array "+[i]);
    }
    // console.log(preProd);
    for (var i = 0; i < preProd.length; i++) {
        prod2d[i] = preProd[i].split("|");
        // console.log(terminales[i]+" array "+[i]);
    }
    
    // console.log(prod2d);
    for (var i = 0; i < prod2d.length; i++) {
        prod = prod.concat(prod2d[i]);
    }
    // console.log(prod);
    caracteres = vari.concat("e", "", " ", null);
    for (var i = 0; i < prod.length; i++) {
        preTerminales[i] = prod[i].replace(/'/g, "~");
        terminales = terminales.concat(regExp.exec(preTerminales[i]));
        terminales = terminales.concat(regExp2.exec(preTerminales[i]));
        terminales = terminales.concat(regExp3.exec(preTerminales[i]));
        // terminales = terminales.concat(regExp3.exec(preTerminales[i]));
        // terminales[i] = preTerminales[i].split("-");
    }
    // console.log(preTerminales);
    // console.log(terminales);
    terminales = terminales.filter((el) => !caracteres.includes(el));
    // console.log(terminales);
    for (var i = 0; i < terminales.length; i++) {
        terminales2 = terminales2.concat(terminales[i]);
    }
    // console.log(terminales2);
    var ter3 = [];
    for (var i = 1; i <= terminales2.length; i = i + 2) {
        ter3.push(terminales2[i]);
    }
    terminales2 = ter3;
    // console.log(ter3);
    // for (var i = 0; i < terminales2.length; i++) {
    //     if (terminales2) {}
    //      = terminales3.concat(terminales2[i].split(""));
    // }
    // console.log(terminales2);
    // console.log("**********");
    uniqueTerm = [...new Set(terminales2)];
    // console.log(uniqueTerm);

    uniqueTerm = uniqueTerm.filter((el) => !caracteres.includes(el));
    terminales2 = uniqueTerm;
    termBit = terminales2.concat("$");
    // var matches = "I expect five hundred dollars '$500'.";
    // matches = matches.replace(/'/g,"-");
    // alert(matches);

    //matches[1] contains the value between the parentheses
    // console.log("Regex: "+matches[1]);
    // var regExp2 = /\-([^-]+)\-/;
    // var matches = "I expect five hundred dollars '$500'.";
    // matches = matches.replace(/'/g,"-");
    // // alert(matches);
    // var matches2 = regExp2.exec(matches);
    // //matches[1] contains the value between the parentheses
    // alert(matches2[1]);
    // var str = "one'two'three";   
    // var str2 = str.replace(/'/g,"-"); 
    // var newstr = str2.split("-").pop().split("-")[0]; // returns 'two'
    // console.log(newstr);
    produccion = prod2d;
    for (var i in produccion) {
        for (var j in produccion[i]) {
            produccion[i][j] = produccion[i][j].replace(/'/g, "")
        }
    }
    console.log(produccion);
    vari.forEach((variable, i) => result[variable] = produccion[i]);

    var isRecursive = []
    var newProd = {}
    // var newGrammar = prod2d
    // for (var i in newGrammar) {
    //     for (var j in newGrammar[i]) {
    //         newGrammar[i][j] = newGrammar[i][j].replace(/'/g, "")
    //     }
    // }
    for (let i = 0; i < vari.length; i++) {
        if (isRecursive[i] == undefined) {
            isRecursive[i] = []
        }
        for (let j = 0; j < produccion[i].length; j++) {
            if (produccion[i][j].startsWith(vari[i])) {
                isRecursive[i].push(true)
            } else {
                isRecursive[i].push(false)
            }
        }
    }
    for (let i = 0; i < vari.length; i++) {
        for (let j = 0; j < produccion[i].length; j++) {
            var varPrima = vari[i] + '1'
            if (isRecursive[i].includes(true)) {
                var removeR = ''
                if (newProd[vari[i]] == undefined) {
                    newProd[vari[i]] = []
                }
                if (newProd[varPrima] == undefined) {
                    newProd[varPrima] = []
                }

                if (isRecursive[i][j] == true) {
                    removeR = produccion[i][j].replace(vari[i], '')
                    removeR += ' ' + varPrima
                    newProd[varPrima].push(removeR)
                } else {
                    removeR = produccion[i][j]
                    removeR += ' ' + varPrima
                    newProd[vari[i]].push(removeR)
                    // console.log('Variable Prima recursiva ' + varPrima);
                }
                // console.log(vari[i] + ' si es recursiva');
            } else {
                newProd[vari[i]] = produccion[i]
            }
        }
        if (newProd[varPrima]!= undefined && !newProd[varPrima].includes('e')) {
            newProd[varPrima].push('e')
        }
    }
    console.log(isRecursive);

    console.log('---New Prod Json---');
    console.log(newProd);
    var sinRKeys = Object.keys(newProd)
    console.log(sinRKeys);
    var sinRText = ""
    for (let index = 0; index < sinRKeys.length; index++) {
        sinRText += sinRKeys[index] + ': ' + newProd[sinRKeys[index]].join(" | ") + "\n"
    }
    console.log(sinRText);
    document.getElementById("sinRContent").innerHTML = sinRText
    
    // terminales2.forEach((terminal, i) => result2[terminal] = produccion[i]);
    // console.log(result2);

    // for (var i in result){
    //     console.log(i);
    // }

    // var chares = {};
    // for (var i in result)
    // {
    //     for (var j in result[i])
    //     {
    //         if ((terminales2.includes(result[i][j].charAt(0)))||(result[i][j].charAt(0)=="e")) {
    //             chares += result[i][j].charAt(0);
    //         }
    //         // console.log(`PRIMERO(${[i]}) = ${chares}`);
    //         // console.log(chares);
    //     }
    // }
    // alert(varlength);
    // for (var i = 0; i < prod.length; i++) {
    //     varr[i] = prod[i].replace(/'/g,"");
    // }
    // for (var i = 0; i < varlength; i++) {
    //         varr[i] = prod2d[i].length;
    // }
    // alert(varr);
    // console.log(arrayOfLines);
    // for (var i in prod2d) 
    // {
    //     for (var j in prod2d[i]) 
    //     {   
    //         produ = produ.concat(prod2d[i][j].replace(/'/g,""));
    //     }
    // }

    // console.log(produ);
    showArrays();
    // document.getElementById("runbtn").disabled = true;
}

// function primero() {
//     for (var i in prod2d) 
//     {
//         for (var j in prod2d[i]) 
//         {   
//             produ = produ.concat(prod2d[i][j].replace(/' /g,""));
//         }
//     }

//     console.log("Primero: " + produ);
// }

function showArrays() {
    // console.log(vari);
    uniqueVari = [...new Set(vari)];
    var str = '<ul id="lvar">';
    uniqueVari.forEach(function (item) {
        str += '<li>' + item + '</li>';
    });
    str += '</ul>';
    txtvariables.innerHTML += str;

    var str2 = '<ul id="lter">';
    terminales2.forEach(function (item) {
        str2 += '<li>' + item + '</li>';
    });
    str2 += '</ul>';
    txtterminales.innerHTML += str2;
    var produk1 = [];
    for (var i in prod2d) {
        for (var j in prod2d[i]) {
            produk1.push(`${vari[i]}→${prod2d[i][j]}`);
            tabla += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">' + vari[i] + '</td><td class="mdc-data-table__cell">' + prod2d[i][j].replace(/'/g, "") + '</td></tr>';
        }
    }
    document.getElementById("producciones").innerHTML = tabla;
    // fSiguiente = [
    // [')','$'],
    // [')','$'],
    // ['+',')','$'],
    // ['+',')','$'],
    // ['*','+',')','$'],
    // ];
    var termS = terminales2;
    termS.push("$");
    for (var i in uniqueVari) {
        fPrimero.push(primero(uniqueVari[i], uniqueVari));
    }
    for (var i in uniqueVari) {
        fSiguiente.push(siguiente(uniqueVari[i], uniqueVari));
    }
    // fSiguiente = funcSig;
    for (var i in uniqueVari) {
        produk.push(["", "", "", "", "", "", "", ""])
        for (var j in fPrimero[i]) {
            var termi = fPrimero[i][j];
            var posic = termS.indexOf(termi);
            if (posic != -1) {
                produk[i][posic] = `${vari[i]} → ${produccion[i][j]}`;
                if (produk[i][posic].includes("undefined")) {
                    produk[i][posic] = `${vari[i]} → ${produccion[i][j - 1]}`;
                }
            }
            else {
                for (var k in fSiguiente[i]) {
                    var varia = fSiguiente[i][k];
                    var poss = termS.indexOf(varia);
                    if (poss != -1) {
                        produk[i][poss] = `${vari[i]} → ${produccion[i][j]}`;
                        var sitio = produk[i].length - 1;
                        produk[i][sitio] = `${vari[i]} → ${produccion[i][j]}`;
                    }
                }
            }
            // console.log(termi);
            // console.log(posic);
        }
    }

    for (var i in produk) {
        for (var j in produk[i]) {
            if (!produk[i][j].length) {
                produk[i][j] = "";
            }
        }
    }

    var prueba = ["$"];
    var cadenita = "hola";
    var caden = cadenita.split("");
    caden = caden.reverse();
    for (var i in caden) {
        prueba.unshift(caden[i]);
    }
    // console.log(prueba);

    // console.log(produk);
    // console.log('Funcion PRIMERO');
    // console.log(fPrimero);

    var tablaFun = '';
    for (var i in uniqueVari) {
        tablaFun += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">PRIMERO(<span class="colores">' + uniqueVari[i] + '</span>):</td><td class="mdc-data-table__cell"><span class="llaves">{</span> ' + fPrimero[i] + ' <span class="llaves">}</span></td></tr>';
    }
    document.getElementById("funPrimero").innerHTML = tablaFun;

    // console.log('Funcion SIGUIENTE');

    // for (var i in uniqueVari){
    //     fSiguiente.push(siguiente(uniqueVari[i]));
    // }
    // console.log(fSiguiente);


    var tablaSig = '';
    for (var i in uniqueVari) {
        tablaSig += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">SIGUIENTE(<span class="colores">' + uniqueVari[i] + '</span>):</td><td class="mdc-data-table__cell"><span class="llaves">{</span> ' + fSiguiente[i] + ' <span class="llaves">}</span></td></tr>';
    }
    document.getElementById("funSiguiente").innerHTML = tablaSig;
    // document.getElementById("funSiguiente").style.visibility = "visible";
    // const found = prod2d[3][0].indexOf('T');
    // console.log(found);

    var headSym = '<tr class="mdc-data-table__row"><td></td>';
    for (var i in terminales2) {
        headSym += '<td>' + terminales2[i] + '</td>';
    }
    document.getElementById("symHeader").innerHTML = headSym;

    var tablaSim = '';
    for (var i in uniqueVari) {
        tablaSim += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">' + uniqueVari[i] + '</td>';
        for (var j in produk[i]) {
            tablaSim += '<td>' + produk[i][j] + '</td>';
        }
        tablaSim += '</tr>';
    }
    document.getElementById("symTable").innerHTML = tablaSim;
    console.log(produk);
    console.log(produk1);
    console.log(produccion);
    console.log("----------------------");
    console.log(result);
    console.log(fPrimero);
    console.log(fSiguiente);
    console.log(produk);
    // console.log(grammar);
    // console.log(grammar1);
    // console.log(arrayOfLines);
    // console.log(arrayOfLinesCopy);
    // console.log(vari);
    // console.log(preProd);
    // console.log(prod2d);
    // console.log(prod);
    // console.log(preTerminales);
    // console.log(terminales2);
    // console.log(terminales);
    // console.log(txtvariables);
    // console.log(txtterminales);
    // console.log(uniqueProd);
    // console.log(uniqueVari);
    // console.log(uniqueTerm);
    // console.log(caracteres);
    console.log("----------------------");
}
// document.getElementById('fileForUpload').addEventListener('change', run, false);