/* 
 Created on : 16-abr-2018, 1:29:13
 Author     : Robot
 */
var t, actual;

function select(i) {
  actual = i;

  $("nav a")
          .removeClass("on off")
          .addClass(function (j) {
            return(j === i) ? "on" : "off";
          });

  $("#persona").html(galeria[i].persona);
  $("#frase").html(galeria[i].frase);
  $("#foto").attr("src", galeria[i].foto);

  clearTimeout(t);
  t = setTimeout(function () {
    select((i + 1) % galeria.length);
  }, 2000);
}

function generar_selector() { // regenera la botonera
  var selector = $("#selector");

  selector.html("");

  galeria.forEach(function (elem, i) {
    selector.append("<li><a onClick='select(" + i + ")'></a></li>");
  });
}

$(function () {
  generar_selector();

// Añadir
  $("#nuevo").on("click", function () {
    $("#datos").css("display", "none");

    actual = galeria.push({
      persona: $("#persona_d").html(),
      frase: $("#frase_d").html(),
      foto: $("#foto_d").html()
    }) - 1;

    generar_selector();

    select(actual);
    $('footer').toggle();
  });

// Editar
  $("#editar").on("click", function () {
    clearTimeout(t);

    $("#persona_d").html(galeria[actual].persona);
    $("#frase_d").html(galeria[actual].frase);
    $("#foto_d").html(galeria[actual].foto);

    //$("#datos").css("display", "block");
    $('#datos').toggle();

    $('footer').toggle();
  });

// Actualizar
  $("#guardar").on("click", function () {
    $("#datos").css("display", "none");

    galeria[actual].persona = $("#persona_d").html();
    galeria[actual].frase = $("#frase_d").html();
    galeria[actual].foto = $("#foto_d").html();
    generar_selector();
    select(0);
    $('footer').toggle();
  });

// Eliminar
  $("#borrar").on("click", function () {
    $("#datos").css("display", "none");

    galeria.splice(actual, 1);
    generar_selector();
    if (galeria.length > 0) {
      select(0);
      $("#borrar").attr("title", "Eliminar Cita ");
    } else if (galeria.length === 0) {
      $("#persona").html("");
      $("#frase").html("");
      $("#foto").attr("src", "");
      $("#borrar").attr("title", "No Hay Citas");
    }
  });


  select(0);
});