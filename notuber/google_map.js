function initMap() {
    //my geolocatioon
    x = navigator.geolocation;
    x.getCurrentPosition(success, failure);
    
    let result;
    function success(position) {
        var myLat = position.coords.latitude;
        var myLong = position.coords.longitude;

        var coords = new google.maps.LatLng(myLat, myLong);
        var mapOptions = {
            zoom: 3,
            center: coords,
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({map: map, position:coords});

        
        //calling Ride-Hailing API
        var http = new XMLHttpRequest();
        var url = `https://jordan-marsh.herokuapp.com/rides`;
        var params = `username=acM4zqDt&lat=${myLat}&lng=${myLong}`;
        http.open('POST', url, true);      

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                var jsonStr = http.response;
                var jsonObj = JSON.parse(jsonStr);
                var distance = [];
                var obj = {};
                for (i = 0; i < jsonObj.length; i++) {
                    var a = new google.maps.LatLng(myLat, myLong);
                    var b = new google.maps.LatLng(jsonObj[i].lat, jsonObj[i].lng);
                    var result = google.maps.geometry.spherical.computeDistanceBetween(a,b);
                    var mile =  result/1609.344;
                    obj[mile] = [jsonObj[i].lat, jsonObj[i].lng]

                    distance.push(mile);

                    function addMarker(props){
                        let marker = new google.maps.Marker({
                            position: props.coords,
                            map: map,
                        });
                        if(props.iconImage) {
                            marker.setIcon(props.iconImage)
                        }    

                        // if(props.content) {
                        //     var infoWindow = new google.maps.InfoWindow({
                        //         content: props.content
                        //         });
                        // }
                        // marker.addListener('click', function(){
                        //     infoWindow.open(map, marker)
                        // })
                    }

                    addMarker({coords:{lat: jsonObj[i].lat, lng: jsonObj[i].lng},
                                iconImage: "car.png",
                                // content:'<h1>hello</h1>'
                            })
 
                }
                
                distance.sort(function(a, b) {
                    return a - b;
                  });
                var closest = distance[0];

                const flightPlanCoordinates = [
                    { lat: myLat, lng: myLong},
                    { lat: obj[closest][0], lng: obj[closest][1]}
                  ];
                  const flightPath = new google.maps.Polyline({
                    path: flightPlanCoordinates,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                  });
                
                  flightPath.setMap(map);

                var infoWindow = new google.maps.InfoWindow({
                    content: `<h1>The closest vehicle is ${closest} miles away</h1>`
                    });
        
                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });
            }
            
        }
        
        http.send(params);
    }

    function failure(){}
}