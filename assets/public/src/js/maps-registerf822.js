var sProvinsi = null,
    sKota = null,
    sAlamat = null,
    sLat = 0,
    sLng = 0,
    map = null,
    marker = null
    targetLoc = null,
    getMyLocation = null;

function initMap() {
    // get latlng in map for exm in semarang
    var semarang = new google.maps.LatLng(-7.004270, 110.434574);
    // get lat
    // var ahhas = new google.maps.LatLng(-7.0565862,110.4358316);
    
    // insert map in html - id = map
    // and set property
    var idMap = document.getElementById('map')
    map = new google.maps.Map(idMap, {
      center: semarang,
      zoom: 13,
      gestureHandling: "greedy",
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      // styles: styles
    });
    geocoder = new google.maps.Geocoder;
    
    var cordinat = document.getElementById('latlng')
    var locationAddress = document.getElementById('locationAddress')
    var loadingAddrs = document.getElementById('loadingAddrs')
    
    // var btnSlideup = document.getElementById('btnSlideup')
    var btnLokasiServisFull = document.getElementById('btnLokasiServisFull')
    var btnUseMap = document.getElementById('btnUseMap')
    var fullLokasiSaya = document.getElementById('full-lokasi-saya')
    
    var btnOpenMap = document.getElementById('btnOpenMap')
    var boxesMap = document.getElementById('boxesMap')
    var cancelMap = document.getElementById('cancelMap')
    btnOpenMap.addEventListener('click',function(){
        boxesMap.classList.add('active');

        var xLat = $("input[type='hidden'][name='lat']").val(),
            xLng = $("input[type='hidden'][name='lng']").val();

        if(xLat){

          targetLoc.setPosition({
              lat: Number(xLat),
              lng: Number(xLng)
          });

          map.getCenter();
        }
    })
    cancelMap.addEventListener('click',function(){
        boxesMap.classList.remove('active')
    })
    var myLocation = document.getElementById('myLocation')
    myLocation.addEventListener('click',function(){
        fullLokasiSaya.style.display = 'block'
    })
    // btnSlideup.addEventListener('click',function(){
    //     fullLokasiSaya.style.display = 'block'
    // })
    btnLokasiServisFull.addEventListener('click',function(){
        fullLokasiSaya.style.display = 'none'
    })
    btnUseMap.addEventListener('click',function(){
        fullLokasiSaya.style.display = 'none'
    })

    // Create the search box and link it to the UI element.
    var mencariLokasiServis = document.getElementById('mencariLokasiServis');
    var boxAutocomplate = document.getElementById('boxAutocomplate');
    var loadingAutoComplate = document.getElementById('loadingAutoComplate');
    var setLocationService = document.getElementById('setLocationService');
    var lokasiBengkelResmi = document.getElementById('lokasiBengkelResmi');
    var searchBox = new google.maps.places.SearchBox(setLocationService);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(setLocationService);
    var switchMap = true
    // display suggestions
    var displaySuggestions = function(predictions, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        
        return;
      }
    
      
      predictions.forEach(function(prediction) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(prediction.description));
        boxAutocomplate.appendChild(li);
        li.onclick = function(){
            locationAddress.innerHTML = ''
            setLocationService.setAttribute('value', prediction.description)
            // locationAddress.innerHTML = ''
            locationAddress.style.display = 'none'
            loadingAddrs.style.display = 'block'
            setTimeout(function(){
                // locationAddress.innerHTML = prediction.description
                // lokasiBengkelResmi.innerHTML = prediction.description
                locationAddress.style.display = 'block'
                loadingAddrs.style.display = 'none'
            },350)
        };
        
      });
      
      if(status = 'OK'){
        loadingAutoComplate.style.display = 'none'
      }else{
        loadingAutoComplate.style.display = 'block'
      }

    };

    // function setLocationService(){
    //     console.log(this) 
    // }
    // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(boxAutocomplate);
    // var autocomplete = new google.maps.places.Autocomplete(mencariLokasiServis);
    var service = new google.maps.places.AutocompleteService();

    mencariLokasiServis.addEventListener('keyup', function (e) {
        loadingAutoComplate.style.display = 'block'
        boxAutocomplate.style.display = 'none'
        if(this.value.length   > 3){
          boxAutocomplate.style.display = 'block'
          boxAutocomplate.innerHTML = ''
          var val = this.value
          service.getQueryPredictions({ input: val }, displaySuggestions);
        }
    });
    
    var target = siteurl+'assets/public/src/imgs/target.png';
    var base = siteurl+'assets/public/src/imgs/locations.png';
    
    marker = new google.maps.Marker({
      position: semarang, 
      map: map,
      icon: base,
      draggable: false,
    });

    targetLoc = new google.maps.Marker({
      position: semarang, 
      map: map,
      icon: target,
      animation: google.maps.Animation.DROP,
      draggable: false,
    });

    getMyLocation = function() {
        var dfd = $.Deferred();

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                map.setCenter(pos);
                marker.setPosition(pos);
                targetLoc.setPosition(pos);
                cordinat.setAttribute('value', pos.lat +','+ pos.lng)
                map.getCenter();

                geocodeLatLng(geocoder, map, function(dt){
                  sProvinsi    = getAddressItem('provinsi', dt);
                  sKota    = getAddressItem('kota', dt);
                  sAlamat  = dt.formatted_address;
                  sLat     = pos.lat;
                  sLng     = pos.lng;

                  dfd.resolve(dt);
                });

            }, function() {
                map.getCenter()
            });
        } else {
          dfd.reject(false);
          // Browser doesn't support Geolocation
        }

        return dfd.promise();
    }
    
    getMyLocation().then(function(dt){
      document.getElementById('locationAddress').innerHTML = dt.formatted_address;
    });
    
    // var btnSaveFav = document.getElementById('btnSaveFav')
    // btnSaveFav.addEventListener('click',function(){
    //     btnSaveFav.classList.toggle('active')
    // })

    var btnCheckLocation = document.getElementById('getTarget')
    if(btnCheckLocation){
        btnCheckLocation.addEventListener('click', function(){
            getMyLocation()
        });
    }
    
    //add animation in targetLoc
    targetLoc.addListener('click', function(){
      if (targetLoc.getAnimation() !== null) {
        targetLoc.setAnimation(null);
      } else {
        targetLoc.setAnimation(google.maps.Animation.BOUNCE);
      }
    });

    var G_getLat;
    var G_getLng;
    var G_map;
    map.addListener('click',function(event){
      var self = event
      var getLat = self.latLng.lat()
      var getLng = self.latLng.lng()
    //   setInfoWindowContent(getLat,getLng,map)
      G_getLat = getLat
      G_getLng = getLng
      G_map = map
    })
    
    map.addListener('zoom_changed', function() {
        // coordInfoWindow.setContent(createInfoWindowContent(semarang, map.getZoom()));
        // coordInfoWindow.open(map);
        changePosition(G_getLat,G_getLng, map)
    });
    
    google.maps.event.addListener(map, 'drag', function(e) {
        var center = map.getCenter();
        targetLoc.setPosition(center);
        locationAddress.style.display = 'none'
        loadingAddrs.style.display = 'block'
    });
    google.maps.event.addListener(map, 'zoom_changed', function(e) {
        var center = map.getCenter();
        targetLoc.setPosition(center);
    });
    var setLocationService = document.getElementById('setLocationService')
    google.maps.event.addListener(map, 'tilesloaded', function(e) {
        var center = map.getCenter();
        targetLoc.setPosition(center);
        var getLat = targetLoc.getPosition().lat() // kordinat lat
        var getLng = targetLoc.getPosition().lng() // kordinat lng
        var setLoc = getLat +","+ getLng
        setLocationService.setAttribute('value', setLoc)

        locationAddress.style.display = 'block'
        loadingAddrs.style.display = 'none'
    });
    google.maps.event.addListener(map, 'dragend', function(e) {
        var center = map.getCenter();
        targetLoc.setPosition(center);
        var getLat = targetLoc.getPosition().lat() // kordinat lat
        var getLng = targetLoc.getPosition().lng() // kordinat lng
        
        cordinat.setAttribute('value', getLat +','+ getLng)
        setTimeout(function() {
            geocodeLatLng(geocoder, map, function(dt){
              sProvinsi    = getAddressItem('provinsi', dt);
              sKota    = getAddressItem('kota', dt);
              sAlamat  = dt.formatted_address;
              sLat     = getLat;
              sLng     = getLng;

              document.getElementById('locationAddress').innerHTML = dt.formatted_address;
            });

            locationAddress.style.display = 'block'
            loadingAddrs.style.display = 'none  '
        }, 300);
    });
    
    // function to set map
    
   
    
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    //   console.log('bounds_changed')
    });

    // setLocationService.addEventListener('keyup',function(event){
    //     console.log('change')
    //     if (event.keyCode === 13) {
    //         
    //     }
    // })
    // console.log(searchBox)
    var getMapByClick;
    var getMapByClickCenter;
    var getTargetLocByClick;
    searchBox.addListener('places_changed', function() {
        console.log(searchBox.value)
        var places = searchBox.getPlaces();
        console.log(places.geometry.location)
        if (places.length == 0) {
          console.log('null')
          return;
        } 
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();  
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            
            
            
            // marker.setPosition(pos);
            
            
            // getMapByClick = map.setCenter(place.geometry.location);
            // getMapByClickCenter = targetLoc.setPosition( place.geometry.location);;
            // getTargetLocByClick = map.getCenter();
            getMapByClick = place.geometry.location;
            getMapByClickCenter = place.geometry.location
            
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                var a = bounds.union(place.geometry.viewport);
                console.log(a)
            } else {
                var b =bounds.extend(place.geometry.location);
                console.log(b)
            }
        });
        map.fitBounds(bounds);
    });
    
    var SetMapBySearch = document.getElementById("boxAutocomplate")
    if(SetMapBySearch){
        SetMapBySearch.addEventListener('click',function(){
            var center = map.getCenter();
            targetLoc.setPosition(center);

            geocodeAddrs(geocoder, map, function(dt){
              sProvinsi = getAddressItem('provinsi', dt);
              sKota = getAddressItem('kota', dt);
              sAlamat = dt.formatted_address;
              sLat = dt.geometry.location.lat();
              sLng = dt.geometry.location.lng();
              
              document.getElementById('locationAddress').innerHTML = dt.formatted_address;
            });

            fullLokasiSaya.style.display = 'none'
            map.setZoom(17);

        });
    }
}


