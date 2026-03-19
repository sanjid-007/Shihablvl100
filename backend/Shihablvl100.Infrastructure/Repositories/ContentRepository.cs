using Shihablvl100.Application.Interfaces;
using Shihablvl100.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Shihablvl100.Infrastructure.Data;

namespace Shihablvl100.Infrastructure.Repositories;

public class ContentRepository : IContentRepository
{
  private readonly AppDbContext _context;

  public ContentRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<List<Content>> GetAllAsync()
  {
    return await _context.Contents.ToListAsync();
  }
  public async Task<Content?> GetByIdAsync(int id)
  {
    return await _context.Contents.FindAsync(id);
  }
  public async Task<Content> CreateAsync(Content content)
  {
    _context.Contents.Add(content);
    await _context.SaveChangesAsync();
    return content;
  }
  public async Task<Content> UpdateAsync(Content content)
  {
    _context.Contents.Update(content);
    await _context.SaveChangesAsync();
    return content;
  }
  public async Task DeleteAsync(int id)
  {
    var content = await _context.Contents.FindAsync(id);
    if (content != null)
    {
      _context.Contents.Remove(content);
      await _context.SaveChangesAsync();
    }
  }
}