using System.ComponentModel.DataAnnotations;

namespace Organizer_coursework.Models.Users
{
    public class AuthorizationUser
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
