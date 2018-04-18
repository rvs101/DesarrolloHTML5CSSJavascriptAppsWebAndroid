/* 
 Created on : 17-abr-2018, 10:07:47
 Author     : Robot
 */
var map, lat, lng, latStart, lngStart, puntos;

/**
 * 
 * @type type
 */
if (localStorage.ruta) {
  puntos = JSON.parse(localStorage.ruta);
} else {
  puntos = new Array;
}

$(document).ready(function () {

  /***
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
// muestra ruta entre marcas anteriores y actuales
    map.drawRoute({
      origin: [lat, lng], // origen en coordenadas anteriores
      // destino en coordenadas del click o toque actual
      destination: [e.latLng.lat(), e.latLng.lng()],
      travelMode: 'WALKING',
      strokeColor: '#f44271',
      strokeOpacity: 0.6,
      strokeWeight: 3
    });
    lat = e.latLng.lat(); // guarda coords para marca siguiente
    lng = e.latLng.lng();
    map.addMarker({lat: lat, lng: lng}); // pone marcador en mapa
    map.setCenter(lat, lng); // centra la imagen dependiendo de las coordenadas
    map.fitZoom(); // optimiza el zoom en la zona
  }
  ;

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
        alert('Falla la Geolocalización: ' + error.message);
      },
      not_supported: function () {
        alert("El navegador no soporta la geolocalización");
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
   * @returns {undefined}s
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

