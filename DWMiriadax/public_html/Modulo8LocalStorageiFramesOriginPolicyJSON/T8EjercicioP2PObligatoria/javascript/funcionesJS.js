/* 
 Created on : 16-abr-2018, 17:55:42
 Author     : Robot
 */
var t, actual;

localStorage.galeriaLocal = localStorage.galeriaLocal || '[]';
var galeriaLocal = JSON.parse(localStorage.galeriaLocal);

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
  }, 9000);
}

function generar_selector() { // regenera la botonera
  var selector = $("#selector");

  selector.html("");

  galeria.forEach(function (elem, i) {
    selector.append("<li><a onClick='select(" + i + ")'></a></li>");
  });
}


$(function () {
  var visitas = $("#visitas");
  localStorage.visitas = localStorage.visitas || 0;
  localStorage.setItem("visitas", parseInt(localStorage.getItem("visitas") || 0) + 1);
  visitas.html(localStorage.visitas);

  if (galeriaLocal.length > 0)   // Si EXISTEN en variables Locales se reemplaza la galería
  {
    galeria = galeriaLocal;
  }
  generar_selector();

  $("#editar").on("click", function () {
    clearTimeout(t);
    if (galeria.length > 0)
    {
      $("#persona_d").html(galeria[actual].persona);
      $("#frase_d").html(galeria[actual].frase);
      $("#foto_d").html(galeria[actual].foto);
    }
    //$("#datos").css("display", "block");
    $('#datos').toggle();
    $('#ayuda').toggle();
  })


  $("#nuevo").on("click", function () {
    $("#datos").css("display", "none");

    actual = galeria.push({
      persona: $("#persona_d").html(),
      frase: $("#frase_d").html(),
      foto: $("#foto_d").html()
    }) - 1;

    generar_selector();

    select(actual);
    $('#ayuda').toggle();
  })



  // Eliminar
  $("#borrar").on("click", function () {
    $("#datos").css("display", "none");

    galeria.splice(actual, 1);
    generar_selector();
    if (galeria.length > 0) {
      select(0);
      $("#borrar").attr("title", "Eliminar esta Cita... ");
    } else if (galeria.length === 0) {
      $("#persona").html("");
      $("#frase").html("");
      $("#foto").attr("src", "");
      $("#borrar").attr("title", "No Hay Citas...");
    }
    $('#ayuda').toggle();
  })

  // Actualizar
  $("#guardar").on("click", function () {
    $("#datos").css("display", "none");

    galeria[actual].persona = $("#persona_d").html();
    galeria[actual].frase = $("#frase_d").html();
    galeria[actual].foto = $("#foto_d").html();
    generar_selector();
    select(0);
    $('#ayuda').toggle();
  })


  // Guardar la Base de Datos Serializada con JSON
  $("#Guardarbd").on("click", function () {
    $("#datos").css("display", "none");

    var respuesta = confirm("¿Guardar las Citas Actuales en tu Base de Datos Local?")
    if (respuesta === true)
    {
      localStorage.removeItem("galeriaLocal");
      localStorage.galeriaLocal = localStorage.galeriaLocal || '[]';
      galeriaLocal = JSON.parse(localStorage.galeriaLocal);

      for (j = 0; j < galeria.length; j++)
      {
        galeriaLocal.push(galeria[j]);
      }
      localStorage.galeriaLocal = JSON.stringify(galeriaLocal);
      alert("Citas Guardadas en tu Base de Datos Local. (Cuando actualices o abras de nuevo tu navegador podrás verlas.)");
      select(0);
    }
    $('#ayuda').toggle();
  })

  // Regenerar las Citas Originales
  $("#RegCitas").on("click", function () {
    $("#datos").css("display", "none");
    $('#ayuda').css("display", "block");
    var respuesta = confirm("¿Eliminar tu Base de Datos Local y  Regenerar Citas con los Contenidos Iniciales ? ")
    if (respuesta === true)
    {
      localStorage.removeItem("galeriaLocal");
      galeria = fnClone(galeriaInicial);
      generar_selector();
      select(0);
      alert("Has eliminado tu Base de Datos Local de Citas. Se han Restaurado las Citas Originales.");
    }
    galeria = galeriaLocal;
  })

  select(0);
});
