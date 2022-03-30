import React, {useEffect, useState} from "react";

const DayAndTime = () =>
{
    useEffect(()=>{
        const interval = setInterval(() => {
                setCurrentDateTime(new Date())
            }
            , 1000);
        return () => {
            clearInterval(interval);
        };
    })

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (<h3 className={"weather-sub-header"}>{`${days[currentDateTime.getDay()]} - ${currentDateTime.toLocaleString()}`}</h3>)
}

export default DayAndTime;