import React, {useState, useEffect} from 'react';
import './Home.css';
import getWeather from "../api/getWeather";
import isEmpty from "../utils/isEmpty";
import convertEpochTimestamp from "../utils/convertEpochTimestamp";

const Home = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState({});
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    
    
    const callback = async (lat, lon) => {
        const response = await getWeather(lat, lon)
        if(!isEmpty(response))
        {
            setWeather(response)
            setLoading(false)
        }

    }
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => await callback(position.coords.latitude, position.coords.longitude),
            async () => await callback(51.509865, -0.118092),
        );
        const interval = setInterval(() => {
                setCurrentDateTime(new Date())
            }
            , 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    if(loading)
    {
        return (
        <div className={"loading"}>
            <img alt={"loading gif"} src={"/images/default/loading.gif"}/>
        </div>
        )
    }
    
    const calculateTimeOfDay = (sunrise, sunset, time) => {
        if(time > sunrise && time < sunset)
        {
            return "night"
        }
        return "day"
    }
    
    const timeOfDay = calculateTimeOfDay(convertEpochTimestamp(weather.sunrise), convertEpochTimestamp(weather.sunset)) ?? "day"
    return (
        <div className={"weather"} style={{ backgroundImage: `url("/images/${timeOfDay}/${weather.summary.toLowerCase()}.jpeg")` }}>
            <h1 className={"weather-header"}>Weather in {weather.locationName}</h1>
            <h3 className={"weather-sub-header"}>{`${days[currentDateTime.getDay()]} - ${currentDateTime.toLocaleString()}`}</h3>
            <div className={"weather-details"}>
                <span>{weather.temperature} &deg;C - {weather.summary}</span>
            </div>
        </div>
    );
}

export default Home;
