d3.csv('viz_2.csv').then(data => {
    const height = 600,
      width = 600,
      // inner radius of 0 creates pie chart
      innerRadius = 100,
      outerRadius = 175,
      labelRadius = 200;
  
    // takes our data and buckets it 
    // d3.arc uses inner and outer radius
    const arcs = d3.pie().value(d => d.count)(data);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
  
    const svg = d3.select("#hw2_chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    
    svg.append("g")
    // next 3 lines makes the white separators between arcs
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d, i) => d3.schemeCategory10[i])
      .attr("d", arc);
  
    svg.append("g")
      .attr("font-size", 15)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan")
      .data(d => {
        return [d.data.Race, d.data.perc];
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i) => `${i * 1.1}em`)
      .attr("font-weight", (d, i) => i ? null : "bold")
      .text(d => d);
    
    // inside of pie text
    svg.append("text")
    //   .attr("font-size", 15)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text("2015 Police Shootings")
      .style("font-size", 15);
      
  });
