// line chart for killings per month

const height = 600,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

d3.csv("chart1_data.csv").then(data => {
    let timeParse = d3.timeParse("%m");
    // let formatDate = d3.timeFormat("%m")

    // make month d3 time date and counts numerical
    for (let d of data) {
        d.count = +d.count
        d.Month = timeParse(d.month); // create new var Month (from Date)
    };

    let svg = d3.select("#hw1_chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // resize element in browser

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month)) // extent gives min & max, returns as array
        .range([margin.left, width - margin.right]);
    
    // linear b/c num (y) is numerical 
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)]).nice() // nice rounds the top num on y axis
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) // transform translate to put axis in right place
        .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(d3.timeFormat("%b"))); // tick size outer removes weird hanging tick @ end of axis; use month abbr
      
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y).tickSizeOuter(0).tickSize(-width));
  
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height)
        .attr("dx", "0.5em")
        .attr("dy", "-0.25em") 
        .text("Month");
      
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.top/2)
        .attr("dx", "-0.5em")
        .attr("y", 10)
        .attr("transform", "rotate(-90)")
        .text("# Police Shootings");
  
      // put line on page!
    let line = d3.line()
          .x(d => x(d.Month))
          .y(d => y(d.count))
          .curve(d3.curveNatural);  // curve the line
  
    svg.append('path')
          .datum(data)
          .attr("d", line)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')

});