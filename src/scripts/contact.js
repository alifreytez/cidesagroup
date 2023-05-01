window.initMap = function initMap() {
    const coords = { lat: 25.761848, lng: -80.192097 };

	const map = new google.maps.Map(document.getElementById('headquarters-map'), {
		center: coords,
		zoom: 18
	});

    const marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: 'Cidesa Group Headquarters'
    });
};

