import React, {Component} from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {weather: {}, loading: true};
    }

    componentDidMount() {

        const populateWeatherData = async position => {
            const response = await fetch(`weatherforecast?Latitude=${position.coords.latitude}&Longitude=${position.coords.latitude}`);
            if (response.ok) {
                const data = await response.json();
                this.setState({weather: data, loading: false});
                console.log(`All good`)
            } else {
                console.log(`there is a problem`)
            }

        }

        navigator.geolocation.getCurrentPosition(populateWeatherData);

    }

    static renderForecastsTable(weather) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
                </thead>
                <tbody>
                {JSON.stringify(weather)}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.weather);

        return (
            <div>
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
