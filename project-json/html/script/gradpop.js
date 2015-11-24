d3.json("plots/plot2.json",function(error,dat){

          data=dat.grad_pop;
          var n = data.length, // number of samples
              m = 2; // number of elements in a group


          var margin = {top: 20, right: 30, bottom: 200, left: 80},
          width = 1200 - margin.left - margin.right,
          height = 800 - margin.top - margin.bottom;

          var max_n1 = 0;
          for (var d in data) {
           max_n1 = Math.max(data[d].male, max_n1);
          }
          var max_n2 = 0;
          for (var d in data) {
           max_n2 = Math.max(data[d].female, max_n2);
         }

         var max_n=0;
         if(max_n1>max_n2)
            max_n=max_n1;
         else {
             max_n=max_n2;
         }



      var y = d3.scale.linear()
                .domain([0, max_n])
                .range([height,0]);

      var x0 = d3.scale.ordinal()
                      .domain(data.map(function(d) { return d.state; }))
                      .rangeBands([0, width], .1);


      var svg = d3.select("body").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("svg:g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xAxis = d3.svg.axis()
                    .scale(x0)
                    .orient("bottom");

      var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .tickFormat(function(d) { return d/100000 + "Lakh";} );

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
                  .selectAll("text")
                  .attr("transform","rotate(-90)")
                  .attr("dx","-1em")
                  .attr("dy","-0.5em")
                  .style("text-anchor","end")
                  .attr("transform", "rotate(-60)" );

          svg.selectAll("bar")
              .data(data)
              .enter()
                  .append("rect")
                  .attr("class", "bar")
                  .transition()
                  .delay(function(d, i) { return i * 30; })
                  .duration(100)
                  .attr("x", function(d) { return x0(d.state); })
                  .attr("width", x0.rangeBand()/2)
                  .attr("y", function(d) { return y(d.male); })
                  .attr("height", function(d) { return height - y(d.male); });

          svg.selectAll("bar")
               .data(data)
               .enter()
                   .append("rect")
                   .transition()
           			   .delay(function(d, i) { return (i * 30)+1000; })
           			   .duration(100)
                   .attr("class", "bar")
                   .attr("fill","red")
                   .attr("x", function(d) { return x0(d.state)+x0.rangeBand()/2; })
                   .attr("width", x0.rangeBand()/2)
                   .attr("y", function(d) { return y(d.female); })
                   .attr("height", function(d) { return height - y(d.female); })
                   .on("mouseover", function(d) {
                              div.transition()
                                  .duration(200)
                                  .style("opacity", .9)
                    })
                    .on("mouseout", function(d) {
                            div.transition()
                                .duration(500)
                                .style("opacity", 0);
                    });


           var z = d3.scale.linear().range(["black","red"]);
           var temp = [{"label":"Male population"},
                      {"label":"Female population"}
                      ];

           var legend = svg.append("g")
                             .attr("class", "legend")
                             .attr("height",300)
                             .attr("width",100)
                             .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


              legend.selectAll("rect")
                     .data(temp)
                     .enter()
                     .append("rect")
                    .attr("x",   width-140)
                    .attr("y", function(d,i){return  i*30;})
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", function(d,i){ return z(i); });


                legend.selectAll("text")
                    .data(temp)
                    .enter()
                    .append("text")
                    .attr("x", width )
                    .attr("y", function(d,i){return 5+i*30;})
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function(d,i) { return d.label; });

})
