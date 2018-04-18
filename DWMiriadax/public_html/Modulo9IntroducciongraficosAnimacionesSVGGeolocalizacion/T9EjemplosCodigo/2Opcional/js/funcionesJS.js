/* 
 Created on : 17-abr-2018, 10:07:47
 Author     : Robot
 */
var map, lat, lng;
var compacta;

$(document).ready(function () {

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

    lat = e.latLng.lat();   // guarda coords para marca siguiente
    lng = e.latLng.lng();

    map.addMarker({lat: lat, lng: lng});  // pone marcador en mapa
  }
  ;

  function geolocalizar() {
    var ruta = JSON.parse(localStorage.ruta || "[]");
    GMaps.geolocate({
      success: function (position) {
        lat = position.coords.latitude;  // guarda coords en lat y lng
        lng = position.coords.longitude;

        if (ruta.length == 0) {
          ruta = [[lat, lng]];
        }

        map = new GMaps({// muestra mapa centrado en coords [lat, lng]
          el: '#map',
          lat: lat,
          lng: lng,
          click: enlazarMarcador,
          tap: enlazarMarcador
        }); //map = new GMaps({

        $.each(ruta, function (ind, punto) {
          map.drawRoute({
            origin: [lat, lng],
            destination: [punto[0], punto[1]],
            travelMode: 'driving',
            strokeColor: '#00F',
            strokeOpacity: 0.6,
            strokeWeight: 5
          });

          lat = punto[0];
          lng = punto[1];

          map.addMarker({lat: punto[0], lng: punto[1]});  // marcador en [lat, lng] 
        });

      }, //success: function(position){
      error: function (error) {
        alert('Geolocalización falla: ' + error.message);
      },
      not_supported: function () {
        alert("Su navegador no soporta geolocalización");
      },
    }); //GMaps.geolocate({
  }
  ; //function geolocalizar(){

  $('#limpiar').on('click', function () {
    localStorage.ruta = JSON.stringify([]);
    geolocalizar();
  });

  $("#compactar").on('click', function () {
    compacta = [[map.markers[0].position.lat(), map.markers[0].position.lng()], [map.markers[map.markers.length - 1].position.lat(), map.markers[map.markers.length - 1].position.lng()]];
    localStorage.ruta = JSON.stringify(compacta);
    geolocalizar();
  });

  geolocalizar();
});

$(function () {
  window.onbeforeunload = function (e) {
    var ruta = [];
    //Devolver el par clave/valor actual de un array y avanzar el cursor del array
    $.each(map.markers, function (ind, punto) {
      ruta.push([punto.position.lat(), punto.position.lng()]);
    });
    localStorage.ruta = JSON.stringify(ruta);
  };
});