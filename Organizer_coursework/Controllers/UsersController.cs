using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Organizer_coursework.Models.Users;
using Organizer_coursework.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Organizer_coursework.Controllers
{
    [Route("auth")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpPost("login")]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<ActionResult> GetToken ([FromBody] AuthorizationUser user)
        {
            return Ok(Json(await _usersService.GetToken(user)));
        }

        [HttpPost("register")]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<ActionResult> AddNewUser([FromBody] RegistrationUser user)
        {
            await _usersService.AddNewUser(user);
            return Ok();
        }
    }
}
