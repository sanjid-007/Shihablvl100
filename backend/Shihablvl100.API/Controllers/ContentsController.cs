using Microsoft.AspNetCore.Mvc;
using Shihablvl100.Application.Services;
using Shihablvl100.Domain.Entities;

namespace Shihablvl100.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentsController : ControllerBase
{
  private readonly ContentService _contentService;

  public ContentsController(ContentService contentService)
  {
    _contentService = contentService;
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
  [HttpPost]
  public async Task<IActionResult> Create(Content content)
  {
    var created = await _contentService.CreateAsync(content);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, Content content)
  {
    content.Id = id;
    var updated = await _contentService.UpdateAsync(content);
    return Ok(updated);
  }
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    await _contentService.DeleteAsync(id);
    return NoContent();
  }
}