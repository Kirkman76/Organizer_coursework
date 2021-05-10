using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Organizer_coursework.DataContext;
using Organizer_coursework.Exceptions;
using Organizer_coursework.Extentions;
using Organizer_coursework.Models.Users;
using Organizer_coursework.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mime;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Organizer_coursework.Services
{
    public class UsersService: IUsersService
    {
        private readonly UsersContext _context;

        public UsersService(UsersContext context)
        {
            _context = context;
        }

        public async Task<ResponseToken> GetToken(AuthorizationUser user)
        {
            var identity = await GetIdentity(user.Email, user.Password);
            if (identity == null)
            {
                throw new NotFoundException();
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new ResponseToken()
            {
                AccessToken = encodedJwt,
                UserName = identity.Name
            };

            return response;
        }

        public async Task AddNewUser(RegistrationUser newUser)
        {
            _context.Users.Add(newUser.ToDbUser());
            await _context.SaveChangesAsync();
        }

        private async Task<ClaimsIdentity> GetIdentity(string email, string password)
        {
            DbUser user = await _context.Users.FirstOrDefaultAsync(usr => usr.Email == email && usr.Password == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Name),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString())
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            return null;
        }

    }
}
