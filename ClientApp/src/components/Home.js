import React, {useState, useEffect} from 'react';
import './Home.css';

const getWeather = async(lat, lon) => {
    const response = await fetch(`weather?Latitude=${lat}&Longitude=${lon}`);
    if (response.ok) {
        return await response.json();
    } else {
        console.log(`There is a problem`)
        return {}
    }
}

const IsEmpty = (obj) => {
    return obj
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype;
}

const Home = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [weather, setWeather] = useState({});
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    if(IsEmpty(weather))
    {
        navigator.geolocation.getCurrentPosition(
            async (position) => await callback(position.coords.latitude, position.coords.longitude),
            async () => await callback(51.509865, -0.118092),
        );
    }

    const callback = async (lat, lon) => {
        const response = await getWeather(lat, lon)
        if(!IsEmpty(response))
        {
            setWeather(response)
        }
    }
    
    const setDateTime = () => {
        setCurrentDateTime(new Date());
    }
    useEffect(() => {
        const interval = setInterval(setDateTime, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    return (
        <div className={"weather"}>
            <h1 className={"weather-header"}>Weather in {weather.locationName}</h1>
            <h3 className={"weather-sub-header"}>{`${days[currentDateTime.getDay()]} - ${currentDateTime.toLocaleString()}`}</h3>
            <div className={"weather-details"}>
                <img alt="weather-icon" src={`https://openweathermap.org/img/wn/${weather.icon ?? '04d'}@2x.png`}/>
                <span>{weather.temperature} &deg;C</span>
            </div>
        </div>
    );
}

export default Home;
