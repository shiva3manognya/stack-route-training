// set the dimensions of the svg
var margin = {top: 50, right: 20, bottom: 320, left: 150},
    width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var z=d3.scale.category10();
// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10)
		.tickFormat(function(d) { return d/1000000 + "M";} );

		var div = d3.select("body").append("div")
								.attr("class", "tooltip")
								.style("opacity", 0);


// add the SVG element
var svg = d3.select("body").append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
							  .append("g")
							  .attr("transform","translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("plots/plot3.json", function(error, dat) {

		  data=dat.edudist;

		  // scale the range of the data
		  x.domain(data.map(function(d) { return d.category; }));
		  y.domain([0, d3.max(data, function(d) { return d.india_total; })]);

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
      																	return d.india_total;
      							})
                    .style("left", x(d.category)+180 + "px")
                    .style("top", y(d.india_total)+20 + "px");
                  })
      			      .on("mouseout", function(d) {
      			          div.transition()
      			              .duration(100)
      			              .style("opacity", 0);
      			      })
      						.transition()
        							.delay(function(d, i) { return i * 100; })
        							.duration(200)
      						.attr("fill", function(d,i){  return z(i);})
      			      .attr("x", function(d) {  return x(d.category); })
      			      .attr("width", x.rangeBand())
      			      .attr("y", function(d) { return y(d.india_total); })
      			      .attr("height", function(d) { return height - y(d.india_total)});


}); //close fn
