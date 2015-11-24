// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 110, left: 110},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);
var z=d3.scale.category10();
// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10)
		.tickFormat(function(d) { return d/1000000 + "M";} );


// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("plots/plot1.json", function(error, dat) {

		  data = dat.agedist;

		      // scale the range of the data
		  x.domain(data.map(function(d) { return d.age; }));
		  y.domain([0, d3.max(data, function(d) { return d.pop; })]);

//adding tool tip
	var div = d3.select("body").append("div")
							.attr("class", "tooltip")
							.style("opacity", 0);

			// add axis
		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
				    .selectAll("text")
				      .style("text-anchor", "end")
				      .attr("dx", "-.8em")
				      .attr("dy", "-.55em")
				      .attr("transform", "rotate(-60)" );


			svg.append("text")
			.attr("dx", "55em")
		  .attr("dy", "36em")
			.text("Age Groups ")
			.attr("fill","red");



		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
			    .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 5)
			      .attr("dy", "1em")
			      .style("text-anchor", "end")
			      .text("Population");



		  // Add bar chart
		  svg.selectAll("bar")
		      .data(data)
		    	.enter()
					.append("rect")
		      .attr("class", "bar")
					.on("mouseover", function(d) {
							div.transition()
									.duration(200)
								.style("opacity", .9);
						  div	.html(function(){
							  return d.pop;		})
							.style("left", x(d.age)+120 + "px")
							.style("top", y(d.pop)+10 + "px");
				  })
					.on("mouseout", function(d) {
							div.transition()
									.duration(100)
									.style("opacity", 0);
					})
					.transition()
							.delay(function(d, i) { return i * 100; })
							.duration(150)
		      .attr("x", function(d) { return x(d.age); })
		      .attr("width", x.rangeBand())
		      .attr("y", function(d) { return y(d.pop); })
		      .attr("height", function(d) { return height - y(d.pop); });

});//close for main function
