using Microsoft.AspNetCore.Mvc;
using weather_app.Api;
using weather_app.Models;

namespace weather_app.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherController : ControllerBase
{
    private readonly WeatherApi _api;

    public WeatherController(WeatherApi api)
    {
        _api = api;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GeoPoint location)
    {
        var response = await _api.GetWeather(location.Latitude, location.Longitude);
        return Ok(response);
    }
}