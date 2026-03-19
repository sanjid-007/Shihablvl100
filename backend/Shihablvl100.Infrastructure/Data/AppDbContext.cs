using Microsoft.EntityFrameworkCore;
using Shihablvl100.Domain.Entities;

namespace Shihablvl100.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Category> Categories { get; set; }
    public DbSet<Content> Contents { get; set; }
    public DbSet<User> Users { get; set; }
}
