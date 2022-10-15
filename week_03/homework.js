d3.csv("hw_data.csv").then(data=> {

    for (let d of data) {
        /* the + sign converts col type to number */
        d.num = +d.num; 
    };

    /* declare constant variables */
    const height = 500, 
          width = 700,
          margin = ({top: 25, right: 30, bottom: 35, left: 50}); 


    /* create SVG */
    let svg = d3.select("#bar_chart") // pairs to index.html dv id = chart
        .append("svg")
        .attr("viewBox",[0, 0, width, height]);

    // x axis: library branches
    let x = d3.scaleBand()
        .domain(data.map(d => d.branch)) 
        /* start building where margin starts, not where the svd starts */
        .range([margin.left, width - margin.right]) 
        /* how far apart you want bar to be */
        .padding(0.2);

    let y = d3.scaleLinear()
        // domain ranges from 0 to max value of cases
        .domain([0, d3.max(data, d => d.num)])
        .range([height-margin.bottom, margin.top])
        ;

    /* manipulate the x axis */
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));

    
    /* manipulate the y axis */
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));
    
    /* add text element */
    svg.append("text")
        .attr("transform", "translate(240,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Library Branch Visits")

    /* add y axis */
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 10)
        .attr("dy", ".80em")
        .attr("transform", "rotate(-90)")
        .text("# of visits");

    /* add x axis */
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width-30)
        .attr("y", height + margin.top)
        .text("Library Branches");
        
    let bar = svg.selectAll(".bar")
        .append("g") // append group 
        .data(data)
        .join("g")
        .attr("class","bar");

    bar.append("rect")
        .attr("fill", "cornflowerblue")
        .attr("x", d => x(d.branch)) // building suing the x scale we created 
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.num))
        .attr("height", d => y(0) - y(d.num));  
})