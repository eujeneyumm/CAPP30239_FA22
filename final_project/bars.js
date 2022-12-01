Promise.all([
  d3.csv("data/viz1.csv"),
  d3.csv("data/viz2.csv"),
  d3.csv("data/viz3.csv"),
  d3.csv("data/viz4.csv")
]).then(([data1, data2, data3, data4]) => {
  createChart(data1, "Race");
  createChart(data2, "Gender");
  createChart(data3, "Income Level");
  createChart(data4, "Education Level");
});

function createChart(alldata, title) {
  const margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 850 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
  const svg = d3.select("#bars")
    .append("svg")
    .attr("viewBox", [0, 5, width, height])
    .append("g");

  const subgroups = ['always', 'sporadic', 'rarely/never']
  // console.log(subgroups)
  const groups = alldata.map(d => d.dem)
  console.log(groups)

  // Add X axis
  const x = d3.scaleBand()
      .domain(groups)
      .range([margin.left, width])
      .padding([0.2])

  svg.append("g")
    .attr("transform", `translate(0, ${height-(margin.bottom)})`) // template literal
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 60])
    .range([height-margin.bottom, margin.top]);
  
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) // template literal
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position
  const xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#2b8cbe","#a6bddb","#ece7f2"])
     
    


  // y axis text
  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("x", -margin.top/2)
    .attr("dx", "-0.5em")
    .attr("y", 10)
    .attr("transform", "rotate(-90)")
    .text("% of respondants ");
    
    /* add text element - Title */
    /* how to make this font bigger?*/
    svg.append("text")
      .text(title)  
      .attr("transform", "translate(240,0)")
      .attr("x", 50)
      .attr("y", 20)
      // .attr("class", "titletext")
      .attr("font-size", "24px");
      

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(alldata)
    .join("g")
      .attr("transform", d => `translate(${x(d.dem)}, 0)`)
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - margin.top - margin.bottom - y(d.value))
      .attr("fill", d => color(d.key));
    
  // tooltip
  const tooltip = d3.select("body").append("div") // going into html and selecting body tag and append new div
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");
  d3.selectAll("rect") 
  // when mouseover happens, create this function
    .on("mouseover", function(event, d) {
      tooltip
        .style("visibility", "visible")
        .html(`percentage: ${d.value}<br />`);
    })
    // when mose moves, event takes place; 
    .on("mousemove", function(event) {
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    // when mouse goes off screen: turn off tooltip
    .on("mouseout", function() {
      d3.select(this).attr("fill", d => color(d.key));
      tooltip.style("visibility", "hidden");
    })   

  // Handmade legend
    svg.append("circle").attr("cx",600).attr("cy",15).attr("r", 6).style("fill", "#2b8cbe").style("stroke", "black")

    svg.append("circle").attr("cx",600).attr("cy",42).attr("r", 6).style("fill", "#a6bddb").style("stroke", "black")

    svg.append("circle").attr("cx",600).attr("cy",70).attr("r", 6).style("fill", "#ece7f2").style("stroke", "black")

    svg.append("text").attr("x", 620).attr("y", 15).text("always").style("font-size", "15px").attr("alignment-baseline","middle")

    svg.append("text").attr("x", 620).attr("y", 42).text("sporadic").style("font-size", "15px").attr("alignment-baseline","middle")

    svg.append("text").attr("x", 620).attr("y", 70).text("never").style("font-size", "15px").attr("alignment-baseline","middle") 
} 




////// testing things out above //////////

// append the svg object to the body of the page
// const svg = d3.select("race")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",`translate(${margin.left},${margin.top})`);

// // Parse the Data
// d3.csv('viz1.csv').then( function(data) {

//   // List of subgroups = header of the csv files = soil condition here
//   const subgroups = ['always', 'sporadic', 'rarely/never']
//   console.log(subgroups)
//   // List of groups = species here = value of the first column called group -> I show them on the X axis
//   const groups = data.map(d => d.race)

//   console.log(groups)

//   // Add X axis
//   const x = d3.scaleBand()
//       .domain(groups)
//       .range([0, width])
//       .padding([0.2])
//   svg.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(d3.axisBottom(x).tickSize(0));

//   // Add Y axis
//   const y = d3.scaleLinear()
//     .domain([0, 100])
//     .range([ height, 0 ]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Another scale for subgroup position?
//   const xSubgroup = d3.scaleBand()
//     .domain(subgroups)
//     .range([0, x.bandwidth()])
//     .padding([0.05])

//   // color palette = one color per subgroup
//   const color = d3.scaleOrdinal()
//     .domain(subgroups)
//     .range(['#69b3a2','#404080','#4daf4a'])

//   // Show the bars
//   svg.append("g")
//     .selectAll("g")
//     // Enter in data = loop group per group
//     .data(data)
//     .join("g")
//       .attr("transform", d => `translate(${x(d.race)}, 0)`)
//     .selectAll("rect")
//     .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
//     .join("rect")
//       .attr("x", d => xSubgroup(d.key))
//       .attr("y", d => y(d.value))
//       .attr("width", xSubgroup.bandwidth())
//       .attr("height", d => height - y(d.value))
//       .attr("fill", d => color(d.key));
    
//   // Handmade legend
//   svg.append("circle").attr("cx",200).attr("cy",60).attr("r", 6).style("fill", "#69b3a2")

//   svg.append("circle").attr("cx",200).attr("cy",90).attr("r", 6).style("fill", "#404080")

//   svg.append("circle").attr("cx",200).attr("cy",120).attr("r", 6).style("fill", "#4daf4a")

//   svg.append("text").attr("x", 220).attr("y", 60).text("always").style("font-size", "15px").attr("alignment-baseline","middle")

//   svg.append("text").attr("x", 220).attr("y", 90).text("sporadic").style("font-size", "15px").attr("alignment-baseline","middle")

//   svg.append("text").attr("x", 220).attr("y", 120).text("never").style("font-size", "15px").attr("alignment-baseline","middle")


// });