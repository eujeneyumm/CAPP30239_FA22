const w = 860,
h = 400,
m = {top: 40, right: 30, bottom: 20, left: 20};

const svg = d3.select("#hw3_chart")
    .append("svg")
    .attr("viewBox", [0, 0, w, h]);

d3.csv("chart3_data.csv").then( data => {

    let timeParse = d3.timeParse("%m");
    // make month d3 time date and counts numerical
    for (let d of data) {
        d.Female = +d.Female
        d.Male = +d.Male
        d.Other = +d.Other
        d.Month = timeParse(d.month); // create new var Month (from Date)
    };

    console.log(data)

    let x = d3.scaleBand(data.map(d => (d.Month)),[m.left, w - m.right])
    .padding([0.2]);

    let y = d3.scaleLinear([0, 160],[h - m.bottom, m.top]);

    svg.append("g")
    .attr("transform", `translate(0,${h - m.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(d3.timeFormat("%b")))

    svg.append("g")
        .attr("transform", `translate(${m.left},0)`)
        .call(d3.axisLeft(y).tickSize(-w + m.left + m.right))

    // Gender subgroups
    const subgroups = ['Other', 'Female', 'Male'];
    console.log(subgroups)
    const color = d3.scaleOrdinal(subgroups,['#e41a1c','#377eb8','#4daf4a']); // another type of scale

    const stackedData = d3.stack() // formatting data
        .keys(subgroups)(data);
    console.log(stackedData)
    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d) // getting nested data
        .join("rect") // building rectangles
        .attr("x", d => x(d.data.Month))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width",x.bandwidth())

    // Manual legend
    svg.append("circle").attr("cx",10).attr("cy",10).attr("r", 6).style("fill", "#e41a1c")
    svg.append("circle").attr("cx",110).attr("cy",10).attr("r", 6).style("fill", "#377eb8")
    svg.append("circle").attr("cx",205).attr("cy",10).attr("r", 6).style("fill", "#4daf4a")
    svg.append("text").attr("x", 20).attr("y", 10).text("Other").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 130).attr("y", 10).text("Female").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 225).attr("y", 10).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")
});