using Newtonsoft.Json;

namespace weather_app.Models;

public class WeatherResponse
{
    [JsonProperty("weather")] public List<WeatherSummary> Summary { get; set; }

    [JsonProperty("main")] public WeatherDetails Details { get; set; }
}

public class WeatherDetails
{
    [JsonProperty("temp")] public double Temp { get; set; }

    [JsonProperty("temp_min")] public double MinTemp { get; set; }

    [JsonProperty("temp_max")] public double MaxTemp { get; set; }
}

public class WeatherSummary
{
    [JsonProperty("main")] public string Main { get; set; }

    [JsonProperty("description")] public string? Description { get; set; }

    [JsonProperty("icon")] public string? Icon { get; set; }
}