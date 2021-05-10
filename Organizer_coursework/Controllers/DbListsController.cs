using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Organizer_coursework.DataContext;
using Organizer_coursework.Extentions;
using Organizer_coursework.Models;
using Organizer_coursework.Services.Interfaces;

namespace Organizer_coursework.Controllers
{
    [Route("api/lists")]
    [ApiController]
    public sealed class DbListsController : ControllerBase
    {
        private readonly IListsService _listsService;

        public DbListsController(IListsService listsService)
        {
            _listsService = listsService;
        }

        [Authorize]
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult> GetLists()
        {
            return Ok(await _listsService.GetLists());
        }

        [Authorize]
        [HttpGet("{listId}")]
        [Produces("application/json")]
        public async Task<ActionResult> GetList([FromRoute] Guid listId)
        {
            return Ok(await _listsService.GetList(listId));
        }

        [Authorize]
        [HttpPut("{listId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> EditList(
            [FromRoute] Guid listId,
            [FromBody] OasEditList newList)
        {
            await _listsService.EditList(listId, newList);
            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Consumes("application/json")]
        public async Task<ActionResult> AddList([FromBody] OasAddList newList)
        {

            await _listsService.AddList(newList);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{listId}")]
        public async Task<IActionResult> DeleteList([FromRoute] Guid listId)
        {
            await _listsService.DeleteList(listId);
            return Ok();
        }
    }
}
