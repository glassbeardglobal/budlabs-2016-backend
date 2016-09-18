var mymap = L.map('mapid').setView([41.8781, -87.6298], 7);

var greenBarley = L.icon({
  iconUrl: '/img/wheat-grains-2.svg',
  iconSize: [38, 38],
  iconAnchor: [19.5, 37],
  popupAnchor:  [0, -37]
});

var yellowBarley = L.icon({
  iconUrl: '/img/wheat-grains-1.svg',
  iconSize: [38, 38],
  iconAnchor: [19.5, 37]
});

var redBarley = L.icon({
  iconUrl: '/img/wheat-grains.svg',
  iconSize: [38, 38],
  iconAnchor: [19.5, 37]
});

var facility = L.icon({
  iconUrl: '/img/barn.svg',
  iconSize: [38, 38],
  iconAnchor: [19.5, 37]
});

L.tileLayer('https://api.mapbox.com/styles/v1/jc3m/cit82y1oa002p2xo4fb55psq2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamMzbSIsImEiOiJjaXQ4Mng3MXgwYTJiMnVwMjh3d3ZjZmdoIn0.Fys8YwWi1BayncMt15ZzsQ', {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'jc3m',
    accessToken: 'pk.eyJ1IjoiamMzbSIsImEiOiJjaXQ4Mng3MXgwYTJiMnVwMjh3d3ZjZmdoIn0.Fys8YwWi1BayncMt15ZzsQ'
}).addTo(mymap);

var marker = L.marker([41.8781, -87.6298], {icon: greenBarley }).addTo(mymap);
var totalHarvest = 0, avgYield = 0, totalYield = 0; avgHarvest = 0, maxHarvest = 0, ths = 0, tys = 0;
var numGreen, numRed, numYellow;

function sfn(data) {
  var flagged = [];
  var non = [];
  data.forEach(function(d) {
    if (d.yield > 0) {
      totalHarvest += d.yield;
      ths += 1;
    }
    if (d.yield_rate > 0) {
      totalYield += d.yield_rate;
      tys += 1;
    }
    if (d.yield > maxHarvest) {
      maxHarvest = d.yield;
    }
    avgHarvest = totalHarvest / ths;
    avgYield = totalYield / tys;
    if (d.red_flags)
      flagged.push(d);
    else
      non.push(d);
  });
  flagged.forEach(function(d) {
    L.marker([d.location.latitude, d.location.longitude], { icon: redBarley }).addTo(mymap);
    numRed += 1;
  });
  non.forEach(function(d) {
    var f = false;
    flagged.forEach(function(e) {
      if (prox(d,e) < .65)
        f = true;
    });
    if (f) {
      L.marker([d.location.latitude, d.location.longitude], { icon: yellowBarley }).addTo(mymap);
      numYellow += 1;
    }
    else {
      L.marker([d.location.latitude, d.location.longitude], { icon: greenBarley }).addTo(mymap).bindPopup("Green Barley");
      numGreen += 1
    }
  });
}

function prox(l1, l2) {
  var dx = l1.location.latitude - l2.location.latitude;
  var dy = l1.location.longitude - l2.location.longitude;
  return Math.sqrt(dx*dx + dy*dy);
}

function sfnfac(data) {
  data.forEach(function(d) {
    L.marker([d.location.latitude, d.location.longitude], { icon: facility }).addTo(mymap);
  });
}

function errorf(err, opt, e) {
    console.log("Error");
    console.log(err);
    console.log(e);
  }

$.ajax({
  url: '/api/insights/logs',
  crossDomain: true,
  success: sfn,
  error: errorf
});

$.ajax({
  url: '/api/facility',
  success: sfnfac,
  error: errorf
});

/*$.ajax({
  url: 'http://localhost:3000/api/insights/logs',
  dataType: 'jsonp',
  jsonp: true,
  success: function(data) {
    console.log("Success");
    console.log(data);
  },
  error: function(err, opt, e) {
    console.log("Error");
    console.log(err);
    console.log(e);
  }
});*/

/*$.ajax('http://localhost:3000/api/insights/logs').done(function(data) {
  console.log(data);
});*/
