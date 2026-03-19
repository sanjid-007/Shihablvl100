namespace Shihablvl100.Domain.Entities;

public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public int? ParentId { get; set; }
    public int Order { get; set; }
    public DateTime CreatedAt { get; set; }
}
