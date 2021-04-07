var file = document.getElementById("fileForUpload"),
txtarea = document.getElementById("fileContents"),
grammar = [],
grammar1 = [],
arrayOfLines = [],
vari = [],
preProd = [],
prod2d = [],
prod = [],
preTerminales =[],
terminales2 = [],
terminales = [],
test = [],
txtvariables = document.getElementById("variables"),
txtterminales = document.getElementById("terminales"),
uniqueProd = [],
uniqueVari = [],
uniqueTerm = [],
caracteres = [],
caracteresV = [];
// regExp = /\-([^-]+)\-/;

function load(){
    file.value = ''; //for IE11, latest Chrome/Firefox/Opera...
    txtarea.innerHTML = "Contenido del archivo...";
    grammar = [];
    arrayOfLines = [];
    vari = [];
    preProd = [];
    prod2d = [];
    prod = [];
    preTerminales =[];
    terminales2 = [];
    terminales = []; 
    uniqueProd = [];
    uniqueVari = [];
    uniqueTerm = [];
    caracteres = [];
    console.clear();
}

function rst(){
    file.value = ''; //for IE11, latest Chrome/Firefox/Opera...
    txtarea.innerHTML = null;    
    grammar.length = 0;
    arrayOfLines.length = 0;
    vari.length = 0;
    preProd.length = 0;
    prod2d.length = 0;
    prod.length = 0;
    preTerminales.length = 0;
    terminales2.length = 0;
    terminales.length = 0;
    uniqueProd.length = 0;
    uniqueVari.length = 0;
    uniqueTerm.length = 0;
    caracteres.length = 0;
    limpiarlista("lvar");
    limpiarlista("lter");
    if (document.getElementById("runbtn").disabled = true)
        document.getElementById("runbtn").disabled = false;
    console.clear();
}

function limpiarlista(nomlista) {
    varroot = document.getElementById(nomlista);
    while( varroot.firstChild ){
        varroot.removeChild( varroot.firstChild );
    }
}

function notificar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function processFile(){
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

function run() {
    var txtarea = document.getElementById("fileContents");
    grammar1 = txtarea.value;
    grammar = grammar1.replace(/ /g,".");

	// console.log(grammar);
	arrayOfLines = grammar.split('\n');
    arrayOfLinesCopy = arrayOfLines;
    // console.log(arrayOfLines);
    vari = [];
    for (var i = 0; i < arrayOfLines.length; i++) {
      var pos = arrayOfLines[i].indexOf(":");
      vari[i] = arrayOfLines[i].slice(0,pos);
		// console.log(prod[i]+" array "+[i]);
	}
    // console.log("Lineas sin prod: "+arrayOfLines);
    for (var i = 0; i < arrayOfLines.length; i++) {
        var pos = arrayOfLines[i].indexOf(":");
        // var posP =arrayOfLines[i].indexOf("|");
        preProd[i] = arrayOfLines[i].substring(pos+1);
        // console.log(terminales[i]+" array "+[i]);
    }
    for (var i = 0; i < preProd.length; i++) {
        prod2d[i] = preProd[i].split("|");
        // console.log(terminales[i]+" array "+[i]);
    }
    for (var i = 0; i < prod2d.length; i++) {
        prod = prod.concat(prod2d[i]);
    }
    for (var i = 0; i < prod.length; i++) {
        preTerminales[i] = prod[i].replace(/'/g,"-");
        // terminales[i] = regExp.exec(preTerminales[i]);
        terminales[i] = preTerminales[i].split("-");
    }
    for (var i = 0; i < terminales.length; i++) {
        terminales2 = terminales2.concat(terminales[i]);
    }
    for (var i = 0; i < terminales2.length; i++) {
        test = test.concat(terminales2[i].split("."));
    }
    uniqueVari = test;
    console.log(uniqueVari);
    uniqueVari = [...new Set(vari)];
    console.log(uniqueVari);
    var vari2 = [];
    for (var i = 0; i < uniqueVari.length; i++) {
        vari2 = vari2.concat(uniqueVari[i].split("."));
    }
    // for (var i = 0; i < terminales2.length; i++) {
    //     if (terminales2) {}
    //      = terminales3.concat(terminales2[i].split(""));
    // }
    // console.log(terminales2);
    // console.log("**********");
    uniqueTerm = [...new Set(terminales2)];
    // console.log(uniqueTerm);
    caracteres = vari.concat("SS","e",""," ",".");
    caracteresV = terminales2.concat("e",""," ",".");
    uniqueTerm = uniqueTerm.filter( ( el ) => !caracteres.includes( el ) );
    vari2 = vari2.filter( ( el ) => !caracteresV.includes( el ) );
    uniqueVari = vari2;    
    console.log(uniqueVari);
    terminales2 = uniqueTerm;
    test = test.filter( ( el ) => !caracteresV.includes( el ) );  
    var ter2 = [];
    for (var i = 0; i < terminales2.length; i++) {
        ter2 = ter2.concat(terminales2[i].split("."));
    }  
    var ter3 = [...new Set(ter2)];
    console.log(ter3);
    ter3 = ter3.filter( ( el ) => !caracteres.includes( el ) );
    console.log(ter3);
    // test = test.filter( ( el ) => !caracteres.includes( el ) );
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
    showArrays();    
    document.getElementById("runbtn").disabled = true;
	// console.log(arrayOfLines);
}

function showArrays() {
    var str = '<ul id="lvar">';
    uniqueVari.forEach(function (item){
        str += '<li>' + item + '</li>';
    });
    str += '</ul>';    
    txtvariables.innerHTML += str; 

    var str2 = '<ul id="lter">';
    terminales2.forEach(function (item){
        str2 += '<li>' + item + '</li>';
    });
    str2 += '</ul>';       	
    txtterminales.innerHTML += str2;

    console.log("----------------------");
    console.log(test);
    console.log(grammar);
    console.log(grammar1);
    console.log(arrayOfLines);
    console.log(arrayOfLinesCopy);
    console.log(vari);
    console.log(preProd);
    console.log(prod2d);
    console.log(prod);
    console.log(preTerminales);
    console.log(terminales2);
    console.log(terminales);
    console.log(txtvariables);
    console.log(txtterminales);
    console.log(uniqueProd);
    console.log(uniqueVari);
    console.log(uniqueTerm);
    console.log(caracteres);
    console.log("----------------------");

}
// document.getElementById('fileForUpload').addEventListener('change', run, false);