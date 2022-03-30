import React, {useState, useEffect} from 'react';
import './Home.css';
import getWeather from "../../api/getWeather";
import isEmpty from "../../utils/isEmpty";
import convertEpochTimestamp from "../../utils/convertEpochTimestamp";
import calculateTimeOfDay from "../../utils/calculateTimeOfDay";
import DayAndTime from "../DayAndTime";
import Loading from "../Loading";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState({});
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
            async () =>
            {
                await callback(51.509865, -0.118092)
            },
        );
    }, []);
    
    if(loading)
    {
        return <Loading/>
    }
    
    const timeOfDay = calculateTimeOfDay(convertEpochTimestamp(weather.sunrise), convertEpochTimestamp(weather.sunset), new Date());
    return (
        <div className={"weather"} style={{ backgroundImage: `url("/images/${timeOfDay}/${weather.summary.toLowerCase()}.jpeg")` }}>
            <h1 className={"weather-header"}>Weather in {weather.locationName}</h1>
            <DayAndTime/>
            <div className={"weather-details"}>
                <span>{weather.temperature} &deg;C - {weather.summary}</span>
            </div>
        </div>
    );
}

export default Home;
