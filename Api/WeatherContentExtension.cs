using weather_app.Domain;
using weather_app.Models;

namespace weather_app.Api;

internal static class WeatherContentExtension
{
    public static WeatherContent ToDomainWeatherContent(this WeatherResponse response) => new(
            response.Summary.FirstOrDefault()?.Main ?? "Clear",
            response.Summary.FirstOrDefault()?.Description ?? "Clear Sky",
            response.Details.Temp.ToString(),
            response.Details.MinTemp.ToString(),
            response.Details.MaxTemp.ToString()
        );
}