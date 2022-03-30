const getWeather = async(lat, lon) => {
    const response = await fetch(`weather?Latitude=${lat}&Longitude=${lon}`);
    if (response.ok) {
        return await response.json();
    } else {
        console.log(`There is a problem`)
        return {}
    }
}

export default getWeather;