namespace weather_app.Domain;

public class WeatherContent
{
    public WeatherContent(string summary, string description, string temperature, string minimumTemperature, string maximumTemperature)
    {
        Summary = summary;
        Description = description;
        Temperature = temperature;
        MinimumTemperature = minimumTemperature;
        MaximumTemperature = maximumTemperature;
    }

    public string Summary { get; }
    public string Description { get; }
    public string Temperature { get; }
    public string MinimumTemperature { get; }
    public string MaximumTemperature { get; }
}