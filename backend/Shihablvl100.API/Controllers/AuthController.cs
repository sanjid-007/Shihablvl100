using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace Shihablvl100.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly HttpClient _httpClient;

    public AuthController(IConfiguration config)
    {
        _config = config;
        _httpClient = new HttpClient();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var supabaseUrl = _config["Supabase:Url"]
        ?? Environment.GetEnvironmentVariable("SUPABASE_URL");
    var supabaseKey = _config["Supabase:AnonKey"]
        ?? Environment.GetEnvironmentVariable("SUPABASE_ANON_KEY");

        var url = $"{supabaseUrl}/auth/v1/token?grant_type=password";

        var body = JsonSerializer.Serialize(new
        {
            email = request.Email,
            password = request.Password
        });

        var httpRequest = new HttpRequestMessage(HttpMethod.Post, url);
        httpRequest.Content = new StringContent(body, Encoding.UTF8, "application/json");
        httpRequest.Headers.Add("apikey", supabaseKey);

        var response = await _httpClient.SendAsync(httpRequest);
        var result = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            return BadRequest("Login failed");

        return Ok(JsonSerializer.Deserialize<object>(result));
    }
}

public class LoginRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}