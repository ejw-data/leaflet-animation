// Data
data = [{lat: 41.88844, lng: -87.62885},
{lat: 41.88843, lng: -87.62941},
{lat: 41.88843, lng: -87.62944},
{lat: 41.88843, lng: -87.62956},
{lat: 41.88843, lng: -87.62956},
{lat: 41.8886, lng: -87.62956},
{lat: 41.88887, lng: -87.62957},
{lat: 41.88923, lng: -87.62958},
{lat: 41.88923, lng: -87.62958},
{lat: 41.88921, lng: -87.63107},
{lat: 41.88921, lng: -87.63128},
{lat: 41.8892, lng: -87.63177},
{lat: 41.8892, lng: -87.63194},
{lat: 41.8892, lng: -87.63213},
{lat: 41.88919, lng: -87.6322},
{lat: 41.88919, lng: -87.63224},
{lat: 41.88919, lng: -87.63232},
{lat: 41.88919, lng: -87.63242},
{lat: 41.88918, lng: -87.63252},
{lat: 41.88918, lng: -87.63252},
{lat: 41.8891, lng: -87.63252},
{lat: 41.88909, lng: -87.63252},
{lat: 41.88909, lng: -87.63252}];

// Creating map object
var myMap2 = L.map("map2", {
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
}).addTo(myMap2);

var myIcon = L.icon({
    iconUrl: './static/icon/run-icon.png',
    iconSize: [30, 30],
    iconAnchor: [0, 10],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var start = L.latLng(data[0].lat, data[0].lng);
var end = L.latLng(41.88909, -87.63252);
// var goal = L.latLng(41.89, -87.61)
  
var markerStart2 = L.marker(start,{
    icon: myIcon,
    title:"Start Point", 
    draggable:true
}).addTo(myMap2);

markerStart2.on(
    'click', onClick
);

function onClick(e){
    console.log(e.latlng)
}

myMap2.on('click', function(e){

    var newMarker2 = L.marker([41.88909, -87.63252],{
        icon:myIcon,
        title: "End Point",
        draggable:true
    }).addTo(myMap2);

    var control = L.Routing.control({
    waypoints: [
        start,
        end,      
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

  .addTo(myMap2);
  control.hide()


});

