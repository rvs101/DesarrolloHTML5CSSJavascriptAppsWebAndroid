/* 
 Created on : 17-abr-2018, 14:43:48
 Author     : Robot
 */
var map, lat, lng, latStart, lngStart, puntos;

if (localStorage.ruta) {
  puntos = JSON.parse(localStorage.ruta);
} else {
  puntos = new Array;
}

/**
 * Carga el document DOM
 * @returns {undefined}
 */
$(function () {

  /**
   * 
   * @returns {undefined}
   */
  function limpiar() {
    delete puntos;
    delete localStorage.ruta;
    puntos = new Array;
    geolocalizar();
  }

  $("#limpiar").on("click", limpiar);
  $("#compactar").on("click", compactar);

  /**
   * 
   * @param {type} e
   * @returns {undefined}
   */
  function enlazarMarcador(e) {
    map.drawRoute({
      origin: [lat, lng],
      destination: [e.latLng.lat(), e.latLng.lng()],
      travelMode: 'driving',
      strokeColor: 'rgba(26, 188, 156,.6)',
      strokeWeightpin: 5
    });
    lat = e.latLng.lat();
    lng = e.latLng.lng();
    map.addMarker({lat: lat, lng: lng});
    map.setCenter(lat, lng);
    map.fitZoom();
  }

  /**
   * 
   * @param {type} start
   * @returns {undefined}
   */
  function geolocalizar(start) {
    GMaps.geolocate({
      success: function (p) {
        lat = p.coords.latitude;
        lng = p.coords.longitude;
        map = new GMaps({
          el: '#mapa',
          lat: lat,
          lng: lng,
          click: function (e) {
            enlazarMarcador(e);
            puntos.push([lat, lng]);
          },
          tap: function (e) {
            enlazarMarcador(e);
            puntos.push([lat, lng]);
          }
        });
        map.addMarker({lat: lat, lng: lng});
        if (start) {
          start();
        }
      },
      error: function (error) {
        alert('Ha Fallado la geolocalización: ' + error.message);
      },
      not_supported: function () {
        alert("El navegador que estas usando no soporta la geolocalización " + navigator.appName);
      },
    });
  }

  /**
   * 
   * @returns {undefined}
   */
  function dibujar() {
    latStart = lat;
    lngStart = lng;
    for (var i in puntos) {
      var param = {
        "latLng": {
          lat: function () {
            return puntos[i][0];
          },
          lng: function () {
            return puntos[i][1];
          }
        }
      };
      enlazarMarcador(param);
    }
  }
  
  /**
   * 
   * @returns {undefined}
   */
  function compactar() {
    puntos = [[latStart, lngStart], puntos.pop()];
    lat = latStart;
    lng = lngStart;
    geolocalizar(dibujar);
  }
  geolocalizar(dibujar);

  window.onbeforeunload = function () {
    localStorage.ruta = JSON.stringify(puntos);
  };

  document.addEventListener('visibilitychange', function () {
    localStorage.ruta = JSON.stringify(puntos);
  }, false);
});

