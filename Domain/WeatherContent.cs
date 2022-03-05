namespace weather_app.Domain;

public class WeatherContent
{
    public WeatherContent(
        string locationName,
        string summary, 
        string description, 
        string icon, 
        double temperature, 
        double minimumTemperature,
        double maximumTemperature, 
        long sunrise, 
        long sunset)
    {
        LocationName = locationName;
        Summary = summary;
        Description = description;
        Icon = icon;
        Temperature = Math.Round(temperature).ToString();
        MinimumTemperature = Math.Round(minimumTemperature).ToString();
        MaximumTemperature =  Math.Round(maximumTemperature).ToString();
        Sunrise = $"{DateTimeOffset.FromUnixTimeSeconds(sunrise).DateTime.ToShortTimeString()}";
        Sunset = $"{DateTimeOffset.FromUnixTimeSeconds(sunset).DateTime.ToShortTimeString()}";
    }
    
    public string LocationName { get; }
    public string Sunrise { get; }
    public string Sunset { get; }
    public string Icon { get; }
    public string Summary { get; }
    public string Description { get; }
    public string Temperature { get; }
    public string MinimumTemperature { get; }
    public string MaximumTemperature { get; }
}