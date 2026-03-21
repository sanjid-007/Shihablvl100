using Shihablvl100.Domain.Entities;

namespace Shihablvl100.Application.Interfaces;

public interface IUserRepository
{
  Task<User?> GetByEmailAsync(string email);
  Task<User> CreateAsync(User user);

}