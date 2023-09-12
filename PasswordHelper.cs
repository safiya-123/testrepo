using System;
using System.Security.Cryptography;
using System.Text;

public class PasswordHelper
{
    // The number of iterations for the PBKDF2 algorithm (adjust as needed)
    private const int Iterations = 10000;
    private const int SaltSize = 32; // 256 bits

    public static (string Hash, string Salt) HashPassword(string password)
    {
        // Generate a random salt
        using (var rng = new RNGCryptoServiceProvider())
        {
            var saltBytes = new byte[SaltSize];
            rng.GetBytes(saltBytes);

            // Convert the salt to a base64-encoded string
            var salt = Convert.ToBase64String(saltBytes);

            // Hash the password with the salt using PBKDF2
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, Iterations))
            {
                var hashBytes = pbkdf2.GetBytes(32); // 256 bits
                var hash = Convert.ToBase64String(hashBytes);

                return (hash, salt);
            }
        }
    }

    public static bool VerifyPassword(string password, string storedHash, string storedSalt)
    {
        // Convert the stored salt and hash from base64 to bytes
        var saltBytes = Convert.FromBase64String(storedSalt);

        // Hash the input password with the stored salt using PBKDF2
        using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, Iterations))
        {
            var hashBytes = pbkdf2.GetBytes(32); // 256 bits
            var inputHash = Convert.ToBase64String(hashBytes);

            // Compare the input hash with the stored hash
            return inputHash == storedHash;
        }
    }
}
