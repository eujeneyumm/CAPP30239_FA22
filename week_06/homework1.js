// line chart for killings per month

const height = 600,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

d3.json("a3cleanedonly2015.json").then(data => {
    let timeParse = d3.timeParse("%x");
    let formatDate = d3.timeFormat("%m")

    console.log(data)
    for (let d of data) {
        d.Date = timeParse(d.Date); // create new var Month (from Date)
        d.Month = formatDate(d.Date)
    };

    // Aggregate (count) number of shootings per month
    var month_cnt = d3.rollup(data, g => g.length, d => d.Month);
    var agg = Array.from(month_cnt, ([month, count]) => ({ month, count }));

    let svg = d3.select("#hw1_chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // resize element in browser

    // scaleBand for bar chart categories
    let x = d3.scaleBand()
        .domain(data.map(d => d.Month).sort()) // need to sort months
        .range([margin.left, width - margin.right]) // pixels on page
        .padding(0.1);
    
    // linear b/c num (y) is numerical 
    let y = d3.scaleLinear()
        .domain([0, d3.max(agg, d => d.count)]).nice() // nice rounds the top num on y axis
        .range([height - margin.bottom, margin.top]);
    
    /* Update: simplfied axes */
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));
    
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height)
        .attr("dx", "0.5em")
        .attr("dy", "-0.05em") 
        .text("Month");
      
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.top/2)
        .attr("dx", "-0.5em")
        .attr("y", 10)
        .attr("transform", "rotate(-90)")
        .text("# Police Shootings");

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(agg)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "steelblue")
        .attr("x", d => x(d.month)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.count)) // y position attribute
        .attr("height", d => y(0) - y(d.count)); // this height is the height attr on element
    
    bar.append('text') // add labels to bars
        .text(d => d.count)
        .attr('x', d => x(d.month) + (x.bandwidth()/2))
        .attr('y', d => y(d.count) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white');

});