const tooltip = d3.select("body")
  .append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([
  d3.csv("data/unemployment2020.csv"),
  d3.json("libs/counties-albers-10m.json")
]).then(([data, us]) => {
  const dataById = {};

  for (let d of data) {
    d.rate = +d.rate;
    //making a lookup table from the array (unemployment data)
    dataById[d.id] = d;
  }
  // give it the mesh (us)
  const counties = topojson.feature(us, us.objects.counties);

  // Quantize evenly breakups domain into range buckets; set up color buckets
  const color = d3.scaleQuantize()
    .domain([0, 10]).nice() // 0-10% unemployment; assign colors to 0-1%, 1-2%, etc.
    .range(d3.schemeBlues[9]);

  const path = d3.geoPath(); // create path <path d = "">. tell d3 i'm about to build path

  d3.select("#legend")
    .node()
    .appendChild(
      Legend( // everything here is running the observable code; the legend function lives in d3-color-legend.js file
        d3.scaleOrdinal( // scale ordinal or scale quantize should both work
          ["1", "2", "3", "4", "5", "6", "7", "8", "9+"], // adding custom numbers to the array
          d3.schemeBlues[9]
        ),
        { title: "Unemployment rate (%)" }
      ));

  svg.append("g") // appending group  
    .selectAll("path") //select all paths
    .data(counties.features) 
    .join("path")
    .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc') // determine fill. If there is data, use the rate to determine color (we declared color as scale earlier.) if there's no data, fill it grey. ? is an if/else statement. 
    .attr("d", path)
    .on("mousemove", function (event, d) {
      let info = dataById[d.id];
      tooltip
        .style("visibility", "visible")
        .html(`${info.county}<br>${info.rate}%`)
        .style("top", (event.pageY - 10) + "px") // positioning of the mouse. 
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc');
    });
});