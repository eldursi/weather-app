namespace weather_app.Domain;

public class WeatherContent
{
    public WeatherContent(
        string summary, 
        string description, 
        string icon, 
        string temperature, 
        string minimumTemperature,
        string maximumTemperature, 
        long sunrise, 
        long sunset)
    {
        Summary = summary;
        Description = description;
        Icon = icon;
        Temperature = temperature;
        MinimumTemperature = minimumTemperature;
        MaximumTemperature = maximumTemperature;
        Sunrise = $"{DateTimeOffset.FromUnixTimeSeconds(sunrise).DateTime.ToShortTimeString()}";
        Sunset = $"{DateTimeOffset.FromUnixTimeSeconds(sunset).DateTime.ToShortTimeString()}";
    }

    public string Sunrise { get; }
    public string Sunset { get; }
    public string Icon { get; }
    public string Summary { get; }
    public string Description { get; }
    public string Temperature { get; }
    public string MinimumTemperature { get; }
    public string MaximumTemperature { get; }
}