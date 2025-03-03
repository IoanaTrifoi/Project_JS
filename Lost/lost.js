let locationBtn = document.getElementById("get-location");
let locationDetails = document.getElementById("location");

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, checkErr);
    } else {
        locationDetails.innerText = "Geolocation not supported by your browser.";
    }
});

const checkErr = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationDetails.innerText = "Allow access to location.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationDetails.innerText = "Location unavailable.";
            break;
        case error.TIMEOUT:
            locationDetails.innerText = "Timed out request.";
            break;
        default:
            locationDetails.innerText = "An unknown error occurred.";
    }
};

const showLocation = async (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    try {
        let response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        let data = await response.json();

        locationDetails.innerText = `${data.countryName}, ${data.city}`;
    } catch (error) {
        locationDetails.innerText = "Failed to fetch location details.";
    }
};
