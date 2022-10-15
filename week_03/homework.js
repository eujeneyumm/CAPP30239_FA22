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
    /* this connects us to homework.html's div tag */
    let svg = d3.select("#bar_chart") 
        .append("svg")
        .attr("viewBox",[0, 0, width, height]);

    /* setting up x axis: library branches */
    let x = d3.scaleBand()
        .domain(data.map(d => d.branch)) 
        .range([margin.left, width - margin.right]) 
        .padding(0.2);

    /* setting up y axis: number of visits */
    let y = d3.scaleLinear()
        /* domain ranges from 0 to max number of visits */
        .domain([0, d3.max(data, d => d.num)])
        .range([height-margin.bottom, margin.top])
        ;

    /* append the x axis */
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));

    
    /* append the y axis */
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));
    
    /* add text element - Title */
    svg.append("text")
        .attr("transform", "translate(240,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Library Branch Visits")

    /* add text element - y axis */
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 10)
        .attr("dy", ".80em")
        .attr("transform", "rotate(-90)")
        .text("# of visits");

     /* add text element - x axis */
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width-30)
        .attr("y", height + margin.top)
        .text("Library Branches");
    
    /* create bar element */ 
    let bar = svg.selectAll(".bar")
        .append("g") 
        .data(data)
        .join("g")
        .attr("class","bar");

    /* add bar element to svg */
    bar.append("rect")
        .attr("fill", "cornflowerblue")
        .attr("x", d => x(d.branch)) 
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.num))
        .attr("height", d => y(0) - y(d.num));  
})