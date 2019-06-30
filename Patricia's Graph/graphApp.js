

// Define SVG area dimensions
var margin = {top: 30, right:30, bottom:70, left:60},
width = 460 - margin.left - margin.right ,
height = 460 - margin.top - margin.bottom;

//  // append the svg object to the body of the page
//  var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");


//   // Initialize the X axis
var x = d3.scaleBand()
.range([0, width])
.padding(0.1);

var y = d3.scaleLinear()
  .range([height, 0]);


// var xAxis = svg.append("g")
// .attr("transform", "translate(0," + height + ")")

// // // Initialize the Y axis
// var y = d3.scale.linear()
//   .range([ height, 0]);
// var yAxis = svg.append("g")
//   .attr("class", "myYaxis")


//  var svgWidth = 960;
//  var svgHeight = 660;

// // // Define the chart's margins as an object
// var chartMargin = {
// //   top: 30,
// //   right: 30,
// //   bottom: 30,
// //   left: 30
// // };

// // // Define dimensions of the chart area
// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", height + margin.top + margin.bottom)
  .attr("width",  margin.left + margin.right)
  .append("g")
  .attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");

 

// //  Load data from csv
// d3.csv("Graph_data.csv")
// .get(function(error, data) {
//   console.log(data);
// });

//get the data

d3.csv("Graph_data1.csv", function(error, data) {
  // Log an error if one exists
  if (error) return console.warn(error);
  // Print the tvData
  console.log(data);


//  d3.csv("Graph_data.csv", function(error, data) {
//   if (error) throw error;

  //format the data
  data.forEach(function(d){
    d.critical_flag_num= +d.critical_flag_num;})
 

// Scale the range of the data in the domains
x.domain(data.map(function(d) { return d.critical_flag_num; }));
y.domain([0, d3.max(data, function(d) { return d.critical_flag_num; })]);

// append the rectangles for the bar chart
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.critical_flag_num); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.critical_flag_num); })
      .attr("height", function(d) {return height - y(d.critical_flag_num)})

// add the x Axis
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
.call(d3.axisLeft(y));

});