function geocodeLatLng(geocoder, map, callback) {
  var input = document.getElementById('latlng').value;
  var locationAddress = document.getElementById('locationAddress');
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        // lokasiBengkelResmi.innerHTML = results[0].formatted_address;
        // locationAddress.innerHTML = results[0].formatted_address;

        if(typeof callback == 'function'){
          callback(results[0]);
        }
      }else{
          
      }
      
    } else {
      console.log('Geocoder failed due to: ' + status);
    }
  });
}

function geocodeAddrs(geocoder, resultsMap, callback) {
  var address = document.getElementById('setLocationService').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        if(typeof callback == 'function'){
          callback(results[0]);
        }
        // var marker = new google.maps.Marker({
        //   map: resultsMap,
        //   position: results[0].geometry.location
        // });
        
        // resultsMap.setCenter(results[0].geometry.location);
        // targetLoc.setPosition(results[0].geometry.location);
    } else {
        console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function changePosition(getLat,getLng, map){
  var setPosition = new google.maps.LatLng(getLat, getLng);
  // var coordInfoWindow = new google.maps.InfoWindow();
  // coordInfoWindow.setContent(createInfoWindowContent(setPosition, map.getZoom()));
  // coordInfoWindow.open(map);
}

// CTA
var btnLokasiSaya = document.getElementById('btnLokasiSaya')
var btndiBengkel = document.getElementById('btndiBengkel')
//   var btnBackLokasiServis = document.getElementById('btnBackLokasiServis')
//   var btnBackLokasiServisBengkel = document.getElementById('btnBackLokasiServisBengkel')
// box
var newBoxOrder = document.getElementById('new-BoxOrder')
var boxLocation = document.getElementById('boxLocation')
var boxLocationBengkel = document.getElementById('boxLocationBengkel')
 
var getAddressItem = function(item, data){
  var item_value = '';
  $.each(data.address_components, function(i,n){
    switch (item) {
      case 'provinsi':
        if(n.types[0] == 'administrative_area_level_1'){
          item_value = n.long_name;
          return false;
        }

        break;
      case 'kota':
        if(n.types[0] == 'administrative_area_level_2'){
          item_value = n.long_name;
          return false;
        }

        break;
      default:
        // statements_def
        break;
    }
    
  })

  return item_value;
}