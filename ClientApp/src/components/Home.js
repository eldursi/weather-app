import React, {Component} from 'react';

export class Home extends Component {
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    constructor(props) {
        super(props);
        this.state = {weather: {}, loading: true, currentDateTime: new Date()};
    }
    static displayName = Home.name;

    componentDidMount() {
        const populateWeatherData = async position => {
            const response = await fetch(`weatherforecast?Latitude=${position.coords.latitude}&Longitude=${position.coords.longitude}`);
            if (response.ok) {
                const data = await response.json();
                console.log(JSON.stringify(data))
                this.setState({weather: data, loading: false});
            } else {
                console.log(`There is a problem`)
            }
        }
        this.interval = setInterval(() => this.setState({ currentDateTime: new Date }), 10000);

        navigator.geolocation.getCurrentPosition(populateWeatherData);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <div><h1>Weather in {this.state.weather.locationName}</h1> {this.state.weather.summary} <img alt="weather-icon" src={`https://openweathermap.org/img/wn/${this.state.weather.icon}@2x.png`}/></div>
        
        return (
            <div>
                {`${this.days[this.state.currentDateTime.getDay()]} - ${this.state.currentDateTime.toLocaleDateString()} - ${this.state.currentDateTime.getHours()}.${this.state.currentDateTime.getMinutes()}`}
                {contents}
            </div>
        );
    }
}
