using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shihablvl100.Application.Services;
using Shihablvl100.Domain.Entities;

namespace Shihablvl100.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentsController : ControllerBase
{
  private readonly ContentService _contentService;
  private readonly AuthService _authService;

  public ContentsController(ContentService contentService, AuthService authService)
  {
    _contentService = contentService;
    _authService = authService;
  }

  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var contents = await _contentService.GetAllAsync();
    return Ok(contents);
  }
  [HttpGet("{id}")]
  public async Task<IActionResult> GetById(int id)
  {
    var content = await _contentService.GetByIdAsync(id);
    if (content == null)
      return NotFound();
    return Ok(content);
  }
  [Authorize]
  [HttpPost]
  public async Task<IActionResult> Create(Content content)
  {
    var email = User.FindFirst(ClaimTypes.Email)?.Value;
    if (email == null || !await _authService.IsAdminAsync(email))
      return Forbid();
    var created = await _contentService.CreateAsync(content);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }
  [Authorize]
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, Content content)
  {
    var email = User.FindFirst(ClaimTypes.Email)?.Value;
    if (email == null || !await _authService.IsAdminAsync(email))
      return Forbid();
    content.Id = id;
    var updated = await _contentService.UpdateAsync(content);
    return Ok(updated);
  }
  [Authorize]
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var email = User.FindFirst(ClaimTypes.Email)?.Value;
    if (email == null || !await _authService.IsAdminAsync(email))
      return Forbid();
    await _contentService.DeleteAsync(id);
    return NoContent();
  }
}