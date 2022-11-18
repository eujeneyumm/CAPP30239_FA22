const margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#chart2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv('data/viz2.csv').then( function(data) {

  // List of subgroups = header of the csv files = soil condition here
  const subgroups = ['always', 'sporadic', 'rarely/never']
  console.log(subgroups)
  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = data.map(d => d.dem)

  console.log(groups)

  // Add X axis
  const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position?
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#69b3a2','#404080','#4daf4a'])

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x(d.dem)}, 0)`)
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.key));
    
  // Handmade legend
  svg.append("circle").attr("cx",200).attr("cy",60).attr("r", 6).style("fill", "#69b3a2")

  svg.append("circle").attr("cx",200).attr("cy",90).attr("r", 6).style("fill", "#404080")

  svg.append("circle").attr("cx",200).attr("cy",120).attr("r", 6).style("fill", "#4daf4a")

  svg.append("text").attr("x", 220).attr("y", 60).text("always").style("font-size", "15px").attr("alignment-baseline","middle")

  svg.append("text").attr("x", 220).attr("y", 90).text("sporadic").style("font-size", "15px").attr("alignment-baseline","middle")

  svg.append("text").attr("x", 220).attr("y", 120).text("never").style("font-size", "15px").attr("alignment-baseline","middle")


});