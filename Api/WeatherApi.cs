using System.Diagnostics;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using weather_app.Domain;
using weather_app.Models;

namespace weather_app.Api;

public class WeatherApi
{
    private HttpClient httpClient;
    private readonly ILogger<WeatherApi> logger;

    public WeatherApi(HttpClient httpClient, ILogger<WeatherApi> logger)
    {
        this.httpClient = httpClient;
        this.logger = logger;
    }

    public async Task<WeatherContent> GetWeather(double lat, double lon)
    {
        var query =
            $"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=a7dc3bd6bd6a013c1c6506111367ad4e";
        var response = await GetWeatherResponse(query);

        var weatherContent = response.ToDomainWeatherContent();
        return weatherContent;
    }

    private async Task<WeatherResponse> GetWeatherResponse(string query)
    {
        try
        {
            var response = await httpClient.GetAsync(query);

            if (response == null) throw new HttpRequestException();

            if (!response.IsSuccessStatusCode || response.Content == null)
                throw new HttpRequestException(response.ReasonPhrase);

            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<WeatherResponse>(content,
                new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() })!;
        }
        catch (Exception exception)
        {
            logger.LogError($"Exception thrown in weather api - Message is: {exception.Message}");
            throw;
        }
    }
}