using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shihablvl100.Application.Services;
using Shihablvl100.Domain.Entities;

namespace Shihablvl100.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly CategoryService _categoryService;
    private readonly AuthService _authService;

    public CategoriesController(CategoryService categoryService, AuthService authService)
    {
        _categoryService = categoryService;
        _authService = authService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _categoryService.GetAllAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await _categoryService.GetByIdAsync(id);
        if (category == null)
            return NotFound();
        return Ok(category);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(Category category)
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        if (email == null || !await _authService.IsAdminAsync(email))
            return Forbid();

        var created = await _categoryService.CreateAsync(category);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Category category)
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        if (email == null || !await _authService.IsAdminAsync(email))
            return Forbid();

        category.Id = id;
        var updated = await _categoryService.UpdateAsync(category);
        return Ok(updated);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        if (email == null || !await _authService.IsAdminAsync(email))
            return Forbid();

        await _categoryService.DeleteAsync(id);
        return NoContent();
    }
}