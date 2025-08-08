using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using Xunit;
using FluentAssertions;

namespace API.Tests.Integration
{
   public class ProductsControllerIntegrationTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly CustomWebApplicationFactory<Program> _factory;

    public ProductsControllerIntegrationTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetProducts_ReturnsSuccessStatusCode()
    {
        // Act
        var response = await _client.GetAsync("/api/products");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        content.Should().NotBeEmpty();
    }
}
}