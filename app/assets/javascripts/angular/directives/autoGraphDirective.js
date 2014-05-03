AngularApp.directive('autoGraph', function ( /* dependencies */ ) {
  // define constants and helpers used for the directive
  // ...
  return {
    restrict: 'E', 
    scope: { 
      miles: '=',
      value: "="
    },
    link: function (scope, element, attrs) {

      var vis = d3.select( element[0] )
        .append("svg")
        .attr("width", "100%")
        .attr("height", 400);

      scope.$watch('miles', function (miles, oldVal) {
        if (!miles) { return; }

        scope.$watch('value', function (value, oldVal) {
          vis.selectAll('*').remove();

          if (!value) { return; }

          var centerVal = Math.round( parseInt(miles) / 1000 ) * 1000;

          var h = 400;
          var w = $( element[0] ).width();
          var ticks = [];
          var data  = [];
          var flags = [];

          for( var i = centerVal - 14000; i < centerVal + 14000; i += 1000 ){
            if( i >= centerVal-10000 && i <= centerVal+10000){
              ticks.push( i );
              flags.push( i % 10000 == 0 );
            }else{
              ticks.push( i );
              flags.push( false );
            }
            data.push( value );
          }

          var half = Math.round(data.length / 2);
          for( var i = half; i < data.length; i++ ){
            if( flags[i] ){
              data[ i ] = data[i-1] - 250;
            }else{
              data[ i ] = data[i-1] - Math.round(Math.random()*100)
            }
          }
          for( var i = half-1; i >= 0; i-- ){
            if( flags[i] ){
              data[ i-1 ] = data[i] + 250;
            }else{
              data[ i-1 ] = data[i] + Math.round(Math.random()*100)
            }
          }


          var x = d3.scale.linear().domain([Math.min.apply( Math, ticks ), Math.max.apply( Math, ticks )]).range([40, w-40]);
          var y = d3.scale.linear().domain([Math.min.apply( Math, data ), Math.max.apply( Math, data )]).range([h-80, 80]);


          var line = d3.svg.line()
            .x(function(d,i) { return x(ticks[i]); })
            .y(function(d) { return y(d); })

          var area = d3.svg.area()
            .x(function(d, i) { return x(ticks[i]); })
            .y0(h)
            .y1(function(d) { return y(d); });

          vis.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);

          vis.selectAll("line.horizontalGrid").data(x.ticks(ticks.count)).enter()
            .append("line")
            .attr(
            {
                "class":  "verticalGrid",
                "y1" :    0,
                "y2" :    h,
                "x1" :    function(d){ return x(d);},
                "x2" :    function(d){ return x(d);},
                "fill" :  "none",
                "shape-rendering" : "crispEdges",
                "stroke": "#cccccc",
                "stroke-width" : "2px"
            });

          var xAxis = d3.svg.axis().scale(x).tickSize(0).tickSubdivide(false).tickFormat(function(d){ 
            if( d >= centerVal-10000 && d < centerVal+10000 ){
              return Math.round(d/1000) + "k Miles"; 
            }else
              return "";
          });

          vis.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + 40+ ")")
            .call(xAxis);



          vis.append("svg:path").attr("d", line(data)).attr("class", "plotline");

          for( var i in flags ){
            if( flags[i] ){
              vis.append("circle")
                .attr("cx", x(ticks[i-1]))
                .attr("cy", y(data[i-1]))
                .attr("r", 15)
                .attr("class", "circle").
                .attr("sell-title", Math.round( ticks[i-1]/1000 )+"k Miles" ));
            }
          }





        });
      });
    }
  };
});