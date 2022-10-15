/* Bar Chart for COVID country cases */

d3.csv("covid.csv").then(data => {
    // console.log(data);
    for (let d of data) {
        d.cases = +d.cases; // the + sign converts to number
    };

    const height = 600, 
          width = 800,
          margin = ({top: 25, right: 30, bottom: 35, left: 50}); // this is an object hence the ().


    // now we have our data. we now make svg.
    let svg = d3.select("#chart") // pairs to index.html dv id = chart
        .append("svg")
        .attr("viewBox",[0, 0, width, height]) // viewbox:
        ;
    // x axis is all country 
    let x = d3.scaleBand()
    // just for bar charts
    // scales take two parameters:
    // 1. domain: min and max in our dataset 
    // 2. range: pixel space we want plot to take up
        .domain(data.map(d => d.country)) 
        .range([margin.left, width - margin.right]) // start building where margin starts, not where the svd starts
        .padding(0,1) // how far apart you want bar to be
        ;

    // y axis is cases per 100,000
    let y = d3.scaleLinear()
        // domain ranges from 0 to max value of cases
        .domain([0, d3.max(data, d => d.cases)])
        .range([height-margin.bottom, margin.top])
        ;
    
    /* Update: simplfied axes */
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));
    
        
    let bar = svg.selectAll(".bar")
        .append("g") // append group 
        .data(data)
        .join("g")
        .attr("class","bar");

    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country)) // building suing the x scale we created 
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.cases))
        .attr("height", d => y(0) - y(d.cases));
})
