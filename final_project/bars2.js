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
    createChart2(data9, "I'm not sure if I can vote");
    // createChart(data3, "#c1r2");
  });
  
  function createChart2(alldata, title) {
    console.log("how many times")
    const margin = {top: 10, right: 30, bottom: 20, left: 50},
      width = 850 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      
    const svg = d3.select("#bars2")
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
      .domain([0, d3.max(alldata, d => d.perc_agree)])
      .range([height-margin.bottom, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) // template literal
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));
  
    /* add text element - Title */
    /* how to make this font bigger?*/
    svg.append("text")
      .text(title)  
      .attr("transform", "translate(240,0)")
      .attr("x", 50)
      .attr("y", 20)
      // .attr("class", "titletext")
      .attr("font-size", "24px");


      /* create bar element */ 
    let bar = svg.selectAll(".bar")
        .append("g") 
        .data(alldata)
        .join("g")
        .attr("class","bar");

/* add bar element to svg */
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
  }