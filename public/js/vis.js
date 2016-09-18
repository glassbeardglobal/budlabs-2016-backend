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
    maxZoom: 18,
    id: 'jc3m',
    accessToken: 'pk.eyJ1IjoiamMzbSIsImEiOiJjaXQ4Mng3MXgwYTJiMnVwMjh3d3ZjZmdoIn0.Fys8YwWi1BayncMt15ZzsQ'
}).addTo(mymap);

var marker = L.marker([41.8781, -87.6298], {icon: greenBarley }).addTo(mymap);
var totalHarvest = 0, avgYield = 0, totalYield = 0; avgHarvest = 0, maxHarvest = 0, ths = 0, tys = 0;
var numGreen = 0, numRed = 0, numYellow = 0;

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

  avgYield = (~~(avgYield * 10000)) / 100
  $('#avg-yield').html(String(avgYield) + '%');

  var counter = 0;
  var maxCount = 15;
  var time = 800;

  incVal(totalHarvest, 0, '#tot-harvest');
  incVal(maxHarvest, 0, '#max-harvest');
  incVal(avgHarvest, 0, '#avg-harvest');

  function incVal(val, count, selector) {
    $(selector).html(String(~~(count/maxCount*val)) + " Bushels");
    if (count <= maxCount)
      setTimeout(function() {
        incVal(val, count + 1, selector);
      }, time/maxCount);
  }

  genSafetyBars();
  genYieldPie();
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

/*
  ==============================
  D3 SECTION
  ==============================
*/

function genSafetyBars() {
  var margins = { top: 20, bottom: 20, left: 90, right: 55 };
  var width = $(".col-md-6").width() - margins.left - margins.right;
  var height = 300 - margins.top - margins.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.43);
  var y = d3.scaleLinear().rangeRound([height, 0]);

  var barsvg = d3.select('#affect-bars')
    .attr('width', width + margins.left + margins.right)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

  var bar_data = [
    { name: "Safe", value: numGreen },
    { name: "Warning", value: numYellow },
    { name: "Danger", value: numRed }];

  x.domain(bar_data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(bar_data, function(d) { return d.value; })]);

  barsvg.append("g")
    .attr("class", "axis axis--x")
    .attr('transform', "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  barsvg.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Number of Fields");

  barsvg.selectAll(".bar")
  .data(bar_data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); });
}

function genYieldPie() {
  console.log(avgYield)
  var data = [{
    "name": "Yield",
    "value": avgYield
  },{
    "name": "No Yield",
    "value": 100 - avgYield
  }];
  var margins = { top: 20, bottom: 20, left: 90, right: 55 };
  var width = $(".col-md-6").width() - margins.left - margins.right;
  var height = 300 - margins.top - margins.bottom;

  var svg = d3.select('#pie')
    .attr('width', width + margins.left + margins.right)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
    .append('g')
      .attr('transform', 'translate(' + width / 2 + "," + height / 2 + ")");

  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal().range(["#003366", "#0077ff"]);
  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.value })

  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.name) });

  g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.data.name });
}
