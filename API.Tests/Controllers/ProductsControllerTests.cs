using Xunit;
using Moq;
using FluentAssertions;
using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using API.Controllers;
using Core.Interfaces;
using Core.Entities;
using Core.Specifications;


namespace API.Tests.Controllers;

public class ProductsControllerTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly ProductsController _controller;
    private readonly Fixture _fixture;

    public ProductsControllerTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _controller = new ProductsController(_mockUnitOfWork.Object);
        _fixture = new Fixture();
    }

    [Fact]
    public async Task GetProducts_ReturnsOkResult_WithProducts()
    {
         // Arrange
    var products = _fixture.CreateMany<Product>(3).ToList();
    _mockUnitOfWork.Setup(x => x.Repository<Product>().ListAsync(It.IsAny<ISpecification<Product>>()))
                  .ReturnsAsync(products);

    // Act
    var result = await _controller.GetProducts(new ProductSpecParams());

    // Assert
    result.Should().NotBeNull();
    
    // For ActionResult<T>, we need to check the Result property
    var actionResult = result.Result;
    actionResult.Should().BeOfType<OkObjectResult>();
    
    var okResult = actionResult as OkObjectResult;
    okResult?.Value.Should().NotBeNull();
    
    }
}