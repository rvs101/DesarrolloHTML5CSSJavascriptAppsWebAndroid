function eventoBasicoJS() {

    // seleccion el 'selector' mediante querySelector
    var btn = document.querySelector('button');

    // funcion basica
    function random(number) {
        return Math.floor(Math.random() * (number + 1));
    }

    // objeto 'boton' del selector - agrego un Evento inline 'onclick'
    btn.onclick = function () { // funcion anonima
        var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
        // le paso el color como valor 'rgb'
        document.body.style.backgroundColor = rndCol;
    }
}