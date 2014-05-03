AngularApp.directive('autoGraph', ["$window", function($window) {
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
        .attr("height", 500)
        .attr("background-color", "rgb(246, 95, 88)");

      
      var ticks       = [];
      var data        = [];
      var flags       = [];
      var tick_count  = 0;

      scope.$watch('miles', function (miles, oldVal) {
        if (!miles) { return; }

        scope.$watch('value', function (value, oldVal) {
          vis.selectAll('*').remove();
          $(element[0]).find(".tooltip").remove();

          if (!value) { return; }

          drawTheGraph( miles, value );

        });
      });

      angular.element($window).bind('resize', function () {
        var miles = parseInt( $(element[0]).attr("miles") );
        var value = parseInt( $(element[0]).attr("value") );
        vis.selectAll('*').remove();
        $(element[0]).find(".tooltip, .selltip").remove();
        drawTheGraph(miles, value);
        scope.$apply();

      });

      function drawTheGraph(miles, value){
        var centerVal   = Math.round( parseInt(miles) / 1000 ) * 1000;
        var h           = 500;
        var w           = $( element[0] ).width();

        var graphRange  = 9000;
        var breakpoint_width = 1000;

        if( data.length == 0){
          for( var i = centerVal - 14000; i < centerVal + 14000; i += 1000 ){
            if( i >= centerVal-graphRange && i <= centerVal+graphRange){
              ticks.push( i );
              flags.push( i % 10000 == 0 );
              tick_count += 1;
            }else{
              ticks.push( i );
              flags.push( false );
            }
            data.push( value );
          }
          tick_count = Math.round( tick_count/2 ) * 2;

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
        }

        if( w <= breakpoint_width && tick_count > 10 ) tick_count = tick_count / 4;
        if( w > breakpoint_width && tick_count < 10 ) tick_count = tick_count * 4;

        var x = d3.scale.linear().domain([Math.min.apply( Math, ticks ), Math.max.apply( Math, ticks )]).range([0, w]);
        var y = d3.scale.linear().domain([Math.min.apply( Math, data ), Math.max.apply( Math, data )]).range([h-80, 180]);

        var line = d3.svg.line()
          .x(function(d,i) { return x(ticks[i]); })
          .y(function(d) { return y(d); })

        var area = d3.svg.area()
          .x(function(d, i) { return x(ticks[i]); })
          .y0(h)
          .y1(function(d) { return y(d); });


        
        var xAxis = d3.svg.axis().ticks(tick_count).scale(x).tickSize(0).tickFormat(function(d){ 
          if( d >= centerVal-graphRange && d < centerVal+graphRange ){
            return Math.round( d/1000 ) + "k " + ((w <= breakpoint_width) ? "Mi." : "Miles"); 
          }else
            return "";
        });

        vis.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + 140+ ")")
          .call(xAxis);


        var l = vis.append("svg:path").datum(data).attr("class", "area").attr("d", area);
        vis.selectAll("line.horizontalGrid").data( x.ticks(tick_count) ).enter()
          .append("line")
          .attr({
            "class":  "verticalGrid",
            "y1" :    0,
            "y2" :    h,
            "x1" :    function(d){ return x(d);},
            "x2" :    function(d){ return x(d);},
            "shape-rendering" : "crispEdges"
        });
        var a = vis.append("svg:path").attr("d", line(data)).attr("class", "plotline");

        for( var i in flags ){
          if( flags[i] ){
            vis.append("circle")
              .attr("cx", x(ticks[i-1]))
              .attr("cy", y(data[i-1]))
              .attr("r", 10)
              .attr("class", "circle")
              .attr("sell-title", Math.round( ticks[i-1]/1000 )+"k Miles" )
              .attr("sell-price", data[i-1]);
            if( w <= breakpoint_width ) break;
          }
        }

        $(element[0]).prepend("<h1>Car Value vs Milage</h1>");

        $(".circle").each(function(){
          var event_div = $("<div class='tooltip'><div>"+$(this).attr("sell-title")+"</div>Ideal time to sell</div>");
          var sell_div  = $("<div class='selltip'>Similar car sold at $" + numberWithCommas(parseInt($(this).attr("sell-price")) + Math.round(Math.random()*100) ) +"</div>");
          var coords    = $(this).offset();

          $(element[0]).append(event_div).append(sell_div);

          event_div.css("top", coords.top + 40).css("left", coords.left - (event_div.width()/2 - 10));
          sell_div.css("top", coords.top - 15 ).css("left", coords.left + 40);
          console.log( event_div.outerWidth() )
        });
      }


    }
  };
}]);