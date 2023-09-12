[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _dbContext;

    public UserController(IConfiguration configuration, ApplicationDbContext dbContext)
    {
        _configuration = configuration;
        _dbContext = dbContext;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegistrationModel model)
    {
        // Hash the password
        var passwordHash = HashPassword(model.Password);

        var user = new User
        {
            Username = model.Username,
            PasswordHash = passwordHash,
            // Set other user properties...
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return Ok("Registration successful");
    }

    [HttpPost("login")]
    public IActionResult Login(UserLoginModel model)
    {
        // Authenticate user (compare hashed password)
        var user = _dbContext.Users.FirstOrDefault(u => u.Username == model.Username);

        if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid credentials");
        }

        // Generate JWT token
        var token = GenerateJwtToken(user);

        return Ok(new { Token = token });
    }

    // Other actions...

    // Helper methods for password hashing, JWT token generation, etc...
}
