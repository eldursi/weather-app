const calculateTimeOfDay = (sunrise, sunset, time) => {
    if(time < sunset && time > sunrise)
    {
        return "day"
    }
    return "night"
}

export default calculateTimeOfDay;