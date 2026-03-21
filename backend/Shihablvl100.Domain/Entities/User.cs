namespace Shihablvl100.Domain.Entities;

public enum UserRole
{
    Admin,
    User,
}

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required UserRole Role { get; set; }
    public DateTime CreatedAt { get; set; }
}
