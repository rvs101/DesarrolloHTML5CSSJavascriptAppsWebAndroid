/* 
 Created on : 11-abr-2018, 18:52:58
 Author     : Robot
 */
/**
 * Cuando se cargue el Arbol DOM se puede usar las funciones JQUERY
 * @returns {undefined}
 */
$(function () {
// variable que almacena el 1º numero
  //limpia la entrada de datos
  $("#in1").on("click",
          function () {
            $("#in1").val("");
          }
  );

  var valorEntrada = $("#in1");
  var valorAcumulado = 0;
  var operador = "";
  //potencia
  $("#potencia2").on("click",
          function () {
            var num = $("#in1");
            num.val(num.val() * num.val());
          }
  );
  //inverso
  $("#inverso").on("click",
          function () {
            var num = $("#in1");
            num.val((1 / num.val()).toFixed(3));
          }
  );
  //raiz cuadrada
  $("#raizCuadrada").on('click',
          function () {
            var num = $("#in1");
            num.val((Math.sqrt(num.val()).toFixed(4)));
          }
  );
  //parte entera
  $("#parteEntera").on('click',
          function () {
            var num = $("#in1");
            var numDecimal = Number.parseFloat(num.val());
            var numPrec2 = (numDecimal.toPrecision(2));
            if (numPrec2 >= 0.0) {
              alert('Positivo: ' + numPrec2);
              $('#in1').html('Positivo : ' + num.val(Math.floor(numPrec2)));
            } else {
              var nuevoValor = Math.abs(numPrec2);
              alert('Negativo : ' + -nuevoValor);
              nuevoValor = Math.ceil(nuevoValor);
              $('#in1').html('Negativo: ' + num.val(-nuevoValor));
            }
          }
  );

//parte factorial
  $('#factorial').on('click', function () {
    var f = 1;
    for (var i = 2; i <= $('#in1').val(); i++) {
      f = (f * i);
    }
    $('#in1').val(f);
  });

  /**
   * Sumar
   */
  $('#sumar').on('click', function () {
    valorAcumulado = valorEntrada.val();
    operador = ('+');
  });

  /**
   * Restar
   */
  $('#restar').on('click', function () {
    valorAcumulado = valorEntrada.val();
    operador = ('-');
  });

  /**
   * Multiplicar
   */
  $('#multiplicar').on('click', function () {
    valorAcumulado = valorEntrada.val();
    operador = ('*');
  });

  /**
   * Operacion de division
   */
  $('#dividir').on('click', function () {
    valorAcumulado = valorEntrada.val();
    operador = ('/');
  });

  /**
   * Cuando seleccione el input #in1 ejecuta el evento 'click'
   */
  $("#potencia").on('click',
          function () { //1ºfuncion 'cuando este seleccionado' coge el 1º valor
            valorAcumulado = valorEntrada.val();
            operador = "pot";
          }
  );

  /**
   * 
   */
  $('#sumatoria').on('click', function () {
    var numeros = valorEntrada.val();
    var resultado = 0;

    var arrayDeNumeros = numeros.split(",");

    for (var i = 0; i < arrayDeNumeros.length; i++) {
      resultado += +arrayDeNumeros[i];
    }
    valorEntrada.val(resultado);
  });

  /**
   * 
   */
  $('#producto').on('click', function () {
    var numeros = valorEntrada.val();
    var resultado = 1;
    var arrayDeNumeros = numeros.split(",");
    for (var i = 0; i < arrayDeNumeros.length; i++) {
      resultado *= +arrayDeNumeros[i];
    }
    valorEntrada.val(resultado);
  });

  /**
   * Realiza las operaciones pasadas por parametros mediante 'oper'
   */
  $("#calcular").on("click", function () {
    if (operador === "+") {
      valorEntrada.val(+valorAcumulado + (+valorEntrada.val()));
    }
    ;
    if (operador === "-") {
      valorEntrada.val(+valorAcumulado - (+valorEntrada.val()));
    }
    ;
    if (operador === "*") {
      valorEntrada.val(+valorAcumulado * (+valorEntrada.val()));
    }
    ;
    if (operador === "/") {
      valorEntrada.val(+valorAcumulado / (+valorEntrada.val()));
    }
    ;
    if (operador === "pot") {
      valorEntrada.val(Math.pow(+valorAcumulado, +valorEntrada.val()));
    }
    ;
    operador = "";
  }

  );
});