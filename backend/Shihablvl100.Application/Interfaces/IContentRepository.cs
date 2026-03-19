using Shihablvl100.Domain.Entities;

namespace Shihablvl100.Application.Interfaces;

public interface IContentRepository
{
    Task<List<Content>> GetAllAsync();
    Task<Content?> GetByIdAsync(int id);
    Task<Content> CreateAsync(Content content);
    Task<Content> UpdateAsync(Content content);
    Task DeleteAsync(int id);
}
