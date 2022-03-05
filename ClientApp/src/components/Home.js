import React, {Component} from 'react';
import './Home.css';

export class Home extends Component {
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    constructor(props) {
        super(props);
        const defaultHeader = this.getDefaultWeather()
        this.state = {weather: defaultHeader, currentDateTime: new Date()};
    }
    static displayName = Home.name;

    getWeather = async(lat, lon) => {
        const response = await fetch(`weatherforecast?Latitude=${lat}&Longitude=${lon}`);
        if (response.ok) {
            const data = await response.json();
            this.setState({weather: data});
        } else {
            console.log(`There is a problem`)
        }
    }
    
    getDefaultWeather = async () =>{
        const lat = 51.509865
        const lon = -0.118092
        await this.getWeather(lat, lon)
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ currentDateTime: new Date }), 1000);
        navigator.geolocation.getCurrentPosition((position) => this.getWeather(position.coords.latitude, position.coords.longitude), this.getDefaultWeather );
    }

    render() {
        return (
                <div className={"weather"}>
                    <h1 className={"weather-header"}>Weather in {this.state.weather.locationName}</h1>
                    <h3 className={"weather-sub-header"}>{`${this.days[this.state.currentDateTime.getDay()]} - ${new Date().toLocaleString()}`}</h3>
                    <div className={"weather-details"}>
                        <img alt="weather-icon" src={`https://openweathermap.org/img/wn/${this.state.weather.icon ?? '04d'}@2x.png`}/>
                        <span>{this.state.weather.temperature} &deg;C</span> 
                    </div>
                </div>
        );
    }
}
