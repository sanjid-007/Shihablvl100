using Shihablvl100.Application.Interfaces;
using Shihablvl100.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Shihablvl100.Infrastructure.Data;


namespace Shihablvl100.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
  private readonly AppDbContext _context;

  public UserRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<User?> GetByEmailAsync(string email)
  {
    return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
  }
  public async Task<User> CreateAsync(User user)
  {
    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return user;
  }
}