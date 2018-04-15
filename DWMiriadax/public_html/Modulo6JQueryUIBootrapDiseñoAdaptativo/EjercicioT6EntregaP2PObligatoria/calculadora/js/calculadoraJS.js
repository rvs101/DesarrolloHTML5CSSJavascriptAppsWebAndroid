/* 
 Created on : 11-abr-2018, 18:52:58
 Author     : Robot
 */
/**
 * Cuando se cargue el Arbol DOM se puede usar las funciones JQUERY
 * @returns {undefined}
 */
$(function () {
  var acu = 0, ope = "";
  $("#n1").on("click",
          function () {
            $("#n1").text("");
          }
  );

  $("#numeroC").on("click",
          function () {
            $("#n1").text(0);
          }
  );

  $("#cuadrado").on("click",
          function () {
            var num = $("#n1");
            num.text(num.text() * num.text());
          }
  );
  $("#inverso").on("click",
          function () {
            var num = $("#n1");
            num.text(1 / num.text());
          }
  );
  $("#raizCuadrada").on("click",
          function () {
            var num = $("#n1");
            num.text(Math.sqrt(num.text()));
          }
  );
  $("#parteEntera").on("click",
          function () {
            var num = $("#n1");
            var numDecimal = Number.parseFloat(num.text());
            var numPrec2 = (numDecimal.toPrecision(2));
            if (numPrec2 > 0.0) {
              alert('Positivo: ' + numPrec2);
              $('#n1').text(Math.floor(numPrec2));
            } else {
              var nuevoValor = Math.abs(numPrec2);
              alert('Negativo : ' + -nuevoValor);
              nuevoValor = Math.ceil(nuevoValor);
              $('#n1').text(-nuevoValor);
            }
          }
  );
  $("#potencia").on("click",
          function () {
            var num = $("#n1");
            num.text(Math.pow(2, num.text()));
          }
  );
  $("#factorial").on("click",
          function () {
            var num = $("#n1");

            function factorial(n) {
              if (n === 1) {
                return(1);
              }
              return(n * factorial(n - 1));
            }

            num.text(factorial(num.text()));
          }
  );

  $("#sumar").on("click",
          function () {
            acu = $("#n1").text();
            ope = "+";
          }
  );
  $("#restar").on("click",
          function () {
            acu = $("#n1").text();
            ope = "-";
          }
  );
  $("#multiplicar").on("click",
          function () {
            acu = $("#n1").text();
            ope = "*";
          }
  );
  $("#dividir").on("click",
          function () {
            acu = $("#n1").text();
            ope = "/";
          }
  );
  $("#exponencial").on("click",
          function () {
            acu = $("#n1").text();
            ope = "^";
          }
  );

  $("#calcular").on("click",
          function () {
            var num = $("#n1");

            switch (ope) {
              case "+":
                num.text(+acu + +num.text());
                break;
              case "-":
                num.text(+acu - +num.text());
                break;
              case "*":
                num.text(+acu * +num.text());
                break;
              case "/":
                num.text(+acu / +num.text());
                break;
              case "^":
                num.text(Math.pow(+acu, +num.text()));
                break;

            }
          }
  );

  $("#sumatoria").on("click",
          function () {
            var num = $("#n1");
            var lista = num.text().split(",");

            for (var i = 0, acc = 0; i < lista.length; i++) {
              acc += +lista[i];
            }
            num.text(+acc);
          }
  );

  $("#producto").on("click",
          function () {
            var num = $("#n1");
            var lista = num.text().split(",");

            for (var i = 0, acc = 1; i < lista.length; i++) {
              acc *= +lista[i];
            }
            num.text(+acc);
          }
  );

  $("#toM").on("click",
          function () {
            var num1 = $("#n1");
            var num2 = $("#n2");
            num2.text(num1.text());
          }
  );

  $("#fromM").on("click",
          function () {
            var num1 = $("#n1");
            var num2 = $("#n2");
            num1.text(num2.text());
          }
  );

  var fe = function () {
    let fecha = new Date();
    var msj;
    if ((fecha.getHours() >= 7) && (fecha.getHours() <= 12) && (fecha.getMinutes() > 0)) {
      if (fecha.getMinutes() < 10) {
        msj = ('Buenos dias - ' + (fecha.getHours() + ':0' + fecha.getMinutes()).toString());
        console.log(msj);
      } else {
        msj = ('Buenos dias - ' + (fecha.getHours() + ':' + fecha.getMinutes()).toString());
      }
    }
    if ((fecha.getHours() > 12) && (fecha.getHours() <= 14) && (fecha.getMinutes() > 0)) {
      if (fecha.getMinutes() < 10) {
        msj = ('Buen mediodia - ' + (fecha.getHours() + ':0' + fecha.getMinutes()).toString());
        console.log(msj);
      } else {
        msj = ('Buen mediodia  - ' + (fecha.getHours() + ':' + fecha.getMinutes()).toString());
      }
    }
    if ((fecha.getHours() > 14) && (fecha.getHours() <= 20) && (fecha.getMinutes() > 0)) {
      if (fecha.getMinutes() < 10) {
        msj = ('Buenas tardes - ' + (fecha.getHours() + ':0' + fecha.getMinutes()).toString());
        console.log(msj);
      } else {
        msj = ('Buenas tardes - ' + (fecha.getHours() + ':' + fecha.getMinutes()).toString());
      }
    }
    if (fecha.getHours() > 20 && (fecha.getMinutes() > 0)) {
      if (fecha.getMinutes() < 10) {
        msj = ('Buenas noches - ' + (fecha.getHours() + ':0' + fecha.getMinutes()).toString());
        console.log(msj);
      } else {
        msj = ('Buenas noches - ' + (fecha.getHours() + ':' + fecha.getMinutes()).toString());
      }
      ;
    }
    return msj;
  };

  $('#tiempo').html(fe());

});