import React, {Component} from 'react';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {weather: {}, loading: true, currentDateTime: Date().toLocaleString()};
    }
    static displayName = Home.name;

    componentDidMount() {
        const populateWeatherData = async position => {
            console.log(JSON.stringify(position.coords.latitude))
            console.log(JSON.stringify(position.coords.longitude))
            const response = await fetch(`weatherforecast?Latitude=${position.coords.latitude}&Longitude=${position.coords.longitude}`);
            if (response.ok) {
                const data = await response.json();
                console.log(JSON.stringify(data))
                this.setState({weather: data, loading: false});
            } else {
                console.log(`there is a problem`)
            }
        }

        navigator.geolocation.getCurrentPosition(populateWeatherData);
    }xs

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <div>Weather is {this.state.weather.summary} <img alt="weather-icon" src={`https://openweathermap.org/img/wn/${this.state.weather.icon}@2x.png`}/></div>
        
        return (
            <div>
                <h1>Hello, world!</h1>
                {this.state.currentDateTime}
                {contents}
            </div>
        );
    }
}
