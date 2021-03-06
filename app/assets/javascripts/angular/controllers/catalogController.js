AngularApp.controller("catalogController", ["$scope", "httpService", "$timeout", function($scope, httpService, $timeout) {

  $scope.pageTitle = "Find A Car".split("");

  $scope.pageReady = false;
  $scope.bounceReady = false;
  $scope.animateIn = function() {
    $scope.pageReady = true;
    $scope.bounceReady = true;
    // $timeout( function() { $scope.bounceReady == false }, 250);
  };
  $timeout($scope.animateIn, 250);


  $scope.model = {};
  $scope.results = null;
  $scope.tableView = false;

  $scope.car_makes = [ "AM General", "Acura", "Alfa Romeo", "Aston Martin", "Audi", "BMW", "Bentley", "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Daewoo", "Dodge", "Eagle", "FIAT", "Ferrari", "Fisker", "Ford", "GMC", "Geo", "HUMMER", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "MINI", "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "Mercury", "Mitsubishi", "Nissan", "Oldsmobile", "Panoz", "Plymouth", "Pontiac", "Porsche", "Ram", "Rolls-Royce", "Saab", "Saturn", "Scion", "Spyker", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", "smart" ]
  $scope.car_models = { "AM General": ["Hummer"], "Acura":["CL", "ILX", "ILX Hybrid", "Integra", "Legend", "MDX", "NSX", "RDX", "RL", "RLX", "RSX", "SLX", "TL", "TLX", "TSX", "TSX Sport Wagon", "Vigor", "ZDX"], "Alfa Romeo":["4C"], "Aston Martin":["DB7", "DB9", "DBS", "Rapide", "Rapide S", "V12 Vanquish", "V12 Vantage", "V12 Vantage S", "V8 Vantage", "Vanquish", "Virage"], "Audi":["100", "200", "80", "90", "A3", "A3 e-tron", "A4", "A5", "A6", "A7", "A8", "Cabriolet", "Coupe", "Q1", "Q3", "Q5", "Q7", "R8", "RS 4", "RS 5", "RS 6", "RS 7", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "TT", "TT RS", "TTS", "V8", "allroad", "allroad quattro"], "BMW":["1 Series", "1 Series M", "2 Series", "2 Series Active Tourer", "3 Series", "3 Series Gran Turismo", "4 Series", "4 Series Gran Coupe", "5 Series", "5 Series Gran Turismo", "6 Series", "6 Series Gran Coupe", "7 Series", "8 Series", "ALPINA B7", "ActiveHybrid 5", "ActiveHybrid 7", "ActiveHybrid X6", "Alpina", "M", "M3", "M4", "M5", "M6", "M6 Gran Coupe", "X1", "X3", "X4", "X5", "X5 M", "X6", "X6 M", "X7", "Z3", "Z4", "Z4 M", "Z8", "i3", "i8"], "Bentley":["Arnage", "Azure", "Azure T", "Brooklands", "Continental", "Continental Flying Spur", "Continental Flying Spur Speed", "Continental GT", "Continental GT Speed", "Continental GT Speed Convertible", "Continental GTC", "Continental GTC Speed", "Continental Supersports", "Continental Supersports Convertible", "Flying Spur", "Mulsanne", "Supersports Convertible ISR"], "Bugatti":["Veyron 16.4"], "Buick":["Anthem", "Century", "Electra", "Enclave", "Encore", "Estate Wagon", "LaCrosse", "LeSabre", "Lucerne", "Park Avenue", "Rainier", "Reatta", "Regal", "Rendezvous", "Riviera", "Roadmaster", "Skylark", "Terraza", "Verano"], "Cadillac":["ATS", "ATS-V", "Allante", "Brougham", "CTS", "CTS Coupe", "CTS Wagon", "CTS-V", "CTS-V Coupe", "CTS-V Wagon", "Catera", "DTS", "DeVille", "ELR", "Eldorado", "Escalade", "Escalade ESV", "Escalade EXT", "Escalade Hybrid", "Fleetwood", "LTS", "SRX", "STS", "STS-V", "Seville", "Sixty Special", "XLR", "XLR-V", "XTS"], "Chevrolet":["Astro", "Astro Cargo", "Avalanche", "Aveo", "Beretta", "Black Diamond Avalanche", "Blazer", "C/K 1500 Series", "C/K 2500 Series", "C/K 3500 Series", "Camaro", "Caprice", "Captiva Sport", "Cavalier", "Celebrity", "Chevy Van", "Chevy Van Classic", "City Express", "Classic", "Cobalt", "Colorado", "Corsica", "Corvette", "Corvette Stingray", "Cruze", "Equinox", "Express", "Express Cargo", "HHR", "Impala", "Impala Limited", "Lumina", "Lumina Minivan", "Malibu", "Malibu Classic", "Malibu Hybrid", "Malibu Maxx", "Metro", "Monte Carlo", "Prizm", "R/V 3500 Series", "S-10", "S-10 Blazer", "SS", "SSR", "Silverado 1500", "Silverado 1500 Classic", "Silverado 1500 Hybrid", "Silverado 1500HD", "Silverado 1500HD Classic", "Silverado 2500", "Silverado 2500HD", "Silverado 2500HD Classic", "Silverado 3500", "Silverado 3500 Classic", "Silverado 3500HD", "Sonic", "Spark", "Spark EV", "Sportvan", "Suburban", "Tahoe", "Tahoe Hybrid", "Tahoe Limited/Z71", "Tracker", "TrailBlazer", "TrailBlazer EXT", "Traverse", "Trax", "Uplander", "Venture", "Volt"], "Chrysler":["200", "300", "300M", "Aspen", "Cirrus", "Concorde", "Crossfire", "Grand Voyager", "Imperial", "LHS", "Le Baron", "New Yorker", "PT Cruiser", "Pacifica", "Prowler", "Sebring", "TC", "Town and Country", "Voyager"], "Daewoo":["Lanos", "Leganza", "Nubira"], "Dodge":["Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Colt", "Dakota", "Dart", "Daytona", "Durango", "Dynasty", "Grand Caravan", "Intrepid", "Journey", "Magnum", "Monaco", "Neon", "Nitro", "Omni", "RAM 150", "RAM 250", "RAM 350", "Ram 50 Pickup", "Ram Cargo", "Ram Pickup 1500", "Ram Pickup 2500", "Ram Pickup 3500", "Ram Van", "Ram Wagon", "Ramcharger", "SRT Viper", "Shadow", "Spirit", "Sprinter", "Sprinter Cargo", "Stealth", "Stratus", "Viper"], "Eagle":["Premier", "Summit", "Talon", "Vision"], "FIAT":["500", "500L", "500e"], "Ferrari":["360", "430 Scuderia", "456M", "458 Italia", "550", "575M", "599", "612 Scaglietti", "California", "Enzo", "F430", "FF", "Superamerica"], "Fisker":["Karma"], "Ford":["Aerostar", "Aspire", "Bronco", "Bronco II", "C-Max Energi", "C-Max Hybrid", "Contour", "Contour SVT", "Crown Victoria", "E-150", "E-250", "E-350", "E-Series Van", "E-Series Wagon", "Econoline Cargo", "Econoline Wagon", "Edge", "Escape", "Escape Hybrid", "Escort", "Excursion", "Expedition", "Expedition EL", "Explorer", "Explorer Sport", "Explorer Sport Trac", "F-150", "F-150 Heritage", "F-150 SVT Lightning", "F-250", "F-250 Super Duty", "F-350", "F-350 Super Duty", "F-450 Super Duty", "Festiva", "Fiesta", "Five Hundred", "Flex", "Focus", "Focus ST", "Freestar", "Freestyle", "Fusion", "Fusion Energi", "Fusion Hybrid", "GT", "LTD Crown Victoria", "Mustang", "Mustang SVT Cobra", "Probe", "Ranger", "Shelby GT500", "Taurus", "Taurus X", "Tempo", "Thunderbird", "Transit Connect", "Transit Van", "Transit Wagon", "Windstar", "Windstar Cargo"], "GMC":["Acadia", "Canyon", "Envoy", "Envoy XL", "Envoy XUV", "Jimmy", "R/V 3500 Series", "Rally Wagon", "S-15", "S-15 Jimmy", "Safari", "Safari Cargo", "Savana", "Savana Cargo", "Sierra 1500", "Sierra 1500 Classic", "Sierra 1500 Hybrid", "Sierra 1500HD", "Sierra 1500HD Classic", "Sierra 2500", "Sierra 2500HD", "Sierra 2500HD Classic", "Sierra 3500", "Sierra 3500 Classic", "Sierra 3500HD", "Sierra C3", "Sierra Classic 1500", "Sierra Classic 2500", "Sierra Classic 3500", "Sonoma", "Suburban", "Syclone", "Terrain", "Typhoon", "Vandura", "Yukon", "Yukon Denali", "Yukon Hybrid", "Yukon XL"], "Geo":["Metro", "Prizm", "Storm", "Tracker"], "HUMMER":["H1", "H1 Alpha", "H2", "H2 SUT", "H3", "H3T"], "Honda":["Accord", "Accord Crosstour", "Accord Hybrid", "Accord Plug-In Hybrid", "CR-V", "CR-Z", "Civic", "Civic CRX", "Civic del Sol", "Crosstour", "Element", "Fit", "Fit EV", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Prelude", "Ridgeline", "S2000", "Vezel"], "Hyundai":["Accent", "Azera", "Elantra", "Elantra Coupe", "Elantra GT", "Elantra Touring", "Entourage", "Equus", "Excel", "Genesis", "Genesis Coupe", "Santa Fe", "Santa Fe Sport", "Scoupe", "Sonata", "Sonata Hybrid", "Tiburon", "Tucson", "Veloster", "Veracruz", "XG300", "XG350"], "Infiniti":["EX", "EX35", "FX", "FX35", "FX45", "FX50", "G Convertible", "G Coupe", "G Sedan", "G20", "G35", "G37", "G37 Convertible", "G37 Coupe", "G37 Sedan", "I30", "I35", "J30", "JX", "M", "M30", "M35", "M37", "M45", "M56", "Q45", "Q50", "Q60 Convertible", "Q60 Coupe", "Q70", "QX", "QX4", "QX50", "QX56", "QX60", "QX70", "QX80"], "Isuzu":["Amigo", "Ascender", "Axiom", "Hombre", "Impulse", "Oasis", "Pickup", "Rodeo", "Rodeo Sport", "Stylus", "Trooper", "VehiCROSS", "i-Series"], "Jaguar":["F-Type", "S-Type", "X-Type", "XE", "XF", "XJ", "XJ-Series", "XJR", "XK", "XK-Series", "XKR", "XQ"], "Jeep":["Cherokee", "Comanche", "Commander", "Compass", "Grand Cherokee", "Grand Wagoneer", "Liberty", "Patriot", "Renegade", "Wagoneer", "Wrangler"], "Kia":["Amanti", "Borrego", "Cadenza", "Forte", "K900", "Optima", "Rio", "Rondo", "Sedona", "Sephia", "Sorento", "Soul", "Soul EV", "Spectra", "Sportage"], "Lamborghini":["Aventador", "Diablo", "Gallardo", "Murcielago", "Reventon"], "Land Rover":["Defender", "Discovery", "Discovery Series II", "Discovery Sport", "Freelander", "LR2", "LR3", "LR4", "Range Rover", "Range Rover Evoque", "Range Rover Evoque Convertible", "Range Rover Sport"], "Lexus":["CT 200h", "ES 250", "ES 300", "ES 300h", "ES 330", "ES 350", "GS 300", "GS 350", "GS 400", "GS 430", "GS 450h", "GS 460", "GX 460", "GX 470", "HS 250h", "IS 250", "IS 250 C", "IS 300", "IS 350", "IS 350 C", "IS F", "LFA", "LS 400", "LS 430", "LS 460", "LS 600h L", "LX 450", "LX 470", "LX 570", "NX 200t", "NX 300h", "RC 350", "RC F", "RX 300", "RX 330", "RX 350", "RX 400h", "RX 450h", "SC 300", "SC 400", "SC 430"], "Lincoln":["Aviator", "Blackwood", "Continental", "LS", "MKC", "MKS", "MKT", "MKX", "MKZ", "MKZ Hybrid", "Mark LT", "Mark VII", "Mark VIII", "Navigator", "Navigator L", "Town Car", "Zephyr"], "Lotus":["Elise", "Esprit", "Evora", "Exige"], "MINI":["Cooper", "Cooper Clubman", "Cooper Countryman", "Cooper Coupe", "Cooper Paceman", "Cooper Roadster"], "Maserati":["Coupe", "Ghibli", "GranSport", "GranTurismo", "GranTurismo Convertible", "Quattroporte", "Spyder"], "Maybach":["57", "62", "Landaulet"], "Mazda":["323", "626", "929", "B-Series", "B-Series Pickup", "B-Series Truck", "CX-5", "CX-7", "CX-9", "MPV", "MX-3", "MX-5 Miata", "MX-6", "Mazda2", "Mazda3", "Mazda5", "Mazda6", "Mazdaspeed MX-5 Miata", "Mazdaspeed Mazda3", "Mazdaspeed Mazda6", "Mazdaspeed Protege", "Mazdaspeed3", "Millenia", "Navajo", "Protege", "Protege5", "RX-7", "RX-8", "Tribute", "Tribute Hybrid", "Truck"], "McLaren":["MP4-12C", "MP4-12C Spider", "P1"], "Mercedes-Benz":["190-Class", "300-Class", "350-Class", "400-Class", "420-Class", "500-Class", "560-Class", "600-Class", "B-Class Electric Drive", "C-Class", "C36 AMG", "C43 AMG", "CL-Class", "CLA-Class", "CLK-Class", "CLS-Class", "E-Class", "E55 AMG", "G-Class", "GL-Class", "GLA-Class", "GLK-Class", "M-Class", "ML55 AMG", "MLC-Class", "R-Class", "S-Class", "SL-Class", "SLK-Class", "SLR McLaren", "SLS AMG", "SLS AMG GT", "Sprinter"], "Mercury":["Capri", "Cougar", "Grand Marquis", "Marauder", "Mariner", "Mariner Hybrid", "Milan", "Milan Hybrid", "Montego", "Monterey", "Mountaineer", "Mystique", "Sable", "Topaz", "Tracer", "Villager"], "Mitsubishi":["3000GT", "Diamante", "Eclipse", "Eclipse Spyder", "Endeavor", "Expo", "Galant", "Lancer", "Lancer Evolution", "Lancer Sportback", "Mighty Max Pickup", "Mirage", "Montero", "Montero Sport", "Outlander", "Outlander Sport", "Precis", "Raider", "Sigma", "Vanwagon", "i-MiEV"], "Nissan":["200SX", "240SX", "300ZX", "350Z", "370Z", "Altima", "Altima Hybrid", "Armada", "Axxess", "Cube", "Frontier", "GT-R", "Juke", "Leaf", "Maxima", "Murano", "Murano CrossCabriolet", "NV", "NV Cargo", "NV Passenger", "NV200", "NX", "Pathfinder", "Pulsar", "Quest", "Rogue", "Rogue Select", "Sentra", "Stanza", "Titan", "Truck", "Van", "Versa", "Versa Note", "Xterra"], "Oldsmobile":["Achieva", "Alero", "Aurora", "Bravada", "Ciera", "Custom Cruiser", "Cutlass", "Cutlass Calais", "Cutlass Ciera", "Cutlass Supreme", "Eighty-Eight", "Eighty-Eight Royale", "Intrigue", "LSS", "Ninety-Eight", "Regency", "Silhouette", "Toronado"], "Panoz":["Esperante"], "Plymouth":["Acclaim", "Breeze", "Colt", "Grand Voyager", "Horizon", "Laser", "Neon", "Prowler", "Sundance", "Voyager"], "Pontiac":["6000", "Aztek", "Bonneville", "Firebird", "G3", "G5", "G6", "G8", "GTO", "Grand Am", "Grand Prix", "Le Mans", "Montana", "Montana SV6", "Solstice", "Sunbird", "Sunfire", "Torrent", "Trans Sport", "Vibe"], "Porsche":["911", "918 Spyder", "928", "944", "968", "Boxster", "Carrera GT", "Cayenne", "Cayman", "Cayman S", "Macan", "Panamera"], "Ram":["1500", "2500", "3500", "C/V Cargo Van", "C/V Tradesman", "CV Tradesman", "Dakota", "Promaster Cargo Van", "Promaster Window Van"], "Rolls-Royce":["Corniche", "Ghost", "Park Ward", "Phantom", "Phantom Coupe", "Phantom Drophead Coupe", "Silver Seraph", "Wraith"], "Saab":["9-2X", "9-3", "9-3 Griffin", "9-4X", "9-5", "9-7X", "900", "9000"], "Saturn":["Astra", "Aura", "Aura Hybrid", "ION", "L-Series", "L300", "Outlook", "Relay", "S-Series", "Sky", "VUE", "VUE Hybrid"], "Scion":["FR-S", "FR-S Convertible", "iQ", "tC", "xA", "xB", "xD"], "Spyker":["C8"], "Subaru":["B9 Tribeca", "BRZ", "Baja", "Forester", "Impreza", "Impreza WRX", "Justy", "Legacy", "Loyale", "Outback", "SVX", "Tribeca", "WRX", "XT", "XV Crosstrek"], "Suzuki":["Aerio", "Equator", "Esteem", "Forenza", "Grand Vitara", "Kizashi", "Reno", "SX4", "Samurai", "Sidekick", "Swift", "Verona", "Vitara", "X-90", "XL-7", "XL7"], "Tesla":["Model S", "Model X", "Roadster"], "Toyota":["4Runner", "Avalon", "Avalon Hybrid", "Camry", "Camry Hybrid", "Camry Solara", "Celica", "Corolla", "Cressida", "ECHO", "FJ Cruiser", "Highlander", "Highlander Hybrid", "Land Cruiser", "MR2", "MR2 Spyder", "Matrix", "Paseo", "Pickup", "Previa", "Prius", "Prius Plug-in", "Prius c", "Prius v", "RAV4", "RAV4 EV", "Sequoia", "Sienna", "Supra", "T100", "Tacoma", "Tercel", "Tundra", "Venza", "Yaris"], "Volkswagen":["Alltrack", "Beetle", "Beetle Convertible", "CC", "Cabrio", "Cabriolet", "Corrado", "Eos", "EuroVan", "Fox", "GLI", "GTI", "Golf", "Golf R", "Jetta", "Jetta GLI", "Jetta Hybrid", "Jetta SportWagen", "New Beetle", "Passat", "Phaeton", "R32", "Rabbit", "Routan", "Tiguan", "Touareg", "Touareg 2", "Vanagon", "e-Golf"], "Volvo":["240", "740", "760", "780", "850", "940", "960", "C30", "C70", "Coupe", "S40", "S60", "S70", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "XC", "XC60", "XC70", "XC90"], "smart":["fortwo"] }
  $scope.current_car_models = [];

  $scope.showRow = function(row){
    var flag = true;

    if( $scope.model.price_low != null && $scope.model.price_low != "" ){
      var price_low = parseInt( $scope.model.price_low.replace("$", "").replace(",","") )
      if( row.price < price_low ){
        return false  
      }
    }
    if( $scope.model.price_high != null && $scope.model.price_high != "" ){
      var price_high = parseInt( $scope.model.price_high.replace("$", "").replace(",","") )
      if( row.price > price_high ){
        return false  
      }
    }

    if( $scope.model.year != null && $scope.model.year != "" ){
      if( row.year != $scope.model.year ){
        return false  
      }
    }

    return true;

  }

  $scope.$watch("model.make", function(newValue, oldValue){
    if( newValue && $scope.car_models[newValue] ){
      $scope.current_car_models = $scope.car_models[newValue];
    }
  });


  $scope.doSearch = function(){
    if( $scope.model.zipcode && $scope.model.zipcode.length == 5 && $scope.model.make ){

      httpService.getApiEndpoint(
        "/search.json?" + $.param( $scope.model )
      ).success( function(payload, status){
        console.log(payload)

        for(var i in payload.resultsList){
          payload.resultsList[i].picture = payload.photos[ payload.resultsList[i].styleId ];
          payload.resultsList[i].zipcode = payload.resultsList[i].dealerAddress.substr( payload.resultsList[i].dealerAddress.length - 5  );

          payload.resultsList[i].price = payload.resultsList[i].inventoryPrice;
          if( payload.resultsList[i].price == "N/A" ){
            payload.resultsList[i].price = payload.resultsList[i].tmvinventoryPrice;
          }
          if( payload.resultsList[i].price == "N/A" ){
            payload.resultsList[i].price = null;
          }

          payload.resultsList[i].referral = "http://www.edmunds.com/inventory/vin.html?" + 
            "make="+payload.resultsList[i].make+"&" + 
            "inventoryId="+payload.resultsList[i].inventoryId+"&" + 
            "zip="+payload.resultsList[i].zipcode+"&" + 
            "radius=25"
        }

        if( payload.resultsList ){
          $scope.results = payload.resultsList;
        }else{
          $scope.results = [];
        }
      });

    }
  }

}]);









