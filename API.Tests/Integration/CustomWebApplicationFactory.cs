using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Data;

namespace API.Tests.Integration;

public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove the existing DbContext registration
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<StoreContext>));
            if (descriptor != null) 
            {
                services.Remove(descriptor);
            }

            // Also remove the DbContext itself
            var contextDescriptor = services.SingleOrDefault(d => d.ServiceType == typeof(StoreContext));
            if (contextDescriptor != null)
            {
                services.Remove(contextDescriptor);
            }

            // Add InMemory database for testing
            services.AddDbContext<StoreContext>(options =>
            {
                options.UseInMemoryDatabase("InMemoryDbForTesting");
            });
        });

        // Set environment to Testing to avoid running migrations
        builder.UseEnvironment("Testing");
    }
}
