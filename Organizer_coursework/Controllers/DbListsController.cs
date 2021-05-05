using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult> GetLists()
        {
            return Ok(await _listsService.GetLists());
        }

        [HttpGet("{listId}")]
        [Produces("application/json")]
        public async Task<ActionResult> GetList([FromRoute] Guid listId)
        {
            return Ok(await _listsService.GetList(listId));
        }

        [HttpPut("{listId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> EditList(
            [FromRoute] Guid listId,
            [FromBody] OasEditList newList)
        {
            await _listsService.EditList(listId, newList);
            return Ok();
        }

        [HttpPost]
        [Consumes("application/json")]
        public async Task<ActionResult> AddList([FromBody] OasAddList newList)
        {

            await _listsService.AddList(newList);
            return Ok();
        }

        [HttpDelete("{listId}")]
        public async Task<IActionResult> DeleteList([FromRoute] Guid listId)
        {
            await _listsService.DeleteList(listId);
            return Ok();
        }
    }
}
