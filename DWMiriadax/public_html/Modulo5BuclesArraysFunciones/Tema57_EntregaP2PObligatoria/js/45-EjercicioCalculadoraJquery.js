/* 
 Created on : 11-abr-2018, 18:52:58
 Author     : Robot
 */

var acc = 0;
var acc2 = 0;
var c = 1;

/**
 * Cargar el arbol DOM Completo para ejecutar valores
 * @returns {undefined}
 */
$(function () {
  $("#n1").on("click",
          function () {
            $("#n1").val("");
          }
  );
  $("#b1").on("click",
          function () {
            var num = $("#n1");
            num.val(num.val() * num.val());
          }
  );
  $("#b2").on("click",
          function () {
            var num = $("#n1");
            num.val((1 / num.val()).toFixed(3));
          }
  );
  $("#b3").on('click',
          function () {
            var num = $("#n1");
            num.val((Math.sqrt(num.val()).toFixed(4)));
          }
  );
  $("#b4").on('click',
          function () {
            var num = $("#n1");
            var numDecimal = Number.parseFloat(num.val());
            var numPrec2 = (numDecimal.toPrecision(2));
            if (numPrec2 >= 0.0) {
              alert('Positivo: ' + numPrec2);
              $('#n1').html('Positivo : ' + num.val(Math.floor(numPrec2)));
            } else {
              var nuevoValor = Math.abs(numPrec2);
              alert('Negativo : ' + -nuevoValor);
              nuevoValor = Math.ceil(nuevoValor);
              $('#n1').html('Negativo: ' + num.val(-nuevoValor));
            }
          }
  );

  $("#b5").on('click', function () {
    var num = $("#n1");
  });
});

 