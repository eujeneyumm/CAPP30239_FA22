let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('penguins.csv').then(data => {
  
  let x = d3.scaleLinear() // setting scale for x axis
    .domain(d3.extent(data, d => d.body_mass_g)).nice()
    .range([margin.left, width - margin.right]); 

  let y = d3.scaleLinear() // setting scale for y axis
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g") // creating x axis
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom))

  svg.append("g") // creating y axis
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right)) // tick size gives grid 

  svg.append("g")
    .attr("fill", "black")
    .selectAll("circle")
    .data(data)
    .join("circle") // join data onto circle
    .attr("cx", d => x(d.body_mass_g))
    .attr("cy", d => y(d.flipper_length_mm))
    .attr("r", 2) // radius of dot 
    .attr("opacity", 0.75);

  const tooltip = d3.select("body").append("div") // going into html and selecting body tag and append new div
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle") 
  // .on: when mouseover circle, create this function
    .on("mouseover", function(event, d) {
      // use d3 to select this, fill it with red 
      d3.select(this).attr("fill", "red");
      tooltip
        .style("visibility", "visible")
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    // when mose moves, event takes place; 
    .on("mousemove", function(event) {
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    // when mouse goes off screen: make selected dot black and turn off tooltip
    .on("mouseout", function() {
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    })
    
});