using Organizer_coursework.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organizer_coursework.Services.Interfaces
{
    public interface IUsersService
    {
        Task<ResponseToken> GetToken(AuthorizationUser user);
        Task AddNewUser(RegistrationUser newUser);
    }
}
