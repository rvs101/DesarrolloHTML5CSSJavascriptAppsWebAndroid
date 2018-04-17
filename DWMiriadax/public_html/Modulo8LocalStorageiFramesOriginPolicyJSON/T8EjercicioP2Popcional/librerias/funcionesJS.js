/* 
 Created on : 16-abr-2018, 12:11:13
 Author     : Robot
 */
$(function () {
  localStorage.c = (localStorage.c || "0.0");
  var t, cl = $("#crono");
  /**
   * 
   * @returns {undefined}
   */
  function incr() {
    localStorage.c = +localStorage.c + 0.1;
  }
  /**
   * 
   * @returns {undefined}
   */
  function mostrar() {
    cl.html((+localStorage.c).toFixed(1));
  }
  ;
  /**
   * 
   * @returns {undefined}
   */
  function arrancar() {
    t = setInterval(function () {
      incr();
      mostrar();
    }, 100);
  }
  ;
  /**
   * 
   * @returns {undefined}
   */
  function parar() {
    clearInterval(t);
    t = undefined;
  }
  ;
  /**
   * 
   * @returns {undefined}
   */
  function cambiar() {
    if (!t)
      arrancar();
    else
      parar();
  }
  ;
  /**
   * 
   * @returns {undefined}
   */
  function inicializar() {
    localStorage.c = "0.0";
    mostrar();
  }
  ;
// ANTIGUO METODO SIN LIBRERIA
//  $("#cambiar").on('click', cambiar);
//  $("#inicializar").on('click', function () { localStorage.c = "0.0";
//    mostrar();
//  });
  $('body').on('swipe', inicializar);
  $('body').on('tap', cambiar);
  mostrar();
});