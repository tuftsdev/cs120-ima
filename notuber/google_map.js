function initMap() {
    //Map options
    let options = {
        zoom: 13,
        center: {lat: 42.352271, lng: -71.05524200000001}
    }
    //New map
     let map = new google.maps.Map(document.getElementById('map'), options);
    //array of markers
    let markers = [
    {
         coords: {lat: 42.3453, lng: -71.0464},
         iconImage: "car.png",
         content: '<h1>mXfkjrFw</h1>',
     },
     {
        coords:{lat: 42.3662, lng: -71.0621},
        iconImage: "car.png",
        content: '<h1>nZXB8ZHz</h1>'
        },
        {
        coords:{lat: 42.3603, lng: -71.0547},
        iconImage: "car.png",
        content: '<h1>Tkwu74WC</h1>'
    },
        {
        coords:{lat: 42.3472, lng: -71.0802},
        iconImage: "car.png",
        content: '<h1>5KWpnAJN</h1>'
        },
        {
        coords:{lat: 42.3663, lng: -71.0544},
        iconImage: "car.png",
        content: '<h1>uf5ZrXYw</h1>'
    },
        {
            coords:{lat: 42.3542, lng: -71.0704},
            iconImage: "car.png",
            content: '<h1>VMerzMH8</h1>'
        },
    ];

    for (let i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }


    //Add marker function
    function addMarker(props) {
     let marker = new google.maps.Marker({
         position: props.coords,
         map: map,
        //  icon: props.iconImage
     });
     //check for customicon
     if(props.iconImage){
         //set icon image
        marker.setIcon(props.iconImage);
     }
     //check content
     if(props.content) {
        var infoWindow = new google.maps.InfoWindow({
        content: props.content
        });
                
     marker.addListener('click', function() {
         infoWindow.open(map, marker);
     });
     }
    }
}