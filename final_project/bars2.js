Promise.all([
    d3.csv("data/bar2_1.csv"),
    d3.csv("data/bar2_2.csv"),
    d3.csv("data/bar2_3.csv"),
    d3.csv("data/bar2_4.csv"),
    d3.csv("data/bar2_5.csv"),
    d3.csv("data/bar2_6.csv"),
    d3.csv("data/bar2_7.csv"),
    d3.csv("data/bar2_8.csv"),
    d3.csv("data/bar2_9.csv")
  ]).then(([data1, data2, data3, data4,data5,data6,data7,data8,data9]) => {
    createChart2(data1, "I didn't like any of the candidates");
    createChart2(data2, "Because of where I live, my vote doens't matter");
    createChart2(data3, "No matter who wins, nothing will change for people like me");
    createChart2(data4, "Our system is too broken to be fixed by voting");
    createChart2(data5, "I wanted to vote, but something came up");
    createChart2(data6, "I'm not sure if I can vote");
    createChart2(data7, "Nobody talks about the issues that are important to me");
    createChart2(data8, "All the candidates are the same to me");
    createChart2(data9, "I don't believe in voting");
  });
  
  function createChart2(alldata, title) {
    const chart_container = d3.select("#bars2")
      .append("div")
    
    chart_container.append("span").text(title)

    const margin = {top: 70, right: 30, bottom: 20, left: 50},
      width = 450 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      
    const svg = chart_container
      .append("svg")
      .attr("viewBox", [0, 5, width, height])
      .append("g");
  
    // color palette = one color per subgroup
    // const color = d3.scaleOrdinal()
    // .domain(subgroups)
    // .range(["#2b8cbe","#a6bddb"])
    // var color = d3.scale.ordinal().range(["#2b8cbe","#a6bddb"]);
    
    // Add X axis
    const x = d3.scaleBand()
        .domain(alldata.map(d => d.voter))
        .range([margin.left, width])
        .padding(0.2);
  
    svg.append("g")
      .attr("transform", `translate(0, ${height-(margin.bottom)})`) // template literal
      .attr("class", "x-axis")
      .call(d3.axisBottom(x).tickSize(0));
  
    // Add Y axis
    const y = d3.scaleLinear()
      // .domain([0, d3.max(alldata, d => d.perc_agree)])
      .domain([0, 90])
      .range([height-margin.bottom, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) // template literal
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));
    // y axis text
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("% of respondants ");
  
  

      /* create bar element */ 
    let bar = svg.selectAll(".bar")
        .append("g") 
        .data(alldata)
        .join("g")
        .attr("class","bar");

/* add bar element to svg */
// how to make bars skinnier and have title show?
    bar.append("rect")
        .attr("fill", function(d){
          if (d.voter == "sometimes"){
            return "#a6bddb";
          }
            return "#ece7f2";
        })
        .attr("x", d => x(d.voter)) 
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.perc_agree))
        .attr("height", d => y(0) - y(d.perc_agree)); 

    // tooltip
    // const tooltip = d3.select("body").append("div") // going into html and selecting body tag and append new div
    //   .attr("class", "svg-tooltip")
    //   .style("position", "absolute")
    //   .style("visibility", "hidden");
    // d3.selectAll("rect") 
    //   // when mouseover happens, create this function
    //   .on("mouseover", function(event, d) {
    //     tooltip
    //       .style("visibility", "visible")
    //       .html(`percentage: ${d.perc_agree}<br />`);
    //   })
    //   // when mose moves, event takes place; 
    //   .on("mousemove", function(event) {
    //     tooltip
    //       .style("top", (event.pageY - 10) + "px")
    //       .style("left", (event.pageX + 10) + "px");
    //   })
    //   // when mouse goes off screen: turn off tooltip
    //   .on("mouseout", function() {
    //     d3.select(this).attr("fill", function(d){
    //       if (d.voter == "sometimes"){
    //         return "#a6bddb";
    //       }
    //         return "#ece7f2";
    //     });
    //     tooltip.style("visibility", "hidden");
    //   })   
  }


