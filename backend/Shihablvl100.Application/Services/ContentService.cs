using Shihablvl100.Application.Interfaces;
using Shihablvl100.Domain.Entities;

namespace Shihablvl100.Application.Services;

public class ContentService
{
    private readonly IContentRepository _contentRepository;

    public ContentService(IContentRepository contentRepository)
    {
        _contentRepository = contentRepository;
    }

    public async Task<List<Content>> GetAllAsync()
    {
        return await _contentRepository.GetAllAsync();
    }

    public async Task<Content?> GetByIdAsync(int id)
    {
        return await _contentRepository.GetByIdAsync(id);
    }

    public async Task<Content> CreateAsync(Content content)
    {
        return await _contentRepository.CreateAsync(content);
    }

    public async Task<Content> UpdateAsync(Content content)
    {
        return await _contentRepository.UpdateAsync(content);
    }

    public async Task DeleteAsync(int id)
    {
        await _contentRepository.DeleteAsync(id);
    }
}
