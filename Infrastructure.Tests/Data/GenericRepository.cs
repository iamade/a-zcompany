using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

// Infrastructure.Tests/Data/GenericRepositoryTests.cs
public class GenericRepositoryTests : IDisposable
{
    private readonly StoreContext _context;
    private readonly GenericRepository<Product> _repository;

    public GenericRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<StoreContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        _context = new StoreContext(options);
        _repository = new GenericRepository<Product>(_context);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsProduct_WhenProductExists()
    {
        // Arrange
        var product = new Product { Name = "Test Product", Price = 10.99m };
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetByIdAsync(product.Id);

        // Assert
        result.Should().NotBeNull();
        result.Name.Should().Be("Test Product");
    }
}
