using Shihablvl100.Application.Interfaces;
using Shihablvl100.Domain.Entities;

namespace Shihablvl100.Application.Services;

public class AuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<bool> IsAdminAsync(string email)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        if (user == null)
            return false;
        return user.Role == UserRole.Admin;
    }

    public async Task<User?> GetOrCreateUserAsync(string email, string username)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        if (user != null)
            return user;

        var newUser = new User
        {
            Username = username,
            Email = email,
            Role = UserRole.User,
            CreatedAt = DateTime.UtcNow
        };

        return await _userRepository.CreateAsync(newUser);
    }
}