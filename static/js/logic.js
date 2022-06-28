
// Creating map object
var myMap = L.map("map", {
  center: [41.8884470409346, -87.62885080274026],
  zoom: 17
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var myIcon = L.icon({
    iconUrl: './static/icon/run-icon.png',
    iconSize: [30, 30],
    iconAnchor: [0, 10],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var start = L.latLng(41.8884470409346, -87.62885080274026)
// var goal = L.latLng(41.89, -87.61)
  
var markerStart = L.marker(start,{
    icon: myIcon,
    title:"Start Point", 
    draggable:true
}).addTo(myMap);

markerStart.on(
    'click', onClick
);

function onClick(e){
    console.log(e.latlng)
}

myMap.on('click', function(e){

    var newMarker = L.marker([e.latlng.lat, e.latlng.lng],{
        icon:myIcon,
        title: "End Point",
        draggable:true
    }).addTo(myMap);

    L.Routing.control({
    waypoints: [
        start,
        L.latLng(e.latlng.lat, e.latlng.lng),
        start        
    ],
     routeWhileDragging: true,
    createMarker: function(i, start, n){
        return L.marker(start.latLng, {
            draggable: true,
            bouinceOnAdd: false,
            bounceOnAddOPtions: {
                duration: 1000,
                height: 800
            },
            icon: myIcon
        });
    }
  }) // end on click event

  .on('routesfound', function(e) {
        var routes = e.routes;
        // alert('Found ' + routes.length + ' route(s).')
        console.log(routes)
        
        e.routes[0].coordinates.forEach(function(coord, index){
            setTimeout(function(){
                markerStart.setLatLng([coord.lat, coord.lng])
            }, 600*index)
        })
        
  }) // end on routesfound event
  .addTo(myMap);
});

