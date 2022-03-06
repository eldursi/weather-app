using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using weather_app.Domain;
using weather_app.Models;

namespace weather_app.Api;

public class WeatherApi
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<WeatherApi> _logger;
    private readonly WeatherAppConfiguration _appConfiguration;

    public WeatherApi(HttpClient httpClient, ILogger<WeatherApi> logger, IOptions<WeatherAppConfiguration> appConfiguration)
    {
        (_httpClient, _logger, _appConfiguration) = (httpClient, logger, appConfiguration.Value);
    }

    public async Task<WeatherContent> GetWeather(double lat, double lon)
    {
        var query =
            $"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={_appConfiguration.AppId}&units=metric";

        var response = await GetWeatherResponse(query);
        var weatherContent = response.ToDomainWeatherContent();
        
        return weatherContent;
    }

    private async Task<WeatherResponse> GetWeatherResponse(string query)
    {
        try
        {
            var response = await _httpClient.GetAsync(query);

            if (response == null) throw new HttpRequestException();

            if (!response.IsSuccessStatusCode || response.Content == null)
                throw new HttpRequestException(response.ReasonPhrase);

            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<WeatherResponse>(content,
                new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() })!;
        }
        catch (Exception exception)
        {
            _logger.LogError($"Exception thrown in weather api - Message is: {exception.Message}");
            throw;
        }
    }
}