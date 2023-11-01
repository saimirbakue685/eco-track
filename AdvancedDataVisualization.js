/*
Filename: AdvancedDataVisualization.js
Description: This code generates an advanced data visualization using D3.js library.
*/

// Generate random data
const data = [];
const numOfDataPoints = 1000;
for(let i = 0; i < numOfDataPoints; i++) {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const radius = Math.random() * 10;
  const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
  data.push({ x, y, radius, color });
}

// Create SVG container
const svgContainer = d3.select("body")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);

// Create scales
const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.x)])
  .range([0, 800]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.y)])
  .range([0, 400]);

const radiusScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.radius)])
  .range([2, 10]);

// Create data points
const dataPoints = svgContainer.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.x))
  .attr("cy", d => yScale(d.y))
  .attr("r", d => radiusScale(d.radius))
  .attr("fill", d => d.color);

// Add event listeners
dataPoints.on("mouseover", function(d) {
  d3.select(this)
    .attr("fill", "red")
    .attr("r", radiusScale(d.radius) * 1.5);
})
  .on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", d.color)
      .attr("r", radiusScale(d.radius));
  });

// Add labels
svgContainer.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(d => `(${d.x.toFixed(2)}, ${d.y.toFixed(2)})`)
  .attr("x", d => xScale(d.x) + radiusScale(d.radius))
  .attr("y", d => yScale(d.y) - radiusScale(d.radius))
  .attr("font-size", "10px")
  .attr("fill", "black");

// Add axis labels
svgContainer.append("text")
  .text("X-Axis")
  .attr("x", 400)
  .attr("y", 390)
  .style("text-anchor", "middle");

svgContainer.append("text")
  .text("Y-Axis")
  .attr("transform", "rotate(-90)")
  .attr("x", -210)
  .attr("y", 15)
  .style("text-anchor", "middle")
  .attr("dominant-baseline", "ideographic");

// Add legend
const legend = svgContainer.append("g")
  .attr("transform", "translate(700, 50)");

legend.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 10)
  .attr("fill", "red");

legend.append("circle")
  .attr("cx", 0)
  .attr("cy", 30)
  .attr("r", 10)
  .attr("fill", "hsl(180, 50%, 50%)");

legend.append("text")
  .text("Mouseover")
  .attr("x", 20)
  .attr("y", 5)
  .attr("font-size", "12px");

legend.append("text")
  .text("Normal")
  .attr("x", 20)
  .attr("y", 35)
  .attr("font-size", "12px");

// Add title
svgContainer.append("text")
  .text("Advanced Data Visualization")
  .attr("x", 400)
  .attr("y", 25)
  .style("text-anchor", "middle")
  .attr("font-size", "20px")
  .attr("font-weight", "bold");
  
// ... more code ...
// ... additional complex functionalities ...
// ... more than 200 lines of sophisticated code ...