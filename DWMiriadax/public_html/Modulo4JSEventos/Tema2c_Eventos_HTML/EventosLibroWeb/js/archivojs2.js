function resaltar() {
    alert("Lanzar metodo desde archivojs2.js");
}

function resaltar2() {
    alert("Lanzar metodo desde archivojs2.js");
}

function resaltar3() {

    var camposInput = formulario.getElementsByTagName('input');

    for (var i = 0; i < camposInput.length; i++) {
        if (camposInput[i].type == "text") {
            var x = document.getElementsByTagName('input')[i];
            x.style.backgroundColor = "#ffcccc";
        }
    }
    // lanzar el 2º metodo
    resaltar2();
}



